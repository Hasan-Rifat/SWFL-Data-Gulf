/**
 * Custom hook for typewriter text animation effect
 * Animates text character by character with a specified speed
 */
import { useState, useEffect, useCallback } from 'react';

interface UseTypewriterOptions {
  speed?: number;
  delay?: number;
}

export function useTypewriter(options: UseTypewriterOptions = {}) {
  const { speed = 35, delay = 0 } = options;
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const type = useCallback((text: string, onComplete?: () => void) => {
    setDisplayedText('');
    setIsComplete(false);
    
    let i = 0;
    
    function typeChar() {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
        setTimeout(typeChar, speed);
      } else {
        setIsComplete(true);
        if (onComplete) {
          setTimeout(onComplete, delay);
        }
      }
    }
    
    // Start typing after initial delay
    setTimeout(typeChar, delay);
  }, [speed, delay]);

  return { displayedText, isComplete, type };
}
