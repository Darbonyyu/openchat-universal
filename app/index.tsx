import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { Bot, ChevronRight, Command, Plus, Settings2, Sparkles } from 'lucide-react-native';
import Markdown from 'react-native-markdown-display';
import { useSQLiteContext } from 'expo-sqlite';
import { useAppStore } from '@/store/useAppStore';
import { loadMessages } from '@/lib/database';
import { sendMessage } from '@/lib/provider-adapters';
import type { ChatMessage } from '@/types/provider';

export default function ChatScreen(): React.JSX.Element {
  const [input, setInput] = useState('');
  const db = useSQLiteContext();
  const messages = useAppStore((state) => state.messages);
  const provider = useAppStore((state) => state.providers.find((item) => item.id === state.activeProviderId));
  const addMessage = useAppStore((state) => state.addMessage);
  const setMessages = useAppStore((state) => state.setMessages);
  useEffect(() => { void loadMessages(db).then(setMessages); }, [db, setMessages]);
  const persist = async (message: ChatMessage): Promise<void> => { await db.runAsync('INSERT OR REPLACE INTO chats (id, role, content, created_at) VALUES (?, ?, ?, ?)', message.id, message.role, message.content, message.createdAt); };
  const send = async (): Promise<void> => {
    if (!input.trim() || !provider) return;
    const user: ChatMessage = { id: `${Date.now()}-u`, role: 'user', content: input.trim(), createdAt: new Date().toISOString() };
    addMessage(user); await persist(user); setInput('');
    try { const answer = await sendMessage(provider, [...messages, user]); const assistant: ChatMessage = { id: `${Date.now()}-a`, role: 'assistant', content: answer, createdAt: new Date().toISOString() }; addMessage(assistant); await persist(assistant); }
    catch { const failure: ChatMessage = { id: `${Date.now()}-e`, role: 'assistant', content: 'Connection failed. Check your provider settings.', createdAt: new Date().toISOString() }; addMessage(failure); await persist(failure); }
  };
  return <View className="flex-1 bg-paper"><View className="px-6 pt-16 pb-5 flex-row items-center justify-between"><View><Text className="text-xs font-bold tracking-[3px] text-muted">OPENCHAT / UNIVERSAL</Text><Text className="text-3xl font-bold text-ink mt-1">Your AI desk.</Text></View><Pressable onPress={() => router.push('/connect')} className="h-11 w-11 rounded-full bg-ink items-center justify-center"><Plus color="#D9FF45" size={22} /></Pressable></View><View className="mx-6 mb-5 rounded-2xl bg-ink p-5"><View className="flex-row items-center gap-2"><Sparkles color="#D9FF45" size={16} /><Text className="text-lime text-xs font-bold tracking-widest">UNIVERSAL MODE</Text></View><Text className="text-white text-lg font-semibold mt-3">One chat. Every model.</Text><Text className="text-[#A6A69F] mt-1">Connect any cloud or local endpoint in seconds.</Text><Pressable onPress={() => router.push('/connect')} className="mt-4 flex-row items-center"><Text className="text-lime font-bold">Connect a provider</Text><ChevronRight color="#D9FF45" size={18} /></Pressable></View><ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingBottom: 20 }}>{messages.length === 0 ? <View className="items-center pt-20"><View className="h-16 w-16 rounded-2xl bg-white items-center justify-center"><Command color="#121212" size={28} /></View><Text className="text-2xl font-bold text-ink mt-5">Start with a thought.</Text><Text className="text-muted text-center mt-2">Ask anything, switch models whenever you want.</Text></View> : messages.map((message) => <View key={message.id} className={`mb-4 max-w-[88%] rounded-2xl p-4 ${message.role === 'user' ? 'bg-ink self-end' : 'bg-white self-start'}`}>{message.role === 'assistant' ? <Markdown style={{ body: { color: '#121212' } }}>{message.content}</Markdown> : <Text className="text-white">{message.content}</Text>}</View>)}</ScrollView><View className="border-t border-line bg-paper px-5 py-4"><View className="flex-row items-center rounded-2xl bg-white px-4 py-2"><TextInput value={input} onChangeText={setInput} onSubmitEditing={send} placeholder={provider ? `Message ${provider.defaultModel}` : 'Connect a provider first'} placeholderTextColor="#9A9A91" className="flex-1 text-ink" multiline /><Pressable onPress={send} className="h-10 w-10 rounded-xl bg-lime items-center justify-center"><Bot color="#121212" size={19} /></Pressable></View><Pressable onPress={() => router.push('/connect')} className="mt-3 flex-row items-center justify-center gap-2"><Settings2 color="#74746E" size={14} /><Text className="text-xs text-muted">{provider ? `${provider.name} · ${provider.defaultModel}` : 'No provider connected'}</Text></Pressable></View></View>;
}