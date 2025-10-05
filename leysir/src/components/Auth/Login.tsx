import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';

interface LoginProps {
  onLogin: (username: string) => void;
}

export const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Username is required');
      toast.error('Username is required', {
        id: 'username-required',
      });
      return;
    }
    
    if (username.trim().length < 3) {
      setError('Username must be at least 3 characters');
      toast.error('Username must be at least 3 characters', {
        id: 'username-length',
      });
      return;
    }
    
    toast.promise(
      Promise.resolve(onLogin(username.trim())),
      {
        loading: 'Logging in...',
        success: 'Welcome!',
        error: 'Login failed',
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Prompt Manager</h1>
          <p className="text-gray-600">Enter your username to continue</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError('');
            }}
            error={error}
            autoFocus
          />
          
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};