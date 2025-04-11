'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, UserRole } from './auth';

// Define the Authentication context interface
interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  userRole: UserRole;
  updateUserRole: (role: UserRole) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAuthenticated: false,
  userRole: null,
  updateUserRole: () => {},
  setUser: () => {},
  logout: () => {},
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const router = useRouter();

  useEffect(() => {
    // Load user data from localStorage on initial render (client-side only)
    const loadUserFromStorage = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedRole = localStorage.getItem('userRole');
        
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setUserRole(parsedUser.role || (storedRole as UserRole || null));
        } else {
          setUser(null);
          setUserRole(null);
        }
      } catch (error) {
        console.error('Error loading user from storage:', error);
        setUser(null);
        setUserRole(null);
      } finally {
        setLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  const updateUserRole = (role: UserRole) => {
    setUserRole(role);
    
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      localStorage.setItem('userRole', role || '');
    }
  };

  const logout = () => {
    // Clear user from local storage
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    
    // Reset state
    setUser(null);
    setUserRole(null);
    
    // Redirect to homepage
    router.push('/');
  };

  // Expose auth state and methods to components
  const contextValue: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    userRole,
    updateUserRole,
    setUser: (newUser: User | null) => {
      setUser(newUser);
      
      if (newUser) {
        localStorage.setItem('user', JSON.stringify(newUser));
        setUserRole(newUser.role);
        localStorage.setItem('userRole', newUser.role || '');
      } else {
        localStorage.removeItem('user');
        localStorage.removeItem('userRole');
      }
    },
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}; 