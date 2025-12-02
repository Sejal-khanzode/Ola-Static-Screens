export const saveToLocalStorage = (key: string, value: unknown) => {
  const encodedValue = JSON.stringify(value);
  localStorage.setItem(key, encodedValue);
};

export const getDataFromLocalStorage = (key: string): string | null => {
  const encodedValue = localStorage.getItem(key);

  if (encodedValue !== null) {
    return JSON.parse(encodedValue);
  } else {
    return null;
  }
};

export const removeDataFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
