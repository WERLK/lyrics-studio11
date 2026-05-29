import { create } from 'zustand';
import { GenerateParams, LyricsItem, LyricsLength, LyricsMood, LyricsStyle } from '../types';
import { generateLyrics } from '../services/lyricsGenerator';

interface LyricsStore {
  currentParams: GenerateParams;
  currentLyrics: string;
  isGenerating: boolean;
  history: LyricsItem[];
  editingLyrics: string;
  historyVisible: boolean;

  setParams: (params: Partial<GenerateParams>) => void;
  setTheme: (theme: string) => void;
  setStyle: (style: LyricsStyle) => void;
  setMood: (mood: LyricsMood) => void;
  setLength: (length: LyricsLength) => void;
  generate: () => Promise<void>;
  clearLyrics: () => void;
  setEditingLyrics: (lyrics: string) => void;
  saveToHistory: () => void;
  loadFromHistory: (item: LyricsItem) => void;
  deleteFromHistory: (id: string) => void;
  toggleFavorite: (id: string) => void;
  setHistoryVisible: (visible: boolean) => void;
  loadHistory: () => void;
}

export const HISTORY_KEY = 'lyrics_history';

export const useLyricsStore = create<LyricsStore>((set, get) => ({
  currentParams: {
    theme: '',
    style: 'pop',
    mood: 'happy',
    length: 'medium',
  },
  currentLyrics: '',
  isGenerating: false,
  history: [],
  editingLyrics: '',
  historyVisible: false,

  setParams: (params) => {
    set((state) => ({
      currentParams: { ...state.currentParams, ...params },
    }));
  },

  setTheme: (theme) => {
    set((state) => ({
      currentParams: { ...state.currentParams, theme },
    }));
  },

  setStyle: (style) => {
    set((state) => ({
      currentParams: { ...state.currentParams, style },
    }));
  },

  setMood: (mood) => {
    set((state) => ({
      currentParams: { ...state.currentParams, mood },
    }));
  },

  setLength: (length) => {
    set((state) => ({
      currentParams: { ...state.currentParams, length },
    }));
  },

  generate: async () => {
    const { currentParams } = get();
    if (!currentParams.theme.trim()) {
      return;
    }

    set({ isGenerating: true });

    try {
      const lyrics = await generateLyrics(currentParams);
      set({ currentLyrics: lyrics, editingLyrics: lyrics });
    } finally {
      set({ isGenerating: false });
    }
  },

  clearLyrics: () => {
    set({ currentLyrics: '', editingLyrics: '' });
  },

  setEditingLyrics: (lyrics) => {
    set({ editingLyrics: lyrics });
  },

  saveToHistory: () => {
    const { currentParams, currentLyrics } = get();
    if (!currentLyrics.trim()) return;

    const newItem: LyricsItem = {
      id: Date.now().toString(),
      theme: currentParams.theme,
      style: currentParams.style,
      mood: currentParams.mood,
      length: currentParams.length,
      content: currentLyrics,
      createdAt: Date.now(),
      isFavorite: false,
    };

    const history = [newItem, ...get().history].slice(0, 50);
    set({ history });

    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  },

  loadFromHistory: (item) => {
    set({
      currentParams: {
        theme: item.theme,
        style: item.style,
        mood: item.mood,
        length: item.length,
      },
      currentLyrics: item.content,
      editingLyrics: item.content,
    });
  },

  deleteFromHistory: (id) => {
    const history = get().history.filter((item) => item.id !== id);
    set({ history });

    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (e) {
      console.error('Failed to update localStorage:', e);
    }
  },

  toggleFavorite: (id) => {
    const history = get().history.map((item) =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    );
    set({ history });

    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (e) {
      console.error('Failed to update localStorage:', e);
    }
  },

  setHistoryVisible: (visible) => {
    set({ historyVisible: visible });
  },

  loadHistory: () => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY);
      if (saved) {
        const history = JSON.parse(saved) as LyricsItem[];
        set({ history });
      }
    } catch (e) {
      console.error('Failed to load from localStorage:', e);
    }
  },
}));
