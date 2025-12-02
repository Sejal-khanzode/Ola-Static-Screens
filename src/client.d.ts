export interface TestFieldControl {
    focus: () => void;
    disable: () => void;
    setValue: (val: string) => void;
    makeRequired: () => void;
    makeNotRequired: () => void;
  }

declare global {
  interface Window {
    enableAuthInOlaHealth: () => void;
    disableAuthInOlaHealth: () => void;
    setLoggingEnabled: (enabled: boolean) => void;
    F?: Record<string, TestFieldControl>;
  }
}

export {};
