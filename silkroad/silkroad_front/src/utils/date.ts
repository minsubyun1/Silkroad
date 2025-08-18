import {format, parseISO} from 'date-fns';
import {ko} from 'date-fns/locale';

export const formatDateLabel = (dateStr: string) => {
  const date = typeof dateStr === 'string' ? parseISO(dateStr) : new Date(dateStr);
  return format(date, 'yyyy년 M월 d일 EEEE', { locale: ko }); // ex: 2025년 8월 14일 목요일
};

export const formatTime = (dateStr: string) => {
  const date = typeof dateStr === 'string' ? parseISO(dateStr) : new Date(dateStr);
  return format(date, 'HH:mm');
};