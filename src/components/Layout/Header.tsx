import React from 'react';
import { useFacebookAuth } from '../../hooks/useFacebookAuth';

/**
 * Header to display the app title and user profile.
 */
export const Header: React.FC = () => {
  const { userProfile, logout } = useFacebookAuth();

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">Facebook Page Insights</h1>
          </div>
          
          <div className="flex items-center">
            {userProfile && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {userProfile.picture?.data?.url && (
                    <img
                      src={userProfile.picture.data.url}
                      alt={userProfile.name}
                      className="h-8 w-8 rounded-full"
                    />
                  )}
                  <span className="text-sm font-medium text-gray-700">{userProfile.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};