import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

// Create the Context object
const AuthContext = createContext(undefined);

/**
 * AuthProvider Component
 * Exposes active session states, credentials verification, and account registration.
 * Connects directly to the stateless backend database API.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child elements
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('crm-token') || null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore user session on mount if token is stored locally
  useEffect(() => {
    const restoreSession = async () => {
      const storedToken = localStorage.getItem('crm-token');
      if (storedToken) {
        try {
          const profileData = await authService.getProfile();
          // API returns { success: true, message, data: { user } }
          if (profileData && profileData.data && profileData.data.user) {
            setUser(profileData.data.user);
            setToken(storedToken);
          } else {
            // Flush corrupt token
            localStorage.removeItem('crm-token');
            setToken(null);
            setUser(null);
          }
        } catch (error) {
          console.error('Session restoration failed:', error);
          localStorage.removeItem('crm-token');
          setToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    restoreSession();
  }, []);

  /**
   * Logs a user in with given credentials.
   * 
   * @param {string} email
   * @param {string} password
   */
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await authService.login(email, password);
      // API returns { success: true, message, data: { user, token } }
      const { user: userData, token: userToken } = response.data;
      
      localStorage.setItem('crm-token', userToken);
      setToken(userToken);
      setUser(userData);
      return response;
    } catch (error) {
      console.error('Login execution error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Registers a new user account.
   * 
   * @param {string} name
   * @param {string} email
   * @param {string} password
   */
  const register = async (name, email, password) => {
    setIsLoading(true);
    try {
      const response = await authService.register(name, email, password);
      // API returns { success: true, message, data: { user, token } }
      const { user: userData, token: userToken } = response.data;

      localStorage.setItem('crm-token', userToken);
      setToken(userToken);
      setUser(userData);
      return response;
    } catch (error) {
      console.error('Registration execution error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logs out the current user, clearing session states.
   */
  const logout = () => {
    authService.logout();
    setToken(null);
    setUser(null);
    
    // Hard redirect to clear any memory states and route to login
    window.location.href = '/login';
  };

  /**
   * Updates current user profile details.
   * 
   * @param {Object} updatedFields - Fields (name, oldPassword, newPassword)
   */
  const updateProfile = async (updatedFields) => {
    try {
      const response = await authService.updateProfile(updatedFields);
      // API returns { success: true, message, data: { user } }
      if (response && response.data && response.data.user) {
        setUser(response.data.user);
      }
      return response;
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * useAuth Custom Hook
 * Consumer hook allowing immediate access to AuthContext states and helpers.
 * 
 * @returns {{ user: Object|null, token: string|null, isAuthenticated: boolean, isLoading: boolean, login: (email, password) => Promise<Object>, register: (name, email, password) => Promise<Object>, logout: () => void, updateProfile: (fields: Object) => Promise<Object> }}
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be consumed inside an AuthProvider');
  }
  return context;
};
