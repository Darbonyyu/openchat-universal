import { useState } from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Check, LoaderCircle, Radio } from 'lucide-react-native';
import { discoverProvider } from '@/lib/provider-adapters';
import { saveProviderKey } from '@/lib/secrets';
import { useAppStore } from '@/store/useAppStore';

export default function ConnectScreen(): React.JSX.Element {
  const [url, setUrl] = useState('');
  const [key, setKey] = useState('');
  const [loading, setLoading] = useState(false);
  const addProvider = useAppStore((state) => state.addProvider);
  const connect = async (): Promise<void> => {
    if (!url.trim()) return;
    setLoading(true);
    try {
      const result = await discoverProvider(url.trim(), key.trim());
      const id = `${Date.now()}`;
      addProvider({ id, name: new URL(url.trim()).hostname, baseURL: url.trim(), apiKey: '', format: result.format, models: result.models, defaultModel: result.models[0]?.id ?? 'default', isLocal: result.format === 'ollama' });
      await saveProviderKey(id, key.trim());
      router.back();
    } catch (error) { Alert.alert('Could not connect', error instanceof Error ? error.message : 'Check the URL and credentials.'); } finally { setLoading(false); }
  };
  return <View className="flex-1 bg-paper px-6 pt-16"><Pressable onPress={() => router.back()} className="h-10 w-10 rounded-full bg-white items-center justify-center"><ArrowLeft color="#121212" size={20} /></Pressable><Text className="text-4xl font-bold text-ink mt-8">Add a provider.</Text><Text className="text-muted text-base mt-3 leading-6">Paste an endpoint. OpenChat will detect the protocol and discover available models.</Text><View className="mt-10 gap-5"><View><Text className="text-xs font-bold tracking-widest text-muted mb-2">BASE URL</Text><TextInput value={url} onChangeText={setUrl} autoCapitalize="none" keyboardType="url" placeholder="https://api.example.com/v1" placeholderTextColor="#9A9A91" className="rounded-2xl bg-white px-4 py-4 text-ink" /></View><View><Text className="text-xs font-bold tracking-widest text-muted mb-2">API KEY <Text className="font-normal tracking-normal">(optional for local)</Text></Text><TextInput value={key} onChangeText={setKey} secureTextEntry placeholder="sk-..." placeholderTextColor="#9A9A91" className="rounded-2xl bg-white px-4 py-4 text-ink" /></View></View><View className="mt-8 rounded-2xl border border-line p-4 gap-3"><View className="flex-row items-center gap-3"><Radio color="#121212" size={18} /><Text className="font-semibold text-ink">Auto-detection enabled</Text></View><Text className="text-sm text-muted">OpenAI-compatible, Anthropic, Gemini, Ollama and custom endpoints.</Text></View><Pressable disabled={loading || !url.trim()} onPress={connect} className={`mt-auto mb-8 rounded-2xl py-4 items-center ${loading || !url.trim() ? 'bg-[#D8D8D1]' : 'bg-ink'}`}>{loading ? <LoaderCircle color="#D9FF45" size={22} /> : <View className="flex-row items-center gap-2"><Check color="#D9FF45" size={18} /><Text className="text-lime font-bold">Detect & connect</Text></View>}</Pressable></View>;
}