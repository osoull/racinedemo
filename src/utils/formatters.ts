// Utility function to format numbers in Arabic with optional shortening
export const formatNumber = (number: number, shorten: boolean = false): string => {
  if (shorten && number >= 1000000) {
    return `${new Intl.NumberFormat('ar-SA').format(number / 1000000)} مليون`;
  }
  return new Intl.NumberFormat('ar-SA').format(number);
};

// Utility function to format currency in Saudi Riyals with optional shortening
export const formatCurrency = (amount: number, shorten: boolean = true): string => {
  return `${formatNumber(amount, shorten)} ريال`;
};

// Utility function to format percentage
export const formatPercentage = (value: number): string => {
  return `${formatNumber(value)}%`;
};

// Utility function to format phone numbers in Arabic
export const formatPhoneNumber = (phoneNumber: string): string => {
  // Remove any non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Convert to Arabic numerals
  const arabicNumerals: { [key: string]: string } = {
    '0': '٠', '1': '١', '2': '٢', '3': '٣', '4': '٤',
    '5': '٥', '6': '٦', '7': '٧', '8': '٨', '9': '٩'
  };

  // Format the number in groups: +966 XX XXXX XXXX
  const groups = cleaned.match(/^(\d{3})(\d{2})(\d{4})(\d{4})$/);
  
  if (groups) {
    return `+${groups[1]} ${groups[2].split('').map(d => arabicNumerals[d]).join('')} ${groups[3].split('').map(d => arabicNumerals[d]).join('')} ${groups[4].split('').map(d => arabicNumerals[d]).join('')}`;
  }

  // If the number doesn't match the expected format, just convert to Arabic numerals
  return cleaned.split('').map(d => arabicNumerals[d] || d).join('');
};