import { View, Text, StyleSheet, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { Colors, FontSize, Spacing } from '../constants/theme';

export default function FinishScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.messageBlock}>
          <Text style={styles.title}>Тренировка завершена!</Text>
          <Text style={styles.subtitle}>
            Все 6 упражнений выполнены. Отличная работа!
          </Text>
        </View>
        <Button
          title="Теперь можно в душ!"
          onPress={() => BackHandler.exitApp()}
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
  messageBlock: {
    alignItems: 'center',
    gap: Spacing.md,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: '800',
    color: Colors.accent,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
