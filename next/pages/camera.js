import UserWidget from '@/components/UserWidget';
import { useRef, useState } from 'react';
import { useUser } from '../context/UserContext';

export default function Camera() {
  const videoRef = useRef(null);
  const [prediction, setPrediction] = useState('');
  const [isCapturing, setIsCapturing] = useState(false);
  const [fact, setFact] = useState('');
  const [error, setError] = useState('');
  const { user, setUser } = useUser(); 

  const startVideo = () => {
    setPrediction('');
    setFact('');
    setError('');
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          videoRef.current.srcObject = stream;
          captureImages(stream);  
        })
        .catch(err => {
          console.error("Error accessing camera: ", err);
          setError("Error accessing camera: " + err.message);
        });
    }
  };

  const captureImages = async (stream) => {
    setIsCapturing(true);
    const images = [];
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 224;
    canvas.height = 224;

    const startTime = Date.now();

    const interval = setInterval(() => {
      if (Date.now() - startTime > 5000) {  
        clearInterval(interval);
        stream.getTracks().forEach(track => track.stop());  
        sendImages(images);
        setIsCapturing(false);
      } else {
        context.drawImage(videoRef.current, 0, 0, 224, 224);
        images.push(canvas.toDataURL('image/jpeg'));
      }
    }, 100);  
  };

  const sendImages = async (images) => {
    setError('');
    const formData = new FormData();
    for (const img of images) {
        const response = await fetch(img);
        const blob = await response.blob();
        formData.append('images', blob);
    }

    try {
      const response = await fetch('/api/classify', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      setPrediction(data.prediction); 
      fetchFact(data.prediction); 

      if (data.prediction.toLowerCase() !== 'trash' && user) {
        updateRecycledItems(user.userid); 
      } else {
        console.log('Classified as trash, not updating recycled items.');
      }
    } catch (error) {
      console.error("Error sending images: ", error);
      setError("Error occurred during classification: " + error.message);
      setPrediction("");
    }
  };

  const fetchFact = async (predictedClass) => {
    try {
      const res = await fetch('/api/funFacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: predictedClass,
        }),
      });
    
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      setFact(result.fact);
    } catch (error) {
      console.error("Error fetching fact: ", error);
      setError("Error fetching fact: " + error.message);
    }
  };


  const updateRecycledItems = async (userId) => {
    console.log('Attempting to update recycled items for userId:', userId);
    try {
        const response = await fetch('/api/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Recycled items updated:', result.recycledItems);
        setUser({ ...user, recycledItems: result.recycledItems });
    } catch (error) {
        console.error('Error updating recycled items:', error);
        setError('Error updating recycled items: ' + error.message);
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-screen w-screen bg-cover bg-center bg-no-repeat bg-fixed px-2.5"
      style={{
        backgroundImage: 'url("background.png")',
      }}
    >
      <div className="text-[45px] text-[#173b26] text-center leading-[1.2] font-black mb-5">
        Garbage Classification
      </div>

      <video
        ref={videoRef}
        autoPlay
        className="rounded-[25px] border-[5px] border-[#ffe871] shadow-lg"
        style={{ width: '300px', height: '225px' }}
      ></video>

      <button
        onClick={startVideo}
        disabled={isCapturing}
        className="px-5 py-2.5 mt-5 text-[24px] bg-[#ffe871] text-[#173b26] border-none rounded-[25px] cursor-pointer font-bold"
      >
        {isCapturing ? 'Capturing...' : 'Start Camera'}
      </button>

      {prediction && (
        <div className="text-[30px] text-[#173b26] mt-5">
          Predicted Class: {prediction}
        </div>
      )}

      {fact && (
        <div className="text-[20px] text-[#173b26] mt-3 italic">
          Fun Fact: {fact}
        </div>
      )}

      {error && (
        <div className="text-[20px] text-red-500 mt-3">
          {error}
        </div>
      )}

      <UserWidget />
    </div>
  );
}