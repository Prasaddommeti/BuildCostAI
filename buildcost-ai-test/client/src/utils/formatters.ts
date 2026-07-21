export const currencySymbols: Record<string, string> = {
  USD: '$',
  INR: '₹',
  EUR: '€',
  GBP: '£',
  AED: 'AED '
};

export const currencyRates: Record<string, number> = {
  USD: 1,
  INR: 83.5,
  EUR: 0.92,
  GBP: 0.78,
  AED: 3.67
};

export function formatCurrency(amount: number, currencyCode: string = 'USD'): string {
  const rate = currencyRates[currencyCode] || 1;
  const symbol = currencySymbols[currencyCode] || '$';
  const converted = amount * rate;

  if (currencyCode === 'INR') {
    return `${symbol}${Math.round(converted).toLocaleString('en-IN')}`;
  }
  return `${symbol}${Math.round(converted).toLocaleString('en-US')}`;
}

export function formatArea(areaSqFt: number, unit: string = 'sq.ft'): string {
  if (unit === 'sq.m') {
    const sqM = areaSqFt * 0.092903;
    return `${Math.round(sqM).toLocaleString()} sq.m`;
  }
  return `${areaSqFt.toLocaleString()} sq.ft`;
}

export function formatDate(dateString: string): string {
  if (!dateString) return 'Just now';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}
