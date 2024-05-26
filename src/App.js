import React, { useState, useRef, useEffect } from 'react';

const App = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const intervalRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);

    handleResize();
    
    return () => {  window.removeEventListener('resize', handleResize);}
  }, [])
  
  

  const start = () => {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime(prev => prev + 100);
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
    const minute = Math.floor(timeInSeconds / (60 * 1000));
    const seconds = Math.floor((timeInSeconds % (60 * 1000)) / 1000);
    const millisecond = ((timeInSeconds % 1000) /10);
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
