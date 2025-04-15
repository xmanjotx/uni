export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface FileAnalysisResponse {
  analysis: string;
  error?: string;
}

export interface ChatResponse {
  reply: string;
  error?: string;
}
