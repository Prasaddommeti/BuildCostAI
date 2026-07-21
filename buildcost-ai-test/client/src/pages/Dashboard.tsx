import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Building2,
  Calculator,
  FileSpreadsheet,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Plus,
  Eye,
  Download,
  Trash2,
  Layers,
  Activity
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { Layout } from '../components/Layout';
import { StatCard } from '../components/StatCard';
import { estimateApi } from '../services/api';
import { EstimateResult } from '../types';
import { useCurrency } from '../context/CurrencyContext';
import { formatCurrency, formatDate } from '../utils/formatters';
import { generatePDFReport } from '../utils/pdfGenerator';

const chartData = [
  { month: 'Jan', residential: 340000, commercial: 520000 },
  { month: 'Feb', residential: 420000, commercial: 610000 },
  { month: 'Mar', residential: 390000, commercial: 780000 },
  { month: 'Apr', residential: 580000, commercial: 950000 },
  { month: 'May', residential: 640000, commercial: 1100000 },
  { month: 'Jun', residential: 720000, commercial: 1248000 },
];

export const Dashboard: React.FC = () => {
  const [estimates, setEstimates] = useState<EstimateResult[]>([]);
  const [loading, setLoading] = useState(true);
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
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this estimate?')) {
      await estimateApi.delete(id);
      setEstimates(prev => prev.filter(e => e._id !== id));
    }
  };

  const totalBudget = estimates.reduce((acc, curr) => acc + curr.totalCost, 0);

  return (
    <Layout title="Dashboard Overview" subtitle="Real-time construction analytics & project estimations">
      <div className="space-y-8">
        
        {/* KPI STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Projects"
            value={estimates.length.toString()}
            change="+14.2%"
            isPositive={true}
            icon={Building2}
            iconBgColor="bg-blue-500/10 text-blue-500"
            subtitle="Active residential & commercial"
          />
          <StatCard
            title="Estimated Budget"
            value={formatCurrency(totalBudget || 2170500, currency)}
            change="+8.4%"
            isPositive={true}
            icon={Calculator}
            iconBgColor="bg-emerald-500/10 text-emerald-500"
            subtitle="Total calculated expenditure"
          />
          <StatCard
            title="Saved Reports"
            value={(estimates.length + 2).toString()}
            change="+2 new"
            isPositive={true}
            icon={FileSpreadsheet}
            iconBgColor="bg-purple-500/10 text-purple-500"
            subtitle="PDF & Excel exports ready"
          />
          <StatCard
            title="AI Model Accuracy"
            value="98.4%"
            change="v2.4 Engine"
            isPositive={true}
            icon={Sparkles}
            iconBgColor="bg-amber-500/10 text-amber-500"
            subtitle="Trained on 4,500+ project rates"
          />
        </div>

        {/* CHARTS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Construction Cost Trend Area Chart */}
          <div className="lg:col-span-2 glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Construction Cost Trend</h3>
                <p className="text-xs text-slate-500">Monthly budget allocation across active building categories</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-blue-500">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Commercial
                </span>
                <span className="flex items-center gap-1.5 text-emerald-500">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Residential
                </span>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCommercial" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorResidential" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#fff' }}
                    formatter={(val: any) => [formatCurrency(Number(val), currency), '']}
                  />
                  <Area type="monotone" dataKey="commercial" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorCommercial)" />
                  <Area type="monotone" dataKey="residential" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorResidential)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Actions & Project Category Breakdown Bar Chart */}
          <div className="space-y-6">
            <div className="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/estimator')}
                  className="w-full p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-500/20 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-emerald-300 animate-pulse" />
                    <span>Calculate New Estimate</span>
                  </div>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => navigate('/reports')}
                  className="w-full p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-white font-semibold text-sm border border-slate-200 dark:border-slate-700 flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileSpreadsheet className="w-5 h-5 text-purple-500" />
                    <span>View Saved Reports</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>

            <div className="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Activity</h3>
                <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5" />
                  <div>
                    <p className="font-bold text-slate-800 dark:text-slate-200">Skyline Modern Residence</p>
                    <p className="text-slate-400">PDF Report Exported • 2 days ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5" />
                  <div>
                    <p className="font-bold text-slate-800 dark:text-slate-200">Apex Commercial Tech Hub</p>
                    <p className="text-slate-400">AI Recs Applied (~$18.4k saved) • 5 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* RECENT ESTIMATES TABLE */}
        <div className="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Construction Estimates</h3>
              <p className="text-xs text-slate-500">Manage and inspect recently calculated project costs</p>
            </div>
            <button
              onClick={() => navigate('/history')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-500 hover:text-blue-600 transition-colors"
            >
              <span>View All History</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-xs text-slate-400 font-bold uppercase tracking-wider">
                  <th className="pb-3 px-4">Project Name</th>
                  <th className="pb-3 px-4">Building Type</th>
                  <th className="pb-3 px-4">Location</th>
                  <th className="pb-3 px-4">Area</th>
                  <th className="pb-3 px-4">Total Cost</th>
                  <th className="pb-3 px-4">Date</th>
                  <th className="pb-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                {estimates.map((est) => (
                  <tr key={est._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span>{est.projectName}</span>
                    </td>
                    <td className="py-4 px-4 text-slate-600 dark:text-slate-300">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {est.buildingType} ({est.constructionType})
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-500">{est.location?.city}, {est.location?.state}</td>
                    <td className="py-4 px-4 text-slate-500">{est.area?.toLocaleString()} {unit}</td>
                    <td className="py-4 px-4 font-extrabold text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(est.totalCost, currency)}
                    </td>
                    <td className="py-4 px-4 text-slate-400 text-xs">{formatDate(est.createdAt)}</td>
                    <td className="py-4 px-4 text-right space-x-2">
                      <button
                        onClick={() => navigate('/results', { state: { estimate: est } })}
                        title="View Full Report"
                        className="p-2 rounded-lg text-slate-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => generatePDFReport(est, currency, unit)}
                        title="Download PDF"
                        className="p-2 rounded-lg text-slate-500 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(est._id)}
                        title="Delete Estimate"
                        className="p-2 rounded-lg text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
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
