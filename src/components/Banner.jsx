import React, { useEffect, useState } from 'react';

const Banner = ({ isVisible, description, timer, link }) => {
  const [remainingTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    if (isVisible && remainingTime > 0) {
      const countdown = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [isVisible, remainingTime]);

  if (!isVisible || remainingTime <= 0) {
    return null;
  }

  // Helper function to check if the link is an image
  const isImage = (url) => {
    return /\.(jpeg|jpg|gif|png|svg)$/.test(url);
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded mb-4">
      {description && <p className="mb-2">{description}</p>}
      {isImage(link) && (
        <img src={link} alt="Banner" className="w-full h-auto rounded mb-2" />
      )}
      <p className="text-sm mt-2">Banner will disappear in {remainingTime} seconds</p>
    </div>
  );
};

export default Banner;
