import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Cpu, Layers, CheckCircle2, Calculator } from 'lucide-react';

interface AIThinkingModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

const steps = [
  'Parsing architectural parameters & building square footage...',
  'Analyzing regional labor indexes & steel / cement market rates...',
  'Computing RCC foundation & structural loading distribution...',
  'Synthesizing interior finishes & statutory 18% GST breakdown...',
  'Generating smart cost-optimization recommendations...'
];

export const AIThinkingModal: React.FC<AIThinkingModalProps> = ({ isOpen, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(onComplete, 800);
          return prev;
        }
      });
    }, 700);

    return () => clearInterval(interval);
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center relative overflow-hidden"
      >
        {/* Animated Background Aura */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-600/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-emerald-600/30 rounded-full blur-3xl animate-pulse" />

        {/* Pulsing AI Brain Icon */}
        <div className="relative z-10 my-4 flex justify-center">
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 via-blue-500 to-emerald-400 p-0.5 shadow-xl shadow-blue-500/30">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Cpu className="w-10 h-10 text-blue-400 animate-bounce" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
            </span>
          </div>
        </div>

        <h3 className="text-xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2">
          <span>AI Estimation Engine</span>
          <Sparkles className="w-5 h-5 text-emerald-400" />
        </h3>

        <p className="text-xs text-slate-400 mt-1">Analyzing over 4,500 construction pricing vectors</p>

        {/* Step Progress Checklist */}
        <div className="mt-8 space-y-3 text-left">
          {steps.map((step, idx) => {
            const isDone = idx < currentStep;
            const isCurrent = idx === currentStep;

            return (
              <div
                key={idx}
                className={`flex items-center gap-3 p-3 rounded-xl border text-xs font-semibold transition-all ${
                  isDone
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : isCurrent
                    ? 'bg-blue-500/10 border-blue-500/40 text-blue-300 shadow-md shadow-blue-500/10'
                    : 'bg-slate-800/40 border-slate-800 text-slate-500'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                ) : isCurrent ? (
                  <Calculator className="w-4 h-4 text-blue-400 animate-spin flex-shrink-0" />
                ) : (
                  <Layers className="w-4 h-4 text-slate-600 flex-shrink-0" />
                )}
                <span className="truncate">{step}</span>
              </div>
            );
          })}
        </div>

        {/* Bottom Loading Bar */}
        <div className="mt-6 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>
    </div>
  );
};
