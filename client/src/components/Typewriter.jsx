import { useState, useEffect } from "react";

const Typewriter = ({ text, delay = 10, startDelay = 0, onComplete }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    // Reset when text changes
    setDisplayedText("");

    let timeoutId;
    let intervalId;
    let currentIndex = 0;

    const startTyping = () => {
      if (!text || text.length === 0) {
        if (onComplete) onComplete();
        return;
      }

      intervalId = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText((prev) => prev + text.charAt(currentIndex));
          currentIndex++;
        } else {
          clearInterval(intervalId);
          if (onComplete) onComplete();
        }
      }, delay);
    };

    if (startDelay > 0) {
      timeoutId = setTimeout(startTyping, startDelay);
    } else {
      startTyping();
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, delay, startDelay, onComplete]);

  return <span>{displayedText}</span>;
};

export default Typewriter;
