interface IDateProvider {
  differenceInYears(date: Date, compare_date: Date): number;
  getDaysInMonth(date: Date): number;
  getDay(date: Date): number;
  addDays(date: Date, days: number): Date;
  addHours(hours: number): Date;
  addMinutes(minutes: number): Date;
  compareIfBefore(start_date: Date, end_date: Date): boolean;
  format(date: Date): string;
  getDateFromString(dateString: string): Date;
}

export default IDateProvider;
