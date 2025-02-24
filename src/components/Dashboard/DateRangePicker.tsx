import React from 'react';
import { formatDate } from '../../utils/dateHelper';

/**
 * Defines the date range picker.
 */
interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
  className?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  className = '',
}) => {
  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <div>
        <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
          Start Date
        </label>
        <input
          type="date"
          id="start-date"
          value={formatDate(startDate, 'yyyy-MM-dd')}
          onChange={(e) => onStartDateChange(new Date(e.target.value))}
          max={formatDate(endDate, 'yyyy-MM-dd')}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-facebook focus:border-facebook rounded-md"
        />
      </div>
      <div>
        <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">
          End Date
        </label>
        <input
          type="date"
          id="end-date"
          value={formatDate(endDate, 'yyyy-MM-dd')}
          onChange={(e) => onEndDateChange(new Date(e.target.value))}
          min={formatDate(startDate, 'yyyy-MM-dd')}
          max={formatDate(new Date(), 'yyyy-MM-dd')}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-facebook focus:border-facebook rounded-md"
        />
      </div>
    </div>
  );
};