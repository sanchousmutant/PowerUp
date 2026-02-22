import { useEffect, useRef, useCallback } from 'react';
import { Audio } from 'expo-av';

export function useSound() {
  const finishRef = useRef<Audio.Sound | null>(null);
  const endRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    const load = async () => {
      const [f, e] = await Promise.all([
        Audio.Sound.createAsync(require('../assets/sounds/finish.wav')),
        Audio.Sound.createAsync(require('../assets/sounds/end.wav')),
      ]);
      finishRef.current = f.sound;
      endRef.current = e.sound;
    };
    load();

    return () => {
      finishRef.current?.unloadAsync();
      endRef.current?.unloadAsync();
    };
  }, []);

  const playFinish = useCallback(async () => {
    if (finishRef.current) {
      await finishRef.current.setPositionAsync(0);
      await finishRef.current.playAsync();
    }
  }, []);

  const playEnd = useCallback(async () => {
    if (endRef.current) {
      await endRef.current.setPositionAsync(0);
      await endRef.current.playAsync();
    }
  }, []);

  return { playFinish, playEnd };
}
