import React, { useState, useEffect, useRef } from 'react';

const NumberTicker = ({ number, duration = 2000, suffix = '' }) => {
  const [displayNumber, setDisplayNumber] = useState(0);
  const ref = useRef(null);
  const animationStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animationStarted.current) {
          animateNumber();
          animationStarted.current = true;
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the component is visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [number, duration, suffix]);

  const animateNumber = () => {
    const start = 0;
    const end = parseFloat(number);
    const range = end - start;
    let startTime = null;

    const step = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const value = Math.floor(progress * range + start);
      setDisplayNumber(value);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  // Handle numbers like "10K+" and "5K+" for display
  const formatNumber = (num) => {
    if (suffix === 'K+' && num >= 1000) {
      return (num / 1000) + 'K+';
    }
    return num + suffix;
  };

  return (
    <span ref={ref}>
      {formatNumber(displayNumber)}
    </span>
  );
};

export default NumberTicker; 