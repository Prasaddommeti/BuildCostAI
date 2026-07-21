import React from 'react';
import { Sun, Moon, Bell, Search, Globe, Ruler } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCurrency } from '../context/CurrencyContext';

interface AppHeaderProps {
  title: string;
  subtitle?: string;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ title, subtitle }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { currency, setCurrency, unit, setUnit } = useCurrency();

  return (
    <header className="h-20 px-8 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-30 transition-colors">
      
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
      </div>

      {/* Action Controls & Selectors */}
      <div className="flex items-center gap-4">
        
        {/* Currency Switcher */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold">
          <Globe className="w-3.5 h-3.5 text-blue-500" />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-transparent text-slate-800 dark:text-slate-200 font-bold focus:outline-none cursor-pointer"
          >
            <option value="USD" className="dark:bg-slate-900">USD ($)</option>
            <option value="INR" className="dark:bg-slate-900">INR (₹)</option>
            <option value="EUR" className="dark:bg-slate-900">EUR (€)</option>
            <option value="GBP" className="dark:bg-slate-900">GBP (£)</option>
            <option value="AED" className="dark:bg-slate-900">AED</option>
          </select>
        </div>

        {/* Unit Selector */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold">
          <Ruler className="w-3.5 h-3.5 text-emerald-500" />
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="bg-transparent text-slate-800 dark:text-slate-200 font-bold focus:outline-none cursor-pointer"
          >
            <option value="sq.ft" className="dark:bg-slate-900">sq.ft</option>
            <option value="sq.m" className="dark:bg-slate-900">sq.m</option>
          </select>
        </div>

        {/* Notifications */}
        <button
          className="relative p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full animate-ping" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Toggle Dark/Light Mode"
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
        </button>

      </div>
    </header>
  );
};
