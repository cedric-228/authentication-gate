import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'youth' | 'project-owner';
  photo?: string;
  bio?: string;
  location?: string;
  badges: string[];
  completedMissions: number;
  skills: string[];
  phone?: string;
  whatsapp?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'youth' | 'project-owner') => Promise<void>;
  register: (email: string, password: string, name: string, role: 'youth' | 'project-owner') => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('yovo-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: 'youth' | 'project-owner') => {
    try {
      // Simulate API call with proper error handling
      if (!email || !password) {
        throw new Error('Email et mot de passe requis');
      }
      
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
        role,
        badges: [],
        completedMissions: 0,
        skills: [],
        phone: '',
        whatsapp: '',
      };
      
      setUser(newUser);
      localStorage.setItem('yovo-user', JSON.stringify(newUser));
      localStorage.setItem('auth-token', 'mock-token-' + Date.now());
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string, role: 'youth' | 'project-owner') => {
    try {
      // Simulate API call with proper error handling
      if (!email || !password || !name) {
        throw new Error('Tous les champs sont requis');
      }
      
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        role,
        badges: [],
        completedMissions: 0,
        skills: [],
        phone: '',
        whatsapp: '',
      };
      
      setUser(newUser);
      localStorage.setItem('yovo-user', JSON.stringify(newUser));
      localStorage.setItem('auth-token', 'mock-token-' + Date.now());
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('yovo-user');
    localStorage.removeItem('auth-token');
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('yovo-user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateProfile,
      isLoading,
    }}>
      {children}
    </AuthContext.Provider>
  );
};