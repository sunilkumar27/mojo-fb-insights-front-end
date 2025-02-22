import { FacebookPage, PageInsights, DateRange } from '../types/insights';
import type { FacebookStatusResponse } from '../types/facebook';
import { api } from './api';

export class FacebookService {
  static async getPages(): Promise<FacebookPage[]> {
    try {
      // Add logging to see the exact response
    const response = await api.get<{ data: FacebookPage[] }>('/insights/pages');
    
    // Check if data exists in the response
    if (!response.data) {
      console.error('No data in response:', response);
      return [];
    }

    // If the data structure is different, adjust accordingly
    const pages = response.data.data || response.data;
  
    return Array.isArray(pages) ? pages : [];
    } catch (error) {
      console.error('Failed to fetch pages:', error);
      throw error;
    }
  }

  static async getPageInsights(
    pageId: string,
    dateRange: DateRange
  ): Promise<PageInsights> {
    try {
      const response = await api.get<PageInsights>(
        `/insights/pages/${pageId}`,
        {
          params: {
            since: dateRange.since,
            until: dateRange.until
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch page insights:', error);
      throw error;
    }
  }

  static async verifyAccessToken(accessToken: string) {
    try {
      const response = await api.post('/auth/verify', { accessToken });
      if (response.data) {
        localStorage.setItem('token', accessToken);
      } else {
        localStorage.removeItem('token');
      }      
      return response.data;
    } catch (error) {
      console.error('Failed to verify access token:', error);
      localStorage.removeItem('token'); // Clear invalid token
      throw error;
    }
  }

  static login(): Promise<FacebookStatusResponse> {
    return new Promise((resolve, reject) => {
      if (!window.FB) {
        reject(new Error('Facebook SDK not initialized'));
        return;
      }

      // Regular function instead of async
      window.FB.login(function(response: FacebookStatusResponse) {
        if (response.status === 'connected' && response.authResponse) {
          resolve(response);
        } else {
          reject(new Error('Facebook login failed'));
        }
      }, {
        scope: 'public_profile,email,pages_show_list,pages_read_engagement,pages_manage_metadata',
      });
    });
  }

  static async logout(): Promise<void> {
    return new Promise((resolve) => {
      window.FB.logout(() => {
        localStorage.removeItem('token'); // Clear stored token
        resolve();
      });
    });
  }

  // Helper method to check if user is authenticated
  static isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // Helper method to get stored token
  static getToken(): string | null {
    return localStorage.getItem('token');
  }
}