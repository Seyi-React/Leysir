import { useState, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { usePrompts } from '../hooks/usePrompts';
import type { NormalizedPrompt } from '../types';
import { PromptList } from './PromptList';
import { SearchFilter } from './SearchFilter';
import { PromptForm } from './PromptForm';

import { Modal } from '../UI/Modal';

import { Button } from '../UI/Button';
import { Loader } from '../UI/Loader';

import { ErrorState } from '../UI/ErrorState';

interface DashboardProps {
  username: string;
  onLogout: () => void;
}

export const Dashboard = ({ username, onLogout }: DashboardProps) => {
  const { prompts, loading, error, createPrompt, updateRating, deletePrompt, fetchPrompts } = usePrompts();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Get unique categories from prompts
  const categories = useMemo(() => {
    const cats = new Set(prompts.map((p: NormalizedPrompt) => p.category));
    return Array.from(cats).sort();
  }, [prompts]);

  // Filter prompts based on search and category
  const filteredPrompts = useMemo(() => {
    return prompts.filter((prompt: NormalizedPrompt) => {
      const matchesSearch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || prompt.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [prompts, searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Prompt Manager</h1>
              <p className="text-sm text-gray-600">Welcome, {username}</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => setIsFormOpen(true)}>
                Add New Prompt
              </Button>
              <Button variant="secondary" onClick={onLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
        />

        {loading && prompts.length === 0 ? (
          <Loader />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchPrompts} />
        ) : (
          <PromptList
            prompts={filteredPrompts}
            onUpdateRating={async (id, rating) => { 
              toast.promise(
                updateRating(id, rating),
                {
                  loading: 'Updating rating...',
                  success: 'Rating updated successfully',
                  error: 'Failed to update rating',
                }
              );
            }}
            onDelete={async (id) => {
              toast.promise(
                deletePrompt(id),
                {
                  loading: 'Deleting prompt...',
                  success: 'Prompt deleted successfully',
                  error: 'Failed to delete prompt',
                }
              );
            }}
          />
        )}
      </main>

      {/* Add Prompt Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Add New Prompt"
      >
        <PromptForm
          onSubmit={async (data) => {
            const toastId = toast.loading('Adding new prompt...');
            try {
              await createPrompt(data);
              toast.success('Prompt created successfully', { id: toastId });
              setIsFormOpen(false);
            } catch (error) {
              toast.error('Failed to create prompt', { id: toastId });
              throw error;
            }
          }}
          onCancel={() => setIsFormOpen(false)}
        />
      </Modal>
    </div>
  );
};