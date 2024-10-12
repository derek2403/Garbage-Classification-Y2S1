import { useRouter } from 'next/router';

export default function Mobile() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/login'); 
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-screen w-screen bg-cover bg-center bg-no-repeat bg-fixed px-2.5"
      style={{
        backgroundImage: 'url("background.png")',
      }}
    >
      <div
        className="text-[80px] text-[#173b26] max-w-[90%] text-center leading-[1.2] font-extrabold mb-5 relative"
      >
        Recycle Renew Reuse!
        <div className="mt-5">
          <button
            onClick={handleGetStarted}
            className="px-5 py-2.5 text-[24px] bg-[#ffe871] text-[#173b26] border-none rounded-[25px] cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
