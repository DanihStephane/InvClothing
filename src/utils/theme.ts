export type Theme = 'light' | 'dark' | 'system';

export const getSystemTheme = (): 'light' | 'dark' => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const setTheme = (theme: Theme): void => {
  const root = window.document.documentElement;
  
  // Remove the previous theme class
  root.classList.remove('light', 'dark');

  // Set the attribute for current theme
  localStorage.setItem('theme', theme);
  
  // Apply the theme
  if (theme === 'system') {
    const systemTheme = getSystemTheme();
    root.classList.add(systemTheme);
  } else {
    root.classList.add(theme);
  }
};

export const getTheme = (): Theme => {
  if (typeof window === 'undefined') return 'system';
  
  const savedTheme = localStorage.getItem('theme') as Theme;
  return savedTheme || 'system';
};

export const initTheme = (): void => {
  const theme = getTheme();
  setTheme(theme);
};