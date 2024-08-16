import * as FileSystem from "expo-file-system";
export const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL || "https://jsonplaceholder.typicode.com"
export const PADDING_H = 10;
export const CARD_WIDTH = 180; 
export const CACHE_PATH = FileSystem.cacheDirectory;