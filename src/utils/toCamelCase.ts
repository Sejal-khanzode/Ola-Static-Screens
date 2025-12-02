export const toCamelCase = (value: string): string => {
  if (!value) {
    return '';
  }

  const val = value.replace('_', ' ').trim().replace('_', ' ').replace('_', ' ');

  return val.substring(0, 1).toUpperCase() + val.substring(1).toLowerCase();
};

export const formatPhoneNumber = (phoneNumber: string | undefined): string | undefined => {
  const hasPlus = phoneNumber?.startsWith('+');

  const cleaned = phoneNumber?.replace(/\D/g, '');

  if (!cleaned || cleaned.length < 10) {
    return phoneNumber;
  }

  const firstDigit = cleaned[0];
  const remaining = cleaned.slice(1);
  return `${hasPlus ? '+' : ''}${firstDigit} (${remaining.slice(0, 3)}) - ${remaining.slice(3, 6)} - ${remaining.slice(6, 10)}`;
};
