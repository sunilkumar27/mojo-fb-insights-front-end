import { format, subDays, subMonths, startOfDay, endOfDay } from 'date-fns';

export const DATE_FORMAT = 'yyyy-MM-dd';

export const formatDate = (date: Date, formatStr: string = DATE_FORMAT): string => {
  return format(date, formatStr);
};

export const getDefaultDateRange = () => {
  const endDate = endOfDay(new Date());
  const startDate = startOfDay(subDays(endDate, 30));

  return {
    since: formatDate(startDate),
    until: formatDate(endDate),
  };
};

export const getComparisonDateRange = (since: string, until: string) => {
  const startDate = new Date(since);
  const endDate = new Date(until);
  const daysDiff = Math.floor(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  return {
    since: formatDate(subDays(startDate, daysDiff)),
    until: formatDate(subDays(endDate, daysDiff)),
  };
};

export const getPresetRanges = () => [
  {
    label: 'Last 7 days',
    value: {
      since: formatDate(subDays(new Date(), 7)),
      until: formatDate(new Date()),
    },
  },
  {
    label: 'Last 30 days',
    value: {
      since: formatDate(subDays(new Date(), 30)),
      until: formatDate(new Date()),
    },
  },
  {
    label: 'Last 3 months',
    value: {
      since: formatDate(subMonths(new Date(), 3)),
      until: formatDate(new Date()),
    },
  },
  {
    label: 'Last 6 months',
    value: {
      since: formatDate(subMonths(new Date(), 6)),
      until: formatDate(new Date()),
    },
  },
];