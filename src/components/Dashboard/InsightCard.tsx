import React from 'react';
import { formatMetric } from '../../utils/metricsHelper';

/**
 * Defines the insights cards.
 */
interface InsightCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const InsightCard: React.FC<InsightCardProps> = ({
  title,
  value,
  icon,
  trend,
  className = '',
}) => {
  return (
    <div className={`card bg-[#fff3e6] border-b-4 border-b-[#ffc093] ${className}`}>
      <div className="flex items-center justify-between">
        <div className="text-[#431207]">{title}</div>
        <div className="text-[#431207]">{icon}</div>
      </div>
      <div className="mt-4">
        <div className="text-2xl font-semibold text-[#431207]">{formatMetric(value)}</div>
        {trend && (
          <div className={`flex items-center mt-2 text-sm ${
            trend.isPositive ? 'text-green-500' : 'text-red-500'
          }`}>
            {trend.isPositive ? (
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            ) : (
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            )}
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
    </div>
  );
};