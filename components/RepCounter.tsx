import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSize, Spacing } from '../constants/theme';

type Props = {
  reps: number;
};

export function RepCounter({ reps }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.count}>{reps}</Text>
      <Text style={styles.label}>повторений</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  count: {
    fontSize: FontSize.giant,
    fontWeight: '200',
    color: Colors.textPrimary,
  },
  label: {
    fontSize: FontSize.lg,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
});
