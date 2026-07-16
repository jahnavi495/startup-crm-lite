import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

/**
 * DarkModeToggle Component
 * Renders an animated slider switch to toggle light/dark theme modes.
 * Uses useTheme context hooks.
 */
const DarkModeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="p-2 rounded-xl border border-slate-200/50 dark:border-slate-800/50 bg-white/60 dark:bg-slate-950/60 backdrop-blur-xs text-slate-500 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white shadow-xs transition-all duration-200 cursor-pointer shrink-0"
      role="switch"
      aria-checked={isDarkMode}
      aria-label="Toggle theme mode"
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDarkMode ? (
        <Sun size={17} className="transition-transform duration-250 hover:rotate-45" />
      ) : (
        <Moon size={17} className="transition-transform duration-250 hover:-rotate-12" />
      )}
    </button>
  );
};

export default DarkModeToggle;
