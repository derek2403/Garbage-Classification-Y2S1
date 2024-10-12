import { useRouter } from 'next/router';

export default function Web() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/login'); 
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("background.png")' }}
    >
      <div
        className="asap-condensed-black text-8xl text-[#173b26] max-w-[30%] text-center leading-none font-extrabold relative left-[-25%] mb-5"
      >
        Recycle Renew Reuse!
        <div>
          <button
            onClick={handleGetStarted}
            className="mt-5 px-5 p-4 py-2 text-3xl bg-[#ffe871] text-[#173b26] rounded-full cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
