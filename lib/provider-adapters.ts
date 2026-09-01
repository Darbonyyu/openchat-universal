import axios from 'axios';
import type { ChatMessage, ModelInfo, ProviderConfig, ProviderFormat } from '@/types/provider';

const clean = (url: string): string => url.replace(/\/$/, '');
export function detectFormat(url: string): ProviderFormat {
  const value = url.toLowerCase();
  if (value.includes('openrouter')) return 'openrouter';
  if (value.includes('anthropic')) return 'anthropic';
  if (value.includes('generativelanguage') || value.includes('googleapis')) return 'gemini';
  if (value.includes(':11434') || value.includes('ollama')) return 'ollama';
  return value.includes('/v1') ? 'openai' : 'custom-openai';
}
const auth = (provider: ProviderConfig): Record<string, string> => provider.apiKey ? { Authorization: `Bearer ${provider.apiKey}` } : {};
export async function discoverProvider(baseURL: string, apiKey: string): Promise<{ format: ProviderFormat; models: ModelInfo[] }> {
  const format = detectFormat(baseURL); const root = clean(baseURL);
  if (format === 'ollama') { const response = await axios.get<{ models: Array<{ name: string }> }>(`${root}/api/tags`); return { format, models: response.data.models.map((m) => ({ id: m.name, name: m.name, supportsStreaming: true })) }; }
  if (format === 'gemini') return { format, models: [] };
  const response = await axios.get<{ data?: Array<{ id: string; name?: string }> }>(`${root}/models`, { headers: auth({ apiKey } as ProviderConfig) });
  return { format, models: (response.data.data ?? []).map((m) => ({ id: m.id, name: m.name ?? m.id, supportsStreaming: true })) };
}
export async function sendMessage(provider: ProviderConfig, messages: ChatMessage[], onToken?: (token: string) => void): Promise<string> {
  const root = clean(provider.baseURL); const last = messages[messages.length - 1]?.content ?? '';
  if (provider.format === 'ollama') { const response = await axios.post<{ message: { content: string } }>(`${root}/api/chat`, { model: provider.defaultModel, messages, stream: false }); return response.data.message.content; }
  if (provider.format === 'anthropic') { const response = await axios.post<{ content: Array<{ text: string }> }>(`${root}/v1/messages`, { model: provider.defaultModel, max_tokens: 2048, messages: messages.filter((m) => m.role !== 'system').map(({ role, content }) => ({ role, content })), system: messages.find((m) => m.role === 'system')?.content }, { headers: { 'x-api-key': provider.apiKey, 'anthropic-version': '2023-06-01' } }); return response.data.content.map((part) => part.text).join(''); }
  if (provider.format === 'gemini') { const response = await axios.post<{ candidates: Array<{ content: { parts: Array<{ text: string }> } }> }>(`${root}/v1beta/models/${provider.defaultModel}:generateContent?key=${provider.apiKey}`, { contents: [{ role: 'user', parts: [{ text: last }] }] }); return response.data.candidates[0]?.content.parts.map((part) => part.text).join('') ?? ''; }
  const response = await axios.post<{ choices: Array<{ message: { content: string } }> }>(`${root}/chat/completions`, { model: provider.defaultModel, messages, stream: false }, { headers: { ...auth(provider), ...provider.customHeaders } }); const answer = response.data.choices[0]?.message.content ?? ''; if (onToken) onToken(answer); return answer;
}