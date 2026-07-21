import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { History as HistoryIcon, Search, Eye, Download, Trash2, Calendar, Building2 } from 'lucide-react';
import { Layout } from '../components/Layout';
import { estimateApi } from '../services/api';
import { EstimateResult } from '../types';
import { useCurrency } from '../context/CurrencyContext';
import { formatCurrency, formatDate } from '../utils/formatters';
import { generatePDFReport } from '../utils/pdfGenerator';

export const History: React.FC = () => {
  const [estimates, setEstimates] = useState<EstimateResult[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { currency, unit } = useCurrency();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await estimateApi.getAll();
      setEstimates(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this calculation log?')) {
      await estimateApi.delete(id);
      setEstimates(prev => prev.filter(e => e._id !== id));
    }
  };

  const filtered = estimates.filter(e =>
    e.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.buildingType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout title="Project History & Audit Log" subtitle="Complete record of all past AI estimation calculations">
      <div className="space-y-6">
        
        {/* Search */}
        <div className="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              placeholder="Search history by project name..."
            />
          </div>
          <span className="text-xs font-semibold text-slate-500">{filtered.length} Saved Records</span>
        </div>

        {/* History Table */}
        <div className="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-xs text-slate-400 font-bold uppercase tracking-wider">
                  <th className="pb-3 px-4">Date</th>
                  <th className="pb-3 px-4">Project Name</th>
                  <th className="pb-3 px-4">Building Type</th>
                  <th className="pb-3 px-4">Area ({unit})</th>
                  <th className="pb-3 px-4">Floors</th>
                  <th className="pb-3 px-4">Total Cost</th>
                  <th className="pb-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                {filtered.map((est) => (
                  <tr key={est._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-4 text-slate-400 text-xs flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(est.createdAt)}</span>
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-900 dark:text-white">{est.projectName}</td>
                    <td className="py-4 px-4 text-slate-600 dark:text-slate-300">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800">
                        {est.buildingType} ({est.constructionType})
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-500">{est.area?.toLocaleString()}</td>
                    <td className="py-4 px-4 text-slate-500">{est.floors} Level(s)</td>
                    <td className="py-4 px-4 font-extrabold text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(est.totalCost, currency)}
                    </td>
                    <td className="py-4 px-4 text-right space-x-2">
                      <button
                        onClick={() => navigate('/results', { state: { estimate: est } })}
                        className="p-2 rounded-lg text-slate-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors"
                        title="View Estimate"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => generatePDFReport(est, currency, unit)}
                        className="p-2 rounded-lg text-slate-500 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors"
                        title="PDF Export"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(est._id)}
                        className="p-2 rounded-lg text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </Layout>
  );
};
