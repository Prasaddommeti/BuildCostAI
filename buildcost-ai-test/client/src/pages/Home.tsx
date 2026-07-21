import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Building2,
  ArrowRight,
  Zap,
  TrendingDown,
  FileCheck,
  ShieldCheck,
  CheckCircle2,
  Users,
  BrainCircuit,
  Calculator,
  ChevronRight
} from 'lucide-react';
import { Navbar } from '../components/Navbar';

export const Home: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blue-500/15 dark:bg-blue-600/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            
            {/* Top Pill Tag */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold mb-6"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Next-Gen Construction Cost Estimation AI</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1]"
            >
              AI Powered Construction <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-500 dark:from-blue-400 dark:via-blue-300 dark:to-emerald-400 bg-clip-text text-transparent">
                Cost Estimator
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed"
            >
              Estimate the total construction cost of your residential or commercial building within seconds using Artificial Intelligence.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                onClick={() => navigate('/estimator')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-extrabold text-base shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 group"
              >
                <Sparkles className="w-5 h-5 text-emerald-300 animate-pulse" />
                <span>Calculate AI Estimate</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigate('/login')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-white font-extrabold text-base shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Sign In to Platform</span>
              </button>
            </motion.div>

            {/* Floating Live AI Preview Card Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-16 relative mx-auto max-w-5xl"
            >
              <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800/80 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-xs font-mono text-slate-400 ml-2">BuildCostAI Engine • Live Model Output</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-500 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    98.4% Accuracy Rating
                  </span>
                </div>

                {/* Card Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  
                  <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Target Structure</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white mt-1">2,850 sq.ft Luxury Villa</p>
                    <div className="mt-3 text-xs text-slate-500 dark:text-slate-400 space-y-1">
                      <p>• Location: Los Angeles, CA</p>
                      <p>• Floors: 2 Levels (G+1)</p>
                      <p>• Grade: Fe 550D Steel / UltraTech</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Estimated Budget</p>
                    <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">$598,500</p>
                    <div className="mt-3 text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <TrendingDown className="w-4 h-4" />
                      <span>$210 / sq.ft • 10-Month Timeline</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">AI Cost Optimization</p>
                    <p className="text-sm font-bold text-emerald-500 mt-1">~$16,800 Potential Savings</p>
                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                      AAC Block substitution reduces structural load & cuts steel requirement by 8%.
                    </p>
                  </div>

                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* WHY BUILDCOSTAI SECTION */}
      <section id="why-us" className="py-20 bg-slate-100/50 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Why Top Builders Choose BuildCostAI
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Eliminate budget overruns and inaccurate manual estimates with neural network construction analytics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Sub-Second Estimates</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Generate exhaustive line-item cost estimates for steel, cement, labor, roofing, and electrical in under 3 seconds.
              </p>
            </div>

            <div className="glass-card p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Smart Material Optimization</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                AI algorithms suggest alternative material grades and factory-direct procurement options to trim up to 15% off total cost.
              </p>
            </div>

            <div className="glass-card p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Executive PDF Reports</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Export branded, presentation-ready PDF reports formatted for clients, banks, contractors, and municipal approvals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Platform Capabilities</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2">
                Built for Residential, Commercial & Industrial Projects
              </h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                Whether you're an individual building your dream home, an architect presenting to clients, or a general contractor bidding on commercial hubs, BuildCostAI adapts to your project scope.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  'Residential Houses, Villas, Duplexes & Apartment Complexes',
                  'Commercial Offices, Retail Malls, Schools & Medical Facilities',
                  'Granular Steel TMT Grade (Fe 500D / 550D) & Cement Brand Selection',
                  'Localized Tax (GST 18%) & Statutory Fee Breakdown',
                  'Interactive Recharts Cost Visualization & Timeline Burn Rate'
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{feat}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate('/estimator')}
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-lg shadow-blue-500/25"
              >
                <span>Try Calculator Now</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="glass-card rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-2xl">
              <div className="space-y-6">
                <div className="flex justify-between items-center p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60">
                  <div>
                    <p className="text-xs font-semibold text-slate-500">Foundation & Structural Earthwork</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">$53,865</p>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/10 text-blue-500">9% Share</span>
                </div>

                <div className="flex justify-between items-center p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60">
                  <div>
                    <p className="text-xs font-semibold text-slate-500">Reinforcement Steel & Concrete</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">$179,550</p>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/10 text-blue-500">30% Share</span>
                </div>

                <div className="flex justify-between items-center p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60">
                  <div>
                    <p className="text-xs font-semibold text-slate-500">Labor & On-Site Workforce</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">$137,655</p>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500">23% Share</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-20 bg-slate-100/50 dark:bg-slate-900/40 border-t border-slate-200/60 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Flexible Plans for Every Builder
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Select the ideal tier for individual projects or multi-site commercial enterprises.
            </p>

            {/* Monthly / Annual Switcher */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <span className={`text-sm font-semibold ${!isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>Monthly</span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="w-14 h-8 rounded-full bg-blue-600 p-1 transition-colors relative"
              >
                <div className={`w-6 h-6 rounded-full bg-white transition-transform ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
              <span className={`text-sm font-semibold flex items-center gap-1.5 ${isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
                Annual <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-500 font-bold border border-emerald-500/20">Save 20%</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Free Starter Plan */}
            <div className="glass-card p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Starter Builder</h3>
              <p className="text-xs text-slate-500 mt-1">For homeowners and individual estimators</p>
              <div className="mt-6 flex items-baseline">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">$0</span>
                <span className="text-xs text-slate-500 ml-1">/ forever</span>
              </div>
              <ul className="mt-6 space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Up to 3 AI Cost Calculations / mo</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Basic Cost Breakdown</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Standard Web View</li>
              </ul>
              <button onClick={() => navigate('/register')} className="mt-8 w-full py-3 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-sm transition-colors">
                Get Started Free
              </button>
            </div>

            {/* Pro Builder Plan (Featured) */}
            <div className="glass-card p-8 rounded-3xl border-2 border-blue-500 shadow-2xl relative">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-blue-600 text-white text-[11px] font-extrabold uppercase tracking-wide">
                Most Popular
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Pro Builder</h3>
              <p className="text-xs text-slate-500 mt-1">For contractors, architects & developers</p>
              <div className="mt-6 flex items-baseline">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{isAnnual ? '$39' : '$49'}</span>
                <span className="text-xs text-slate-500 ml-1">/ month</span>
              </div>
              <ul className="mt-6 space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Unlimited AI Cost Estimates</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Executive PDF & Excel Exports</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> AI Material Optimization Engine</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Custom Steel Grade & Cement Selection</li>
              </ul>
              <button onClick={() => navigate('/register')} className="mt-8 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors shadow-lg shadow-blue-500/25">
                Start 14-Day Free Trial
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="glass-card p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Enterprise Firm</h3>
              <p className="text-xs text-slate-500 mt-1">For commercial developers & construction firms</p>
              <div className="mt-6 flex items-baseline">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{isAnnual ? '$119' : '$149'}</span>
                <span className="text-xs text-slate-500 ml-1">/ month</span>
              </div>
              <ul className="mt-6 space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Multi-user Team Collaboration</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Custom Material Price API Feeds</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Dedicated Account Manager</li>
              </ul>
              <button onClick={() => navigate('/register')} className="mt-8 w-full py-3 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-sm transition-colors">
                Contact Enterprise
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Building2 className="w-6 h-6 text-blue-500" />
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                BuildCost<span className="text-blue-500">AI</span>
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              © {new Date().getFullYear()} BuildCostAI SaaS Platform. All rights reserved. Powered by Artificial Intelligence.
            </p>

            <div className="flex gap-6 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <a href="#" className="hover:text-blue-500">Privacy Policy</a>
              <a href="#" className="hover:text-blue-500">Terms of Service</a>
              <a href="#" className="hover:text-blue-500">API Documentation</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};
