import React, { useState } from 'react';
import { User, Mail, Phone, Briefcase, Award, Shield, Save } from 'lucide-react';
import { Layout } from '../components/Layout';
import { useAuth } from '../context/AuthContext';

export const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || 'Alex Rivera');
  const [phone, setPhone] = useState(user?.phone || '+1 (555) 382-9102');
  const [role, setRole] = useState(user?.role || 'General Contractor');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, phone, role });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <Layout title="User Profile" subtitle="Manage your account details and professional credentials">
      <div className="max-w-4xl space-y-8">
        
        {/* Profile Header Card */}
        <div className="glass-card rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center gap-6">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'}
            alt={user?.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500/30 shadow-xl"
          />
          <div className="text-center sm:text-left flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">{user?.name}</h2>
                <p className="text-xs text-slate-500 mt-0.5">{user?.email}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20 self-center sm:self-auto">
                <Award className="w-4 h-4" />
                <span>{user?.subscription || 'Pro Builder'}</span>
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-blue-500" /> {user?.role}</span>
              <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-emerald-500" /> {user?.phone || 'No phone set'}</span>
            </div>
          </div>
        </div>

        {/* Profile Edit Form */}
        <div className="glass-card rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-6">Personal & Organization Details</h3>

          {saved && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-semibold">
              Profile updated successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Email Address (Primary)
                </label>
                <input
                  type="email"
                  value={user?.email}
                  disabled
                  className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 text-sm cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Professional Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="Individual Builder" className="dark:bg-slate-900">Individual Builder</option>
                  <option value="Architect / Engineer" className="dark:bg-slate-900">Architect / Engineer</option>
                  <option value="General Contractor" className="dark:bg-slate-900">General Contractor</option>
                  <option value="Real Estate Developer" className="dark:bg-slate-900">Real Estate Developer</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>

      </div>
    </Layout>
  );
};
