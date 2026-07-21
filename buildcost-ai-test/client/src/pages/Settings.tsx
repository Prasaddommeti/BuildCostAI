import React from 'react';
import { Sun, Moon, Globe, Ruler, Bell, Shield, Key } from 'lucide-react';
import { Layout } from '../components/Layout';
import { useTheme } from '../context/ThemeContext';
import { useCurrency } from '../context/CurrencyContext';

export const Settings: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { currency, setCurrency, unit, setUnit } = useCurrency();

  return (
    <Layout title="Application Settings" subtitle="Configure system display preferences, currencies, and notifications">
      <div className="max-w-4xl space-y-8">
        
        {/* APPEARANCE & DISPLAY SETTINGS */}
        <div className="glass-card rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-6">Interface & Preferences</h3>

          <div className="space-y-6">
            
            {/* Dark Mode */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Dark Theme Mode</p>
                  <p className="text-xs text-slate-500">Toggle dark glassmorphic SaaS interface theme</p>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className="w-14 h-8 rounded-full bg-blue-600 p-1 transition-colors relative"
              >
                <div className={`w-6 h-6 rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Currency Selector */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Global Currency Symbol</p>
                  <p className="text-xs text-slate-500">All cost outputs & PDFs will convert automatically</p>
                </div>
              </div>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:outline-none cursor-pointer"
              >
                <option value="USD" className="dark:bg-slate-900">USD ($)</option>
                <option value="INR" className="dark:bg-slate-900">INR (₹)</option>
                <option value="EUR" className="dark:bg-slate-900">EUR (€)</option>
                <option value="GBP" className="dark:bg-slate-900">GBP (£)</option>
                <option value="AED" className="dark:bg-slate-900">AED</option>
              </select>
            </div>

            {/* Measurement Unit */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
                  <Ruler className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Measurement Standard Unit</p>
                  <p className="text-xs text-slate-500">Choose between imperial sq.ft and metric sq.meters</p>
                </div>
              </div>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:outline-none cursor-pointer"
              >
                <option value="sq.ft" className="dark:bg-slate-900">Square Feet (sq.ft)</option>
                <option value="sq.m" className="dark:bg-slate-900">Square Meters (sq.m)</option>
              </select>
            </div>

          </div>
        </div>

        {/* NOTIFICATIONS & SECURITY */}
        <div className="glass-card rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-6">Security & AI Engine Credentials</h3>

          <div className="space-y-4 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">JWT Encryption Security</p>
                  <p className="text-slate-500">Active 256-bit token authentication</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                Protected
              </span>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <Key className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">BuildCostAI v2.4 Neural Model API</p>
                  <p className="text-slate-500">Connected to express prediction microservice</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20">
                Live Status: OK
              </span>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
};
