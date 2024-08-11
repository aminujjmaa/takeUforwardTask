
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [bannerVisible, setBannerVisible] = useState(true);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [timer, setTimer] = useState(0);
  const [countdown, setCountdown] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdate = () => {
    const newImageUrl = document.getElementById('imageUrl').value;
    const newDescription = document.getElementById('description').value;
    const newTimer = parseInt(document.getElementById('timer').value, 10);

    setImageUrl(newImageUrl);
    setDescription(newDescription);
    setTimer(newTimer);
    setBannerVisible(true);
    setCountdown(newTimer);
  };

  useEffect(() => {
    if (bannerVisible && timer > 0) {
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(countdownInterval);
            setBannerVisible(false);
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [bannerVisible, timer]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md z-10">
        <h2 className="text-2xl font-bold mb-4 text-center">Internal Dashboard</h2>
        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-gray-700">Image URL:</label>
          <input
            type="text"
            id="imageUrl"
            placeholder="Enter image URL"
            className="mt-2 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">Description:</label>
          <input
            type="text"
            id="description"
            placeholder="Enter banner description"
            className="mt-2 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="timer" className="block text-gray-700">Timer (seconds):</label>
          <input
            type="number"
            id="timer"
            placeholder="Enter timer in seconds"
            className="mt-2 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="checkbox"
            checked={bannerVisible}
            onChange={(e) => setBannerVisible(e.target.checked)}
            className="mr-2"
          />
          <label className="text-gray-700">Show Banner</label>
        </div>
        <button
          onClick={handleUpdate}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Update Banner
        </button>
      </div>

      {bannerVisible && (
        <div className="mt-8 p-6 bg-gray-200 rounded-lg shadow-md w-full max-w-2xl z-0">
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Banner"
              className="w-full h-auto rounded-lg mb-4 cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            />
          )}
          <p className="text-gray-700 text-lg">{description}</p>
          {countdown !== null && (
            <p className="text-gray-500 text-sm mt-2">Time remaining: {countdown}s</p>
          )}
        </div>
      )}

      {/* Modal for Image Pop-up */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg max-w-md w-full">
            <img src={imageUrl} alt="Popup" className="w-full h-auto rounded" />
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
