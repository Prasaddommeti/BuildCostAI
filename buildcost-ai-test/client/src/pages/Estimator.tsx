import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Building2,
  MapPin,
  Ruler,
  Layers,
  Bed,
  Bath,
  Home,
  ShieldCheck,
  Zap,
  ArrowRight,
  Hammer,
  CheckCircle2
} from 'lucide-react';
import { Layout } from '../components/Layout';
import { AIThinkingModal } from '../components/AIThinkingModal';
import { estimateApi } from '../services/api';
import { EstimateInput } from '../types';

export const Estimator: React.FC = () => {
  const navigate = useNavigate();
  const [isThinking, setIsThinking] = useState(false);
  const [calculatedResult, setCalculatedResult] = useState<any>(null);

  const [formData, setFormData] = useState<EstimateInput>({
    projectName: 'Grand Residence Villa',
    buildingType: 'House',
    constructionType: 'Standard',
    location: { state: 'California', city: 'San Francisco' },
    area: 2400,
    floors: 2,
    bedrooms: 3,
    bathrooms: 3,
    kitchen: 1,
    balconies: 2,
    parking: 'Covered 2-Car',
    interiorFinish: 'Standard',
    roofType: 'RCC Slab',
    foundationType: 'Isolated Footing',
    steelGrade: 'Fe 550D',
    cementBrand: 'UltraTech / Holcim',
    brickType: 'AAC Blocks'
  });

  const buildingTypes = ['House', 'Villa', 'Apartment', 'Commercial', 'Hospital', 'School', 'Office'];
  const constructionTypes = ['Basic', 'Standard', 'Premium', 'Luxury'];
  const interiorFinishes = ['Basic', 'Standard', 'Premium', 'Luxury'];
  const steelGrades = ['Fe 500D', 'Fe 550D', 'TMT Fe 600'];
  const cementBrands = ['UltraTech / Holcim', 'Ambuja Cement', 'ACC Concrete', 'Lafarge'];
  const brickTypes = ['AAC Blocks', 'Red Clay Bricks', 'Fly Ash Bricks', 'Concrete Solid Blocks'];
  const foundationTypes = ['Isolated Footing', 'Raft Foundation', 'Pile Foundation', 'Combined Footing'];
  const roofTypes = ['RCC Slab', 'Structural Steel Truss', 'Pitched Clay Tile', 'Flat Waterproofed'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsThinking(true);
    try {
      const result = await estimateApi.create(formData);
      setCalculatedResult(result);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAIComplete = () => {
    setIsThinking(false);
    if (calculatedResult) {
      navigate('/results', { state: { estimate: calculatedResult } });
    }
  };

  return (
    <Layout title="AI Construction Cost Estimator" subtitle="Enter your architectural parameters to compute dynamic cost breakdowns">
      
      <AIThinkingModal isOpen={isThinking} onComplete={handleAIComplete} />

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* SECTION 1: PROJECT BASIC OVERVIEW */}
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">1. Core Project Specifications</h3>
              <p className="text-xs text-slate-500">Specify project name, building type, location and quality grade</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Project Name *
              </label>
              <input
                type="text"
                value={formData.projectName}
                onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500"
                placeholder="e.g. Skyline Duplex Villa"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Building Type *
              </label>
              <select
                value={formData.buildingType}
                onChange={(e) => setFormData({ ...formData, buildingType: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                {buildingTypes.map((t) => (
                  <option key={t} value={t} className="dark:bg-slate-900">{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Construction Quality *
              </label>
              <select
                value={formData.constructionType}
                onChange={(e) => setFormData({ ...formData, constructionType: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                {constructionTypes.map((c) => (
                  <option key={c} value={c} className="dark:bg-slate-900">{c} Grade</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                City Location *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.location.city}
                  onChange={(e) => setFormData({ ...formData, location: { ...formData.location, city: e.target.value } })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500"
                  placeholder="e.g. San Francisco"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                State / Region *
              </label>
              <input
                type="text"
                value={formData.location.state}
                onChange={(e) => setFormData({ ...formData, location: { ...formData.location, state: e.target.value } })}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500"
                placeholder="e.g. California"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Interior Finish Grade *
              </label>
              <select
                value={formData.interiorFinish}
                onChange={(e) => setFormData({ ...formData, interiorFinish: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                {interiorFinishes.map((f) => (
                  <option key={f} value={f} className="dark:bg-slate-900">{f} Interior</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 2: DIMENSIONS & ROOM LAYOUT */}
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">2. Dimensions & Room Allocations</h3>
              <p className="text-xs text-slate-500">Set total built-up square footage, floors, and room counts</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Built-Up Area (sq.ft) *
              </label>
              <input
                type="number"
                min={200}
                max={100000}
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-sm focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Number of Floors *
              </label>
              <input
                type="number"
                min={1}
                max={20}
                value={formData.floors}
                onChange={(e) => setFormData({ ...formData, floors: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-sm focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Bedrooms Count
              </label>
              <input
                type="number"
                min={0}
                max={15}
                value={formData.bedrooms}
                onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Bathrooms Count
              </label>
              <input
                type="number"
                min={0}
                max={15}
                value={formData.bathrooms}
                onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: CIVIL & STRUCTURAL MATERIALS */}
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500">
              <Hammer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">3. Civil Materials & Structural Components</h3>
              <p className="text-xs text-slate-500">Fine-tune reinforcement steel grade, cement brand, brick types and foundations</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Reinforcement Steel Grade
              </label>
              <select
                value={formData.steelGrade}
                onChange={(e) => setFormData({ ...formData, steelGrade: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                {steelGrades.map((s) => (
                  <option key={s} value={s} className="dark:bg-slate-900">{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Cement Brand Tier
              </label>
              <select
                value={formData.cementBrand}
                onChange={(e) => setFormData({ ...formData, cementBrand: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                {cementBrands.map((c) => (
                  <option key={c} value={c} className="dark:bg-slate-900">{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Masonry Brick Type
              </label>
              <select
                value={formData.brickType}
                onChange={(e) => setFormData({ ...formData, brickType: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                {brickTypes.map((b) => (
                  <option key={b} value={b} className="dark:bg-slate-900">{b}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Foundation Engineering Type
              </label>
              <select
                value={formData.foundationType}
                onChange={(e) => setFormData({ ...formData, foundationType: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                {foundationTypes.map((f) => (
                  <option key={f} value={f} className="dark:bg-slate-900">{f}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Roof & Slab System
              </label>
              <select
                value={formData.roofType}
                onChange={(e) => setFormData({ ...formData, roofType: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                {roofTypes.map((r) => (
                  <option key={r} value={r} className="dark:bg-slate-900">{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Parking Structure
              </label>
              <input
                type="text"
                value={formData.parking}
                onChange={(e) => setFormData({ ...formData, parking: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500"
                placeholder="e.g. Covered 2-Car"
              />
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-extrabold text-base shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-3"
          >
            <Sparkles className="w-5 h-5 text-emerald-300 animate-pulse" />
            <span>Calculate AI Estimate</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </form>
    </Layout>
  );
};
