import { useEffect, useState } from 'react';
import Web from '@/components/Web/Home';
import Mobile from '@/components/Mobile/Home';

export default function IndexPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); 
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {isMobile ? <Mobile /> : <Web />}
    </>
  );
}
