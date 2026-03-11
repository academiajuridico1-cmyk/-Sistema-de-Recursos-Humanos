import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateAge(birthDate: string): number {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

export function calculateTimeDiff(startDate: string, endDate?: string): { years: number, months: number, days: number } {
  if (!startDate) return { years: 0, months: 0, days: 0 };
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }
  
  return { years, months, days };
}

export function formatTimeDiff(diff: { years: number, months: number, days: number }): string {
  const parts = [];
  if (diff.years > 0) parts.push(`${diff.years} ano${diff.years > 1 ? 's' : ''}`);
  if (diff.months > 0) parts.push(`${diff.months} mê${diff.months > 1 ? 'ses' : 's'}`);
  if (diff.days > 0) parts.push(`${diff.days} dia${diff.days > 1 ? 's' : ''}`);
  return parts.join(', ') || '0 dias';
}
