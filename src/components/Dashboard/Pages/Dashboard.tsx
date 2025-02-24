import { useState, useEffect } from 'react';
import { Users, TrendingUp, Eye, ThumbsUp } from 'lucide-react';
import { PageSelector } from '../PageSelector';
import { DateRangePicker } from '../DateRangePicker';
import { InsightCard } from '../InsightCard';
import { useFacebookAuth } from '@/hooks/useFacebookAuth';
import { FacebookService } from '@/services/facebook';
import { getDefaultDateRange } from '@/utils/dateHelper';
import type { FacebookPage, PageInsights } from '@/types/insights';

/**
 * Defines the 
 * @returns 
 */
export const Dashboard: React.FC = () => {
  const { isAuthenticated } = useFacebookAuth();
  const [pages, setPages] = useState<FacebookPage[]>([]);
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [insights, setInsights] = useState<PageInsights | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState(getDefaultDateRange());

  useEffect(() => {
    const fetchPages = async () => {
      if (isAuthenticated) {
        try {
          const pagesData = await FacebookService.getPages();
          
          if (Array.isArray(pagesData)) {
            setPages(pagesData);
            if (pagesData.length > 0) {
              setSelectedPageId(pagesData[0].id);
            }
          } else {
            console.error("Unexpected data format:", pagesData);
          }
        } catch (error) {
          console.error('Failed to fetch pages:', error);
        }
      }
    };

    fetchPages();
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchInsights = async () => {
      if (selectedPageId && dateRange.since && dateRange.until) {
        setIsLoading(true);
        try {
          const insightsData = await FacebookService.getPageInsights(
            selectedPageId,
            dateRange
          );
          setInsights(insightsData);
        } catch (error) {
          console.error('Failed to fetch insights:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchInsights();
  }, [selectedPageId, dateRange]);

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-600">Please log in to view page insights.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Page Insights</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="w-full md:w-3/4">
          <PageSelector
            pages={pages}
            selectedPageId={selectedPageId}
            onPageSelect={setSelectedPageId}
          />
        </div>
        <div className="w-full md:w-1/2">
          <DateRangePicker
            startDate={new Date(dateRange.since)}
            endDate={new Date(dateRange.until)}
            onStartDateChange={(date) =>
              setDateRange((prev) => ({ ...prev, since: date.toISOString().split('T')[0] }))
            }
            onEndDateChange={(date) =>
              setDateRange((prev) => ({ ...prev, until: date.toISOString().split('T')[0] }))
            }
            className="w-full"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-facebook"></div>
        </div>
      ) : insights ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <InsightCard
            title="Total Followers"
            value={insights.followers}
            icon={<Users className="h-6 w-6" />}
          />
          <InsightCard
            title="Total Engagement"
            value={insights.engagement}
            icon={<TrendingUp className="h-6 w-6" />}
          />
          <InsightCard
            title="Total Impressions"
            value={insights.impressions}
            icon={<Eye className="h-6 w-6" />}
          />
          <InsightCard
            title="Total Reactions"
            value={insights.reactions}
            icon={<ThumbsUp className="h-6 w-6" />}
          />
        </div>
      ) : null}

      {insights && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative p-4 bg-cover bg-bottom rounded-2xl shadow-lg bg-[#C4EED2] overflow-hidden">
            <div className="absolute w-[22rem] h-[22rem] top-0 right-[6rem] border border-[#97DEB0] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute w-[14rem] h-[14rem] top-0 right-[6rem] border border-[#97DEB0] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute w-[6rem] h-[6rem] top-0 right-[6rem] border border-[#97DEB0] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4 text-[#0b2817]">Engagement Details</h3>
              <dl className="space-y-4">
                <div className="flex justify-between">
                  <dt className="text-[#0b2817]">Total Engagements</dt>
                  <dd className="font-medium text-[#0b2817]">{insights.engagementDetails.totalEngagements}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#0b2817]">Post Impressions</dt>
                  <dd className="font-medium text-[#0b2817]">{insights.engagementDetails.postImpressions}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="relative p-4 bg-cover bg-bottom rounded-2xl shadow-lg bg-[#f8ccff] overflow-hidden">
            <div className="absolute w-[22rem] h-[22rem] top-0 right-[6rem] border border-[#f6a4ff] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute w-[14rem] h-[14rem] top-0 right-[6rem] border border-[#f6a4ff] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute w-[6rem] h-[6rem] top-0 right-[6rem] border border-[#f6a4ff] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4 text-[#500054]">Impression Details</h3>
              <dl className="space-y-4">
                <div className="flex justify-between">
                  <dt className="text-[#500054]">Unique Impressions</dt>
                  <dd className="font-medium text-[#500054]">{insights.impressionDetails.unique}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#500054]">Paid Impressions</dt>
                  <dd className="font-medium text-[#500054]">{insights.impressionDetails.paid}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#500054]">Organic Impressions</dt>
                  <dd className="font-medium text-[#500054]">{insights.impressionDetails.organic}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}