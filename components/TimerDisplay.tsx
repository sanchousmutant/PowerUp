import { Text, StyleSheet } from 'react-native';
import { Colors, FontSize } from '../constants/theme';
import { formatTime } from '../utils/formatTime';

type Props = {
  seconds: number;
};

export function TimerDisplay({ seconds }: Props) {
  return <Text style={styles.timer}>{formatTime(seconds)}</Text>;
}

const styles = StyleSheet.create({
  timer: {
    fontSize: FontSize.giant,
    fontWeight: '200',
    color: Colors.textPrimary,
    fontVariant: ['tabular-nums'],
  },
});
