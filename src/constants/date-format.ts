
export const BASIC_DATE_FORMAT = 'yyyy-MM-DD';
export const BASIC_DATE_TIME_FORMAT = 'yyyy-MM-DDTHH:mm:ss';
export const BASIC_TIME_FORMAT = 'HH:mm:ss';
export const BASIC_DATE_FORMAT_MM_DD_YYYY = 'MM-DD-yyyy';
export const BASIC_MONTH_DATE_FORMAT = 'MM/DD/yyyy';

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export const formatDateToMMDDYYYY = (isoDate: string): string => {
  const [year, month, day] = isoDate.split('-');
  return `${month}/${day}/${year}`;
};

export const formatIsoDateToMMDDYYYY = (isoDate: string): string => {
  const date = new Date(isoDate);
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};


export const formatTime = (time: string) => {
  return new Date(time).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatymd = (isoDate: string): string => {
  const [year, month, day] = isoDate.split('-');
  return `${year}-${month}-${day}`;
};

export const formatDateToISO = (dateString: string) => {
  if (!dateString) return undefined;
  if (dateString.includes('T')) return dateString;
  return `${dateString}T00:00:00Z`;
};

export const getCurrentDate = (): string => {
  const currentDate = new Date().toISOString().split('T')[0];
  return currentDate;
};

export const formatToYMD =(date: string): string => {
  const datePart = date.split('-')[0];
  const [dd, mm, yyyy] = datePart.split('/');
  if (yyyy && mm && dd) {
    return `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
  }
  return '';
}