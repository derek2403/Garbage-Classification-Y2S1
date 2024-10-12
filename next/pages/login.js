import { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useUser } from '../context/UserContext'; 
import { useRouter } from 'next/router';

export default function QRLogin() {
  const [scanResult, setScanResult] = useState('');
  const { setUser } = useUser(); 
  const router = useRouter(); 
  useEffect(() => {
    const qrcodeScanner = new Html5QrcodeScanner('reader', { fps: 10, qrbox: 250 });

    qrcodeScanner.render(
      (decodedText) => {
        setScanResult(decodedText);
        handleScan(decodedText); 
      },
      (errorMessage) => {
        console.error(errorMessage); 
      }
    );
    
    return () => qrcodeScanner.clear(); 
  }, []);

  const handleScan = async (data) => {
    if (data) {
      const res = await fetch(`/api/users?userid=${data}`);
      const result = await res.json();
  
      if (result.name) {
        setUser(result); 
        router.push('/camera'); 
      }
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-screen w-screen bg-cover bg-center bg-no-repeat px-4 py-6"
      style={{ backgroundImage: 'url("/background.png")' }}
    >
      <h1 className="text-4xl font-bold text-[#173b26] mb-6">Scan QR to Login</h1>
      <div
        id="reader"
        className="w-full max-w-[300px] h-[300px] border-4 border-[#ffe871] rounded-lg shadow-lg"
      ></div>
    </div>
  );
}
