import React, { useState, useRef } from 'react';

const App = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const intervalRef = useRef();

  const start = () => {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime(prev => prev + 1);
    }, 100);
  };

  const stop = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const reset = () => {
    stop();
    setTime(0);
  };

  const formatTime = (timeInSeconds) => {
    const minute = Math.floor(timeInSeconds / (60 * 100));
    const seconds = Math.floor(timeInSeconds /100 % 60);
    const millisecond = timeInSeconds % 10
    return `${String(minute).padStart(2, '0')} : ${String(seconds).padStart(2, '0')} : ${String(millisecond).padStart(2, '0')}`;
  };

  return (
    <div className='wrapper'>
      <h1 className='display'>{formatTime(time)}</h1>
      <div className='watch'>
        {!isRunning ? (
          <button className='start' onClick={start}>Start</button>
        ) : (
          <button className='stop' onClick={stop}>Stop</button>
        )}

        <button  className='reset' onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default App;
