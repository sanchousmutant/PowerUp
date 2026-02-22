import { useState, useEffect, useRef, useCallback } from 'react';

export function useTimer(initialSeconds: number) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isFinished = secondsLeft <= 0;

  useEffect(() => {
    if (isRunning && !isFinished) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, isFinished]);

  const start = useCallback(() => setIsRunning(true), []);

  const reset = useCallback((newSeconds: number) => {
    setIsRunning(false);
    setSecondsLeft(newSeconds);
  }, []);

  return { secondsLeft, isRunning, isFinished, start, reset };
}
