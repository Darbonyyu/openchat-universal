import 'react-native-gesture-handler';
import '../global.css';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SQLiteProvider } from 'expo-sqlite';
import { migrateDb } from '@/lib/database';

export default function Layout(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SQLiteProvider databaseName="openchat.db" onInit={migrateDb}>
        <Stack screenOptions={{ headerShown: false }} />
      </SQLiteProvider>
    </GestureHandlerRootView>
  );
}