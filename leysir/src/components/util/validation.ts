import type { PromptFormData, ValidationError } from '../types';

export const getErrorMessage = (errors: ValidationError[], field: string): string | undefined => {
  return errors.find(error => error.field === field)?.message;
};

export const validatePromptForm = (data: PromptFormData): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Title validation
  if (!data.title.trim()) {
    errors.push({
      field: 'title',
      message: 'Title is required'
    });
  } else if (data.title.length < 3) {
    errors.push({
      field: 'title',
      message: 'Title must be at least 3 characters long'
    });
  } else if (data.title.length > 100) {
    errors.push({
      field: 'title',
      message: 'Title must be less than 100 characters'
    });
  }

  // Description validation
  if (!data.description.trim()) {
    errors.push({
      field: 'description',
      message: 'Description is required'
    });
  } else if (data.description.length < 10) {
    errors.push({
      field: 'description',
      message: 'Description must be at least 10 characters long'
    });
  } else if (data.description.length > 1000) {
    errors.push({
      field: 'description',
      message: 'Description must be less than 1000 characters'
    });
  }

  // Category validation
  if (!data.category.trim()) {
    errors.push({
      field: 'category',
      message: 'Category is required'
    });
  }

  // Rating validation
  if (typeof data.rating !== 'number' || data.rating < 0 || data.rating > 5) {
    errors.push({
      field: 'rating',
      message: 'Rating must be between 0 and 5'
    });
  }

  return errors;
};
