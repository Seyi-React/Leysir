export interface Prompt {
  id: string;
  title: string;
  description: string;
  category: string;
  rating: number;
}

export interface NormalizedPrompt extends Prompt {
  normalizedRating: number;
}

export interface PromptFormData {
  title: string;
  description: string;
  category: string;
  rating: number;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiError {
  message: string;
  code?: string;
}