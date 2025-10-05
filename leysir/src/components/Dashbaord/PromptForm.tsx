import { useState } from 'react';
import { Input, TextArea } from '../UI/Input';
import { Select } from '../UI/Select';
import { Button } from '../UI/Button';
import type { PromptFormData, ValidationError } from '../types';
import { validatePromptForm, getErrorMessage } from '../util/validation';
import { getRatingOptions } from '../util/ratingNormalizer';

interface PromptFormProps {
  onSubmit: (data: PromptFormData) => Promise<void>;
  onCancel: () => void;
}

export const PromptForm = ({ onSubmit, onCancel }: PromptFormProps) => {
  const [formData, setFormData] = useState<PromptFormData>({
    title: '',
    description: '',
    category: '',
    rating: 2.5,
  });
  
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ratingOptions = getRatingOptions().map(rating => ({
    value: rating,
    label: `${rating.toFixed(1)} stars`,
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validatePromptForm(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onCancel(); // Close form on success
    } catch (error) {
      // Error is handled by the parent component
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof PromptFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => prev.filter(e => e.field !== field));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Title *"
        placeholder="Enter prompt title"
        value={formData.title}
        onChange={(e) => handleChange('title', e.target.value)}
        error={getErrorMessage(errors, 'title')}
      />
      
      <TextArea
        label="Description *"
        placeholder="Enter prompt description"
        value={formData.description}
        onChange={(e) => handleChange('description', e.target.value)}
        error={getErrorMessage(errors, 'description')}
        rows={4}
      />
      
      <Input
        label="Category *"
        placeholder="e.g., Writing, Coding, Marketing"
        value={formData.category}
        onChange={(e) => handleChange('category', e.target.value)}
        error={getErrorMessage(errors, 'category')}
      />
      
      <Select
        label="Rating *"
        options={ratingOptions}
        value={formData.rating}
        onChange={(e) => handleChange('rating', parseFloat(e.target.value))}
        error={getErrorMessage(errors, 'rating')}
      />
      
      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? 'Adding...' : 'Add Prompt'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
};