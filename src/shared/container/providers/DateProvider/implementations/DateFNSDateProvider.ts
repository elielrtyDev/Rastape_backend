import {
  differenceInYears,
  getDaysInMonth,
  getDate,
  addDays,
  addHours,
  addMinutes,
  isBefore,
  format,
} from 'date-fns';

import IDateProvider from '../models/IDateProvider';

class DateFNSDateProvider implements IDateProvider {
  differenceInYears(date: Date, compare_date: Date): number {
    return differenceInYears(date, compare_date);
  }

  getDaysInMonth(date: Date): number {
    return getDaysInMonth(date);
  }

  getDay(date: Date): number {
    return getDate(date);
  }

  addDays(date: Date, days: number): Date {
    return addDays(date, days);
  }

  addHours(hours: number): Date {
    return addHours(new Date(), hours);
  }

  addMinutes(minutes: number): Date {
    return addMinutes(new Date(), minutes);
  }

  compareIfBefore(start_date: Date, end_date: Date): boolean {
    return isBefore(start_date, end_date);
  }

  format(date: Date): string {
    return format(date, 'dd/MM/yyyy');
  }

  getDateFromString(dateString: string): Date {
    const [day, month, year] = dateString.split('/');

    const date = new Date(`${year}-${month}-${day} 00:00:00`);

    return date;
  }
}

export default DateFNSDateProvider;
