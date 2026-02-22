import { ImageSourcePropType } from 'react-native';
import { AVPlaybackSource } from 'expo-av';

export type Exercise = {
  name: string;
  duration: number; // seconds
  image: ImageSourcePropType;
  sound: AVPlaybackSource;
};

export const exercises: Exercise[] = [
  { name: 'Отжимания', duration: 20, image: require('../assets/images/push-ups.png'), sound: require('../assets/sounds/push-ups.wav') },
  { name: 'Планка', duration: 90, image: require('../assets/images/plank.png'), sound: require('../assets/sounds/plank.wav') },
  { name: 'Боковая планка', duration: 60, image: require('../assets/images/side-plank.png'), sound: require('../assets/sounds/side-plank.wav') },
  { name: 'Альпинист', duration: 50, image: require('../assets/images/mountain-climbers.png'), sound: require('../assets/sounds/mountain-climbers.wav') },
  { name: 'Прыжки', duration: 50, image: require('../assets/images/jumping-jacks.png'), sound: require('../assets/sounds/jumping-jacks.wav') },
  { name: 'Приседания', duration: 20, image: require('../assets/images/squats.png'), sound: require('../assets/sounds/squats.wav') },
];
