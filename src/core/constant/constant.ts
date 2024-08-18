import * as FileSystem from "expo-file-system";
import { Dimensions } from 'react-native'
export const { width : WIDTH, height:HEIGHT} = Dimensions.get("screen")
export const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL || "https://jsonplaceholder.typicode.com"
export const PADDING_H = 10;
export const CARD_WIDTH = 180; 
export const CACHE_PATH = FileSystem.cacheDirectory;
export const TOTAL_COL = Math.floor(WIDTH / CARD_WIDTH);
  

