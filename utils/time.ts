import { useTranslations } from '../hooks/useTranslations';

type TFunction = ReturnType<typeof useTranslations>['t'];

export const formatTimeAgo = (date: Date, t: TFunction): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return t('timeYears', { count: Math.floor(interval) });
  interval = seconds / 2592000;
  if (interval > 1) return t('timeMonths', { count: Math.floor(interval) });
  interval = seconds / 86400;
  if (interval > 1) return t('timeDays', { count: Math.floor(interval) });
  interval = seconds / 3600;
  if (interval > 1) return t('timeHours', { count: Math.floor(interval) });
  interval = seconds / 60;
  if (interval > 1) return t('timeMinutes', { count: Math.floor(interval) });
  return t('timeNow');
};
