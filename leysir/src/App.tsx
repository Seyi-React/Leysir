import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Login } from './components/Auth/Login';
import { Dashboard } from './components/Dashbaord/Dashboard.tsx';

function App() {
  const [username, setUsername] = useState<string | null>(null);

  // Test toast on component mount
  useEffect(() => {
    toast('App loaded!');
  }, []);

  const handleLogin = (user: string) => {
    setUsername(user);
    toast.success(`Welcome back, ${user}!`);
  };

  const handleLogout = () => {
    setUsername(null);
    toast.success('Successfully logged out');
  };

  return (
    <div className="app">
      <Toaster />
      {username ? (
        <Dashboard username={username} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;