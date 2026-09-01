import 'react-native-gesture-handler';
import '../global.css';
import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SQLiteProvider } from 'expo-sqlite';
import { migrateDb } from '@/lib/database';
export default function Layout(): React.JSX.Element { return <GestureHandlerRootView style={{ flex: 1 }}><SQLiteProvider databaseName="openchat.db" onInit={migrateDb}><PaperProvider><Stack screenOptions={{ headerShown: false }} /></PaperProvider></SQLiteProvider></GestureHandlerRootView>; }