import React from 'react';
import { FacebookPage } from '../../types/insights';

/**
 * Page selector to select the page.
 */
interface PageSelectorProps {
  pages: FacebookPage[];
  selectedPageId: string | null;
  onPageSelect: (pageId: string) => void;
}

export const PageSelector: React.FC<PageSelectorProps> = ({
  pages,
  selectedPageId,
  onPageSelect
}) => {
  return (
    <div className="w-full">
      <div>
        <label htmlFor="select-page" className="block text-sm font-medium text-gray-700">
          Select Page
        </label>
        <select
          value={selectedPageId || ''}
          onChange={(e) => onPageSelect(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Select a page</option>
          {pages.map((page) => (
            <option key={page.id} value={page.id}>
              {page.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};