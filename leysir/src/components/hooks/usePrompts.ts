import { useState, useEffect, useCallback } from 'react';
import type { Prompt, NormalizedPrompt } from '../types';
import { api } from '../services/api';
import { normalizeRating } from '../util/ratingNormalizer';

export const usePrompts = () => {
  const [prompts, setPrompts] = useState<NormalizedPrompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const normalizePrompt = (prompt: Prompt): NormalizedPrompt => ({
    ...prompt,
    normalizedRating: normalizeRating(prompt.rating),
  });

  const fetchPrompts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedPrompts = await api.getPrompts();
      setPrompts(fetchedPrompts.map(normalizePrompt));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch prompts');
    } finally {
      setLoading(false);
    }
  }, []);

  const createPrompt = async (data: Omit<Prompt, 'id'>) => {
    try {
      const newPrompt = await api.createPrompt(data);
      setPrompts(prev => [...prev, normalizePrompt(newPrompt)]);
    } catch (err) {
      throw err;
    }
  };

  const updateRating = async (id: string, normalizedRating: number) => {
    try {
      const updatedPrompt = await api.updatePromptRating(id, normalizedRating);
      setPrompts(prev =>
        prev.map(p => (p.id === id ? normalizePrompt(updatedPrompt) : p))
      );
    } catch (err) {
      throw err;
    }
  };

  const deletePrompt = async (id: string) => {
    try {
      await api.deletePrompt(id);
      setPrompts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchPrompts();
  }, [fetchPrompts]);

  return {
    prompts,
    loading,
    error,
    createPrompt,
    updateRating,
    deletePrompt,
    fetchPrompts,
  };
};
