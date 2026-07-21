import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Download,
  Share2,
  Printer,
  PlusCircle,
  Sparkles,
  CheckCircle2,
  Building2,
  TrendingDown,
  Clock,
  DollarSign,
  Layers,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';
import { Layout } from '../components/Layout';
import { EstimateResult } from '../types';
import { useCurrency } from '../context/CurrencyContext';
import { formatCurrency, formatArea } from '../utils/formatters';
import { generatePDFReport } from '../utils/pdfGenerator';
import { calculateLocalEstimate } from '../services/api';

export const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currency, unit } = useCurrency();
  const [copied, setCopied] = useState(false);

  // Fallback to sample estimate if opened directly
  const estimate: EstimateResult = location.state?.estimate || calculateLocalEstimate({
    projectName: 'Skyline Modern Residence',
    buildingType: 'House',
    constructionType: 'Luxury',
    location: { state: 'California', city: 'Los Angeles' },
    area: 2850,
    floors: 2,
    bedrooms: 4,
    bathrooms: 3,
    kitchen: 1,
    balconies: 2,
    parking: 'Covered 2-Car',
    interiorFinish: 'Luxury',
    roofType: 'RCC Slab',
    foundationType: 'Pile Foundation',
    steelGrade: 'Fe 550D',
    cementBrand: 'UltraTech / Holcim',
    brickType: 'AAC Blocks'
  });

  const pieData = [
    { name: 'Material Cost', value: estimate.costBreakdown.materialCost, color: '#2563eb' },
    { name: 'Workforce Labour', value: estimate.costBreakdown.labourCost, color: '#22c55e' },
    { name: 'Electrical & Automation', value: estimate.costBreakdown.electricalCost, color: '#a855f7' },
    { name: 'Plumbing & Fixtures', value: estimate.costBreakdown.plumbingCost, color: '#06b6d4' },
    { name: 'Interiors & Woodwork', value: estimate.costBreakdown.interiorCost + estimate.costBreakdown.woodCost, color: '#f59e0b' },
    { name: 'Statutory 18% GST', value: estimate.costBreakdown.gstTax, color: '#64748b' },
  ];

  const barData = [
    { category: 'Steel', cost: estimate.costBreakdown.steelCost },
    { category: 'Cement', cost: estimate.costBreakdown.cementCost },
    { category: 'Foundation', cost: estimate.costBreakdown.foundationCost },
    { category: 'Roofing', cost: estimate.costBreakdown.roofCost },
    { category: 'AAC Bricks', cost: estimate.costBreakdown.brickCost },
    { category: 'Finishing', cost: estimate.costBreakdown.paintingCost + estimate.costBreakdown.tilesCost },
  ];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Layout title="AI Estimate Results" subtitle={`Calculated report for ${estimate.projectName}`}>
      <div className="space-y-8 print:p-0">

        {/* TOP ACTION BAR */}
        <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Calculation Completed</span>
            </span>
            <span className="text-xs text-slate-500">Ref: #{estimate._id.slice(-6).toUpperCase()}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => generatePDFReport(estimate, currency, unit)}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={handleShare}
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold text-xs border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold text-xs border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>

            <button
              onClick={() => navigate('/estimator')}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>New Estimate</span>
            </button>
          </div>
        </div>

        {/* HERO ESTIMATE METRICS BANNER */}
        <div className="glass-card rounded-3xl p-8 border-2 border-blue-500/30 shadow-2xl relative overflow-hidden bg-gradient-to-br from-blue-900/10 via-slate-900/5 to-emerald-900/10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
            
            <div className="md:col-span-2">
              <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">Total Estimated Construction Cost</span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
                {formatCurrency(estimate.totalCost, currency)}
              </h2>
              <p className="text-xs text-slate-500 mt-2">
                Includes all raw civil materials, labor, sub-contractors, and 18% GST tax.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500">Unit Cost Rate</span>
              <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">
                {formatCurrency(estimate.metrics.costPerSqFt, currency)} / {unit}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">Based on {formatArea(estimate.area, unit)}</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500">Timeline & Monthly Expense</span>
              <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                {estimate.metrics.completionTimeMonths} Months
              </p>
              <p className="text-[11px] text-slate-400 mt-1">~{formatCurrency(estimate.metrics.monthlyExpense, currency)} / month</p>
            </div>

          </div>
        </div>

        {/* VISUAL CHARTS BREAKDOWN */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Pie Chart Distribution */}
          <div className="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Cost Share Allocation</h3>
            <p className="text-xs text-slate-500 mb-6">Percentage breakdown of primary budget channels</p>
            
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={95}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#fff' }}
                    formatter={(val: any) => [formatCurrency(Number(val), currency), '']}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart Component Costs */}
          <div className="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Key Material Expenditure</h3>
            <p className="text-xs text-slate-500 mb-6">Cost distribution across critical structural elements</p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <XAxis dataKey="category" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#fff' }}
                    formatter={(val: any) => [formatCurrency(Number(val), currency), 'Cost']}
                  />
                  <Bar dataKey="cost" fill="#2563eb" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* ITEMIZED COST BREAKDOWN CARDS */}
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Detailed Line-Item Breakdown</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500">Reinforcement Steel ({estimate.steelGrade})</span>
              <p className="text-lg font-bold text-slate-900 dark:text-white mt-1">{formatCurrency(estimate.costBreakdown.steelCost, currency)}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500">Cement & Concrete ({estimate.cementBrand})</span>
              <p className="text-lg font-bold text-slate-900 dark:text-white mt-1">{formatCurrency(estimate.costBreakdown.cementCost, currency)}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500">Workforce Labour Charges</span>
              <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-1">{formatCurrency(estimate.costBreakdown.labourCost, currency)}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500">Foundation ({estimate.foundationType})</span>
              <p className="text-lg font-bold text-slate-900 dark:text-white mt-1">{formatCurrency(estimate.costBreakdown.foundationCost, currency)}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500">Roof Slab ({estimate.roofType})</span>
              <p className="text-lg font-bold text-slate-900 dark:text-white mt-1">{formatCurrency(estimate.costBreakdown.roofCost, currency)}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500">Masonry ({estimate.brickType})</span>
              <p className="text-lg font-bold text-slate-900 dark:text-white mt-1">{formatCurrency(estimate.costBreakdown.brickCost, currency)}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500">Electrical & Automation</span>
              <p className="text-lg font-bold text-slate-900 dark:text-white mt-1">{formatCurrency(estimate.costBreakdown.electricalCost, currency)}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500">Statutory 18% GST Tax</span>
              <p className="text-lg font-bold text-purple-600 dark:text-purple-400 mt-1">{formatCurrency(estimate.costBreakdown.gstTax, currency)}</p>
            </div>

          </div>
        </div>

        {/* AI COST OPTIMIZATION RECOMMENDATIONS */}
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">AI Smart Cost Optimization Recommendations</h3>
              <p className="text-xs text-slate-500">Intelligent suggestions to trim budget without sacrificing structural integrity</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {estimate.aiRecommendations.map((rec, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">{rec.category}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    Est. Savings: ~{formatCurrency(rec.potentialSavings, currency)}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mt-2">{rec.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">{rec.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Layout>
  );
};
