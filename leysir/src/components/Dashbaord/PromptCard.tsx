import { useState } from 'react';
import type { NormalizedPrompt } from '../types';
import { Button } from '../UI/Button';
import { Select } from '../UI/Select';
import { RatingDisplay } from '../RatingDisplay';
import { getRatingOptions } from '../util/ratingNormalizer';

interface PromptCardProps {
  prompt: NormalizedPrompt;
  onUpdateRating: (id: string, rating: number) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const PromptCard = ({ prompt, onUpdateRating, onDelete }: PromptCardProps) => {
  const [isEditingRating, setIsEditingRating] = useState(false);
  const [newRating, setNewRating] = useState(prompt.normalizedRating);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const ratingOptions = getRatingOptions().map(rating => ({
    value: rating,
    label: `${rating.toFixed(1)}`,
  }));

  const handleUpdateRating = async () => {
    if (newRating === prompt.normalizedRating) {
      setIsEditingRating(false);
      return;
    }
    
    setIsUpdating(true);
    try {
      await onUpdateRating(prompt.id, newRating);
      setIsEditingRating(false);
    } catch (error) {
      // Error handled by parent
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this prompt?')) {
      return;
    }
    
    setIsDeleting(true);
    try {
      await onDelete(prompt.id);
    } catch (error) {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{prompt.title}</h3>
          <span className="inline-block px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
            {prompt.category}
          </span>
        </div>
        <Button
          variant="danger"
          size="sm"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </div>
      
      <p className="text-gray-600 mb-4">{prompt.description}</p>
      
      <div className="flex items-center gap-4">
        {isEditingRating ? (
          <div className="flex items-center gap-2">
            <Select
              options={ratingOptions}
              value={newRating}
              onChange={(e) => setNewRating(parseFloat(e.target.value))}
              className="w-24"
            />
            <Button
              size="sm"
              onClick={handleUpdateRating}
              disabled={isUpdating}
            >
              {isUpdating ? 'Saving...' : 'Save'}
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                setIsEditingRating(false);
                setNewRating(prompt.normalizedRating);
              }}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <>
            <RatingDisplay rating={prompt.normalizedRating} />
            <button
              onClick={() => setIsEditingRating(true)}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Edit Rating
            </button>
          </>
        )}
      </div>
    </div>
  );
};