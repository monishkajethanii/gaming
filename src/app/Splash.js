import React, { useState, useEffect } from "react";

const Splash = () => {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 5000); 
    return () => clearTimeout(timeout);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      <video
        className="w-auto h-auto object-contain lg:w-full lg:h-full lg:object-cover"
        autoPlay
        muted
        playsInline
        onEnded={() => setIsVisible(false)}
      >
        <source src="/splash.mp4" type="video/mp4" />        
      </video>
    </div>
  );
};

export default Splash;
