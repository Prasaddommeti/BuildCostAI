import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Sparkles, ArrowRight } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden text-white">
      {/* Dynamic Background Glow Filters */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] animate-pulse" />

      {/* Main Animated Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col items-center text-center z-10 p-8"
      >
        {/* Animated Brand Logo Icon */}
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-blue-600 via-blue-500 to-emerald-400 p-1 shadow-2xl shadow-blue-500/40 mb-6"
        >
          <div className="w-full h-full bg-slate-900 rounded-[22px] flex items-center justify-center">
            <Building2 className="w-12 h-12 text-blue-400" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-blue-200 to-emerald-400 bg-clip-text text-transparent"
        >
          BuildCostAI
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-3 text-lg font-medium text-slate-300 flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <span>AI Powered Construction Cost Estimator</span>
        </motion.p>

        {/* Animated Loading Bar */}
        <div className="mt-8 w-64 bg-slate-800/80 rounded-full h-1.5 overflow-hidden border border-slate-700/50">
          <motion.div
            className="bg-gradient-to-r from-blue-500 via-blue-400 to-emerald-400 h-full rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.8, ease: 'easeInOut' }}
          />
        </div>

        {/* Skip Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={() => navigate('/home')}
          className="mt-8 text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900/60 border border-slate-800 hover:bg-slate-800 transition-all group"
        >
          <span>Skip to Platform</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </motion.button>
      </motion.div>
    </div>
  );
};
