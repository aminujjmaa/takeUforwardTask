import React, { useEffect, useState } from 'react';

const CountdownTimer = ({ initialTime, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft === 0) {
      onComplete();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  return (
    <div className="timer">
      {timeLeft > 0 ? (
        <p>Time left: {timeLeft}s</p>
      ) : (
        <p>Banner expired</p>
      )}
    </div>
  );
};

export default CountdownTimer;
