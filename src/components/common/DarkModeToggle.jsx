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
      className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-150/80 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white transition-colors duration-150 focus:outline-hidden cursor-pointer shrink-0"
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
