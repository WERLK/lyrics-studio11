const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface GenerateParams {
  theme: string;
  style: string;
  mood: string;
  length: string;
}

export interface GenerateResponse {
  success: boolean;
  lyrics: string;
  isNew: boolean;
  totalVariations: number;
  error?: string;
}

export interface StatsResponse {
  totalLyrics: number;
  popularQueries: Array<{
    prompt_hash: string;
    style: string;
    mood: string;
    length: string;
    count: number;
  }>;
}

export async function generateLyrics(params: GenerateParams): Promise<GenerateResponse> {
  try {
    const response = await fetch(`${API_BASE}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API call failed:', error);
    return {
      success: false,
      lyrics: '',
      isNew: true,
      totalVariations: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function getStats(): Promise<StatsResponse | null> {
  try {
    const response = await fetch(`${API_BASE}/api/stats`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error('Failed to get stats:', error);
    return null;
  }
}

export async function checkHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/api/health`);
    return response.ok;
  } catch {
    return false;
  }
}
