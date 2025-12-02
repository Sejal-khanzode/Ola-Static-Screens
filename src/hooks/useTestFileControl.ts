import { useEffect, RefObject } from 'react';

// Call control function from browser dev tools
export const useTestFieldControl = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  testId?: string
) => {
  useEffect(() => {
    const el = ref.current;
    if (!el || !testId || typeof window === 'undefined') return;

    if (!window.F) window.F = {};

    const isInputOrSelect = (el: Element): el is HTMLInputElement | HTMLSelectElement =>
      el instanceof HTMLInputElement || el instanceof HTMLSelectElement;

    window.F[testId] = {
      focus: () => el.focus(),
      disable: () => {
        if (isInputOrSelect(el)) el.disabled = true;
      },
      setValue: (val: string) => {
        if (isInputOrSelect(el)) {
          el.value = val;
          el.dispatchEvent(new Event('input', { bubbles: true }));
        }
      },
      makeRequired: () => {
        if (isInputOrSelect(el)) el.required = true;
      },
      makeNotRequired: () => {
        if (isInputOrSelect(el)) el.required = false;
      },
    };

    return () => {
      if (window.F?.[testId]) {
        delete window.F[testId];
      }
    };
  }, [ref, testId]);
};
