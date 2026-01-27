import React, { useEffect, useRef, useState } from 'react';

const NumberTicker = ({ number, duration = 4000, suffix = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  // Number Reel Configuration (Rolls UP)
  const targetNumber = parseInt(number);
  // Create array [0, 1, 2, ... target]
  const numberSequence = Array.from({ length: targetNumber + 1 }, (_, i) => i);

  // Suffix Reel Configuration (Rolls DOWN)
  // Target is always at index 0 for "Roll Down" effect (End at 0)
  let suffixSequence = [suffix];
  let staticSuffixPrefix = '';

  if (suffix === 'K+') {
    suffixSequence = ['K+', 'M+', 'B+', 'T+'];
  } else if (suffix === '%') {
    suffixSequence = ['%', '!', '#', '$'];
  } else if (suffix === '| 7') {
    staticSuffixPrefix = '| ';
    suffixSequence = ['7', '30', '365'];
  }

  // For roll down: We start at the bottom (last index) and move to top (0)
  const suffixStartIndex = suffixSequence.length - 1;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Add a small delay for smoother feel
          setTimeout(() => setIsVisible(true), 100);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Common styles to ensure perfect alignment
  const heightStyle = { height: '1.2em', lineHeight: '1.2em' };

  return (
    <div className="inline-flex items-center overflow-hidden" ref={containerRef} style={heightStyle}>
      {/* Number Reel - Rolls UP */}
      <div className="relative" style={heightStyle}>
        <div
          className="flex flex-col transition-transform"
          style={{
            transform: isVisible ? `translateY(-${targetNumber * 1.2}em)` : 'translateY(0)',
            transitionDuration: `${duration}ms`,
            transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
          }}
        >
          {numberSequence.map((num) => (
            <div key={num} className="flex items-center justify-center w-full" style={heightStyle}>
              {num}
            </div>
          ))}
        </div>
      </div>

      {/* Suffix Reel - Rolls DOWN */}
      {/* Only render if there's a suffix */}
      {suffix && (
        <div className="flex items-center ml-1">
          {/* Static Prefix (like |) */}
          {staticSuffixPrefix && <span>{staticSuffixPrefix}</span>}

          <div className="relative" style={heightStyle}>
            <div
              className="flex flex-col transition-transform"
              style={{
                // Start at last item, End at first item (0)
                transform: isVisible ? 'translateY(0)' : `translateY(-${suffixStartIndex * 1.2}em)`,
                transitionDuration: `${duration}ms`,
                transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
              }}
            >
              {suffixSequence.map((s, i) => (
                <div key={i} className="flex items-center justify-center w-full" style={heightStyle}>
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NumberTicker;