import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileSpreadsheet,
  Search,
  Filter,
  Download,
  Trash2,
  Eye,
  Plus,
  FileText
} from 'lucide-react';
import { Layout } from '../components/Layout';
import { reportApi, estimateApi } from '../services/api';
import { useCurrency } from '../context/CurrencyContext';
import { formatCurrency, formatDate } from '../utils/formatters';
import { generatePDFReport } from '../utils/pdfGenerator';
import { EstimateResult } from '../types';

export const Reports: React.FC = () => {
  const [estimates, setEstimates] = useState<EstimateResult[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
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
    if (confirm('Delete this report entry?')) {
      await estimateApi.delete(id);
      setEstimates(prev => prev.filter(e => e._id !== id));
    }
  };

  const filteredEstimates = estimates.filter(e => {
    const matchesSearch = e.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          e.buildingType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || e.buildingType === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <Layout title="Saved Construction Reports" subtitle="Export executive summaries, procurement lists and PDF estimates">
      <div className="space-y-8">
        
        {/* TOP FILTER & SEARCH BAR */}
        <div className="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              placeholder="Search by project name or type..."
            />
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Filter className="w-4 h-4" />
              <span>Building Type:</span>
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="All" className="dark:bg-slate-900">All Categories</option>
              <option value="House" className="dark:bg-slate-900">House</option>
              <option value="Villa" className="dark:bg-slate-900">Villa</option>
              <option value="Commercial" className="dark:bg-slate-900">Commercial</option>
            </select>

            <button
              onClick={() => navigate('/estimator')}
              className="ml-auto px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create Report</span>
            </button>
          </div>

        </div>

        {/* REPORTS GRID LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEstimates.map((est) => (
            <div
              key={est._id}
              className="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20">
                    {est.buildingType} • {est.constructionType}
                  </span>
                  <span className="text-xs text-slate-400">{formatDate(est.createdAt)}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-4">{est.projectName}</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Location: {est.location?.city}, {est.location?.state} ({est.area?.toLocaleString()} {unit})
                </p>

                <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-xs font-semibold text-slate-400">Total Calculated Cost</span>
                  <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {formatCurrency(est.totalCost, currency)}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => generatePDFReport(est, currency, unit)}
                  className="px-3.5 py-2 rounded-xl bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 text-blue-600 dark:text-blue-400 font-bold text-xs transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF Export</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate('/results', { state: { estimate: est } })}
                    className="p-2 rounded-lg text-slate-500 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(est._id)}
                    className="p-2 rounded-lg text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                    title="Delete Report"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </Layout>
  );
};
