/**
 * Types for insights.
 */
export interface DateRange {
  since: string;
  until: string;
}

export interface FacebookPage {
  id: string;
  name: string;
  access_token: string;
  picture?: {
    data: {
      url: string;
    };
  };
  category?: string;
  fan_count?: number;
}

export interface PageInsights {
  
    followers: number;
    engagement: number;
    impressions: number;
    reactions: number;
    engagementDetails: {
      totalEngagements: number;
      postImpressions: number;
    };
    impressionDetails: {
      unique: number;
      paid: number;
      organic: number;
    };
    reactionDetails: {
      like: number;
      love: number;
    };
  
}