import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { api } from '../services/api';
import { FacebookService } from '../services/facebook';

interface AuthUser {
  id: string;
  name: string;
  email?: string;
  picture?: {
    data: {
      url: string;
    };
  };
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  userProfile: AuthUser | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
AuthContext.displayName = 'AuthContext';

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<AuthUser | null>(null);

  // Handle successful authentication
  const handleAuthSuccess = (token: string) => {
    return FacebookService.verifyAccessToken(token)
      .then(response => {
        setUserProfile(response.user);
        setIsAuthenticated(true);
      })
      .catch(error => {
        console.error('Auth error:', error);
        return logout();
      });
  };

  // Check if user is already authenticated
  const checkAuthStatus = useCallback(() => {
    const token = FacebookService.getToken();
    if (token) {
      handleAuthSuccess(token)
        .catch(error => {
          console.error('Auth status check failed:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  // Initialize Facebook SDK
  useEffect(() => {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: import.meta.env.VITE_FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v22.0'
      });
      
      checkAuthStatus();
    };

    // Load Facebook SDK
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, [checkAuthStatus]);

  // Handle login
  const login = useCallback(() => {
    return FacebookService.login()
      .then(response => {
        if (response.authResponse) {
          return handleAuthSuccess(response.authResponse.accessToken);
        }
        throw new Error('No auth response from Facebook');
      })
      .catch(error => {
        console.error('Login failed:', error);
        throw error;
      });
  }, []);

  // Handle logout
  const logout = useCallback(() => {
    return FacebookService.logout()
      .then(() => {
        setUserProfile(null);
        setIsAuthenticated(false);
      })
      .catch(error => {
        console.error('Logout failed:', error);
      });
  }, []);

  // Setup API interceptor for token handling
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      response => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          await logout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [logout]);

  const value = {
    isAuthenticated,
    isLoading,
    userProfile,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useFacebookAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useFacebookAuth must be used within an AuthProvider');
  }
  return context;
}

export default useFacebookAuth;