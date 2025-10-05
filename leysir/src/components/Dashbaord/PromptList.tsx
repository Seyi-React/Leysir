import type { NormalizedPrompt } from '../types';
import { PromptCard } from './PromptCard';

interface PromptListProps {
  prompts: NormalizedPrompt[];
  onUpdateRating: (id: string, rating: number) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const PromptList = ({ prompts, onUpdateRating, onDelete }: PromptListProps) => {
  if (prompts.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">No prompts found</h3>
        <p className="text-gray-600">Try adjusting your search or add a new prompt</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {prompts.map((prompt) => (
        <PromptCard
          key={prompt.id}
          prompt={prompt}
          onUpdateRating={onUpdateRating}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};