import type { Prompt, PromptFormData } from '../types';
import { denormalizeRating } from '../util/ratingNormalizer';

const API_BASE_URL = 'https://68dedf2c898434f413564016.mockapi.io/api/v1/Prompts';

// Helper to handle API errors
const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error: ${response.status} - ${errorText || response.statusText}`);
  }
  return response.json();
};

export const api = {
  // Fetch all prompts
  getPrompts: async (): Promise<Prompt[]> => {
    const response = await fetch(API_BASE_URL);
    return handleResponse<Prompt[]>(response);
  },

  // Create a new prompt
  createPrompt: async (data: PromptFormData): Promise<Prompt> => {
    // Convert normalized rating (0-5) back to raw rating (0-100)
    const rawRating = denormalizeRating(data.rating);
    
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: data.title,
        description: data.description,
        category: data.category,
        rating: rawRating,
      }),
    });
    return handleResponse<Prompt>(response);
  },

  // Update a prompt's rating
  updatePromptRating: async (id: string, normalizedRating: number): Promise<Prompt> => {
    // Convert normalized rating back to raw
    const rawRating = denormalizeRating(normalizedRating);
    
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rating: rawRating,
      }),
    });
    return handleResponse<Prompt>(response);
  },

  // Delete a prompt
  deletePrompt: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    await handleResponse<void>(response);
  },
};