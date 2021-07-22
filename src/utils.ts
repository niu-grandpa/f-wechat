import { useRoute, useRouter } from 'vue-router';

export const route = () => useRoute();
export const router = () => useRouter();

export const getLocalItem = (key: string) => localStorage.getItem(key);
export const setLocalItem = (key: string, value: string) => localStorage.setItem(key, value);
