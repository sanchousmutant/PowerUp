import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { Colors, FontSize, Spacing } from '../constants/theme';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>POWERUP</Text>
          <Text style={styles.subtitle}>6 упражнений. Без инвентаря. Поехали.</Text>
        </View>
        <Button
          title="Начать тренировку"
          onPress={() => router.replace('/workout')}
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.xxl,
  },
  titleBlock: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  title: {
    fontSize: FontSize.giant,
    fontWeight: '800',
    color: Colors.accent,
    letterSpacing: 6,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
});
