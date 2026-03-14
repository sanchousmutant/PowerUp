import { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import { exercises } from '../constants/exercises';
import { Colors, FontSize, Spacing } from '../constants/theme';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import { TimerDisplay } from '../components/TimerDisplay';
import { useTimer } from '../hooks/useTimer';
import { useSound } from '../hooks/useSound';

export default function WorkoutScreen() {
  const router = useRouter();
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const { playFinish, playEnd } = useSound();
  const exercise = exercises[exerciseIndex];

  const { secondsLeft, isFinished, start, reset } = useTimer(exercise.duration);

  const hasAdvancedRef = useRef(false);

  const exerciseSoundRef = useRef<Audio.Sound | null>(null);
  const finishPlayedRef = useRef(false);
  const metronomRef = useRef<Audio.Sound | null>(null);
  const sidePlankBeepPlayedRef = useRef(false);

  // Configure audio mode for mixing multiple sounds
  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      shouldDuckAndroid: true,
    });
  }, []);

  // Start metronome loop on mount, stop on unmount
  useEffect(() => {
    let cancelled = false;
    const startMetronom = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/metronom.mp3'),
        { isLooping: true }
      );
      if (cancelled) { await sound.unloadAsync(); return; }
      metronomRef.current = sound;
      await sound.playAsync();
    };
    startMetronom();

    return () => {
      cancelled = true;
      const sound = metronomRef.current;
      if (sound) {
        sound.stopAsync().catch(() => {}).then(() => sound.unloadAsync().catch(() => {}));
        metronomRef.current = null;
      }
    };
  }, []);

  // Play exercise sound, then start timer
  useEffect(() => {
    hasAdvancedRef.current = false;
    finishPlayedRef.current = false;
    sidePlankBeepPlayedRef.current = false;
    reset(exercise.duration);

    let cancelled = false;
    const playAndStart = async () => {
      // Unload previous exercise sound
      if (exerciseSoundRef.current) {
        await exerciseSoundRef.current.unloadAsync();
        exerciseSoundRef.current = null;
      }
      const { sound } = await Audio.Sound.createAsync(exercise.sound);
      if (cancelled) { await sound.unloadAsync(); return; }
      exerciseSoundRef.current = sound;
      await sound.playAsync();
      // Wait for sound to finish, then start timer
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish && !cancelled) {
          start();
        }
      });
    };
    playAndStart();

    return () => {
      cancelled = true;
      exerciseSoundRef.current?.unloadAsync().catch(() => {});
    };
  }, [exerciseIndex]);

  // Play side-plank beep at 33 seconds remaining
  useEffect(() => {
    if (exercise.name === 'Боковая планка' && secondsLeft === 33 && !sidePlankBeepPlayedRef.current) {
      sidePlankBeepPlayedRef.current = true;
      const playBeep = async () => {
        const { sound } = await Audio.Sound.createAsync(
          require('../assets/sounds/side-plank_beep.mp3'),
          { shouldPlay: true }
        );
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            sound.unloadAsync();
          }
        });
      };
      playBeep();
    }
  }, [secondsLeft]);

  // Play finish.wav at 5 seconds remaining
  useEffect(() => {
    if (secondsLeft === 5 && !finishPlayedRef.current) {
      finishPlayedRef.current = true;
      playFinish();
    }
  }, [secondsLeft]);

  // Auto-advance when timer finishes
  useEffect(() => {
    if (isFinished && !hasAdvancedRef.current) {
      hasAdvancedRef.current = true;
      const isLast = exerciseIndex >= exercises.length - 1;
      if (isLast) {
        playEnd();
      }
      const timeout = setTimeout(() => advance(), 1500);
      return () => clearTimeout(timeout);
    }
  }, [isFinished]);

  const advance = useCallback(() => {
    if (exerciseIndex < exercises.length - 1) {
      setExerciseIndex((prev) => prev + 1);
    } else {
      metronomRef.current?.stopAsync().catch(() => {});
      router.replace('/finish');
    }
  }, [exerciseIndex, router]);

  const handleDone = () => {
    hasAdvancedRef.current = true;
    const isLast = exerciseIndex >= exercises.length - 1;
    if (isLast) {
      playEnd();
    }
    advance();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ProgressBar current={exerciseIndex} total={exercises.length} />

        <View style={styles.exerciseBlock}>
          <Text style={styles.exerciseName}>{exercise.name}</Text>

          <Image
            source={exercise.image}
            style={styles.exerciseImage}
            resizeMode="contain"
          />

          <TimerDisplay seconds={secondsLeft} />
        </View>

        <Button
          title="Готово"
          onPress={handleDone}
          variant={isFinished ? 'primary' : 'secondary'}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xxl,
  },
  exerciseBlock: {
    alignItems: 'center',
    gap: Spacing.lg,
  },
  exerciseName: {
    fontSize: FontSize.xl,
    fontWeight: '600',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  exerciseImage: {
    width: 150,
    height: 150,
  },
});
