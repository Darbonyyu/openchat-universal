import * as SecureStore from 'expo-secure-store';
export async function saveProviderKey(providerId: string, apiKey: string): Promise<void> { if (apiKey) await SecureStore.setItemAsync(`openchat.provider.${providerId}`, apiKey); }
export async function loadProviderKey(providerId: string): Promise<string> { return (await SecureStore.getItemAsync(`openchat.provider.${providerId}`)) ?? ''; }