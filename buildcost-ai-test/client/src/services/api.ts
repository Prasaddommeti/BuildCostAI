import axios from 'axios';
import { EstimateInput, EstimateResult, User, ReportItem } from '../types';

const API_BASE = '/api';

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for JWT auth header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('buildcost_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Local Fallback Estimator if offline or backend dev standalone
export function calculateLocalEstimate(input: EstimateInput): EstimateResult {
  const area = Number(input.area) || 1500;
  const floors = Number(input.floors) || 1;
  const buildingType = input.buildingType || 'House';
  const constructionType = input.constructionType || 'Standard';
  const interiorFinish = input.interiorFinish || 'Standard';

  let baseRate = 110;
  if (buildingType === 'Villa') baseRate = 160;
  if (buildingType === 'Apartment') baseRate = 135;
  if (buildingType === 'Commercial') baseRate = 180;
  if (buildingType === 'Hospital') baseRate = 220;

  let qualityMult = 1.0;
  if (constructionType === 'Basic') qualityMult = 0.85;
  if (constructionType === 'Premium') qualityMult = 1.35;
  if (constructionType === 'Luxury') qualityMult = 1.85;

  let interiorMult = 1.0;
  if (interiorFinish === 'Basic') interiorMult = 0.9;
  if (interiorFinish === 'Premium') interiorMult = 1.25;
  if (interiorFinish === 'Luxury') interiorMult = 1.6;

  const floorFactor = 1 + (floors - 1) * 0.12;
  const unitRate = Math.round(baseRate * qualityMult * interiorMult * floorFactor);
  const coreTotal = Math.round(area * unitRate);

  const steelCost = Math.round(coreTotal * 0.16);
  const cementCost = Math.round(coreTotal * 0.14);
  const sandCost = Math.round(coreTotal * 0.05);
  const aggregateCost = Math.round(coreTotal * 0.04);
  const brickCost = Math.round(coreTotal * 0.07);
  const foundationCost = Math.round(coreTotal * 0.09 * (1 + (floors > 2 ? 0.2 : 0)));
  const roofCost = Math.round(coreTotal * 0.08);

  const materialCost = steelCost + cementCost + sandCost + aggregateCost + brickCost + foundationCost + roofCost;
  const labourCost = Math.round(coreTotal * 0.23);
  const electricalCost = Math.round(coreTotal * 0.06);
  const plumbingCost = Math.round(coreTotal * 0.05 + (input.bathrooms || 2) * 1200);
  const paintingCost = Math.round(coreTotal * 0.04);
  const tilesCost = Math.round(coreTotal * 0.06);
  const woodCost = Math.round(coreTotal * 0.05);
  const interiorCost = Math.round(coreTotal * 0.08 * interiorMult);
  const miscellaneous = Math.round(coreTotal * 0.03);

  const subTotal = materialCost + labourCost + electricalCost + plumbingCost + paintingCost + tilesCost + woodCost + interiorCost + miscellaneous;
  const gstTax = Math.round(subTotal * 0.18);
  const totalCost = subTotal + gstTax;

  const costPerSqFt = Math.round(totalCost / area);
  const baseMonths = Math.max(4, Math.round(Math.sqrt(area) * 0.18 + floors * 1.5));
  const monthlyExpense = Math.round(totalCost / baseMonths);

  return {
    _id: 'est_' + Date.now(),
    userId: 'demo_user_101',
    projectName: input.projectName || 'My Construction Project',
    buildingType: input.buildingType,
    constructionType: input.constructionType,
    location: input.location,
    area,
    floors,
    bedrooms: input.bedrooms,
    bathrooms: input.bathrooms,
    kitchen: input.kitchen,
    balconies: input.balconies,
    parking: input.parking,
    interiorFinish: input.interiorFinish,
    roofType: input.roofType,
    foundationType: input.foundationType,
    steelGrade: input.steelGrade,
    cementBrand: input.cementBrand,
    brickType: input.brickType,
    totalCost,
    metrics: {
      costPerSqFt,
      monthlyExpense,
      completionTimeMonths: baseMonths
    },
    costBreakdown: {
      materialCost,
      labourCost,
      steelCost,
      cementCost,
      sandCost,
      aggregateCost,
      brickCost,
      roofCost,
      foundationCost,
      electricalCost,
      plumbingCost,
      paintingCost,
      tilesCost,
      woodCost,
      interiorCost,
      miscellaneous,
      gstTax
    },
    aiRecommendations: [
      {
        category: 'Material Optimization',
        title: 'Switch to AAC Blocks over Traditional Red Bricks',
        description: 'AAC blocks decrease dead load by 40%, reducing structural steel requirement and cutting brickwork labor cost by up to 15%.',
        potentialSavings: Math.round(brickCost * 0.22),
        impactLevel: 'High'
      },
      {
        category: 'Structural Efficiency',
        title: `Optimize Steel Grade with TMT ${input.steelGrade || 'Fe 550D'}`,
        description: 'High-ductility TMT bars provide 12% higher tensile strength compared to standard grades, reducing total tonnage needed for slabs.',
        potentialSavings: Math.round(steelCost * 0.08),
        impactLevel: 'Medium'
      },
      {
        category: 'Procurement Timing',
        title: `Bulk Cement Procurement from ${input.cementBrand || 'UltraTech'}`,
        description: 'Sourcing directly from regional factory distributors rather than retail suppliers saves middleman markups during foundation casting.',
        potentialSavings: Math.round(cementCost * 0.07),
        impactLevel: 'Medium'
      }
    ],
    createdAt: new Date().toISOString()
  };
}

// Auth API
export const authApi = {
  login: async (credentials: any) => {
    try {
      const res = await api.post('/auth/login', credentials);
      return res.data;
    } catch {
      // Mock Fallback
      return {
        token: 'mock_jwt_token_buildcost_2026',
        user: {
          id: 'demo_user_101',
          name: 'Alex Rivera',
          email: credentials.email || 'alex@buildcost.ai',
          phone: '+1 (555) 382-9102',
          role: 'General Contractor',
          subscription: 'Pro Builder',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
          currency: 'USD',
          unit: 'sq.ft'
        }
      };
    }
  },
  register: async (data: any) => {
    try {
      const res = await api.post('/auth/register', data);
      return res.data;
    } catch {
      return {
        token: 'mock_jwt_token_buildcost_2026',
        user: {
          id: 'user_' + Date.now(),
          name: data.name,
          email: data.email,
          phone: data.phone || '+1 (555) 382-9102',
          role: data.role || 'Individual Builder',
          subscription: 'Pro Builder',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
          currency: 'USD',
          unit: 'sq.ft'
        }
      };
    }
  },
  getProfile: async () => {
    try {
      const res = await api.get('/auth/profile');
      return res.data.user;
    } catch {
      return {
        id: 'demo_user_101',
        name: 'Alex Rivera',
        email: 'alex@buildcost.ai',
        phone: '+1 (555) 382-9102',
        role: 'General Contractor',
        subscription: 'Pro Builder',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
        currency: 'USD',
        unit: 'sq.ft'
      };
    }
  },
  updateProfile: async (data: any) => {
    try {
      const res = await api.put('/auth/profile', data);
      return res.data.user;
    } catch {
      return data;
    }
  }
};

// Estimate API
export const estimateApi = {
  create: async (input: EstimateInput): Promise<EstimateResult> => {
    try {
      const res = await api.post('/estimate', input);
      return res.data;
    } catch {
      return calculateLocalEstimate(input);
    }
  },
  getAll: async (): Promise<EstimateResult[]> => {
    try {
      const res = await api.get('/estimate');
      return res.data;
    } catch {
      // Mock Dataset
      return [
        calculateLocalEstimate({
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
        }),
        calculateLocalEstimate({
          projectName: 'Apex Commercial Tech Hub',
          buildingType: 'Commercial',
          constructionType: 'Premium',
          location: { state: 'Texas', city: 'Austin' },
          area: 5200,
          floors: 3,
          bedrooms: 0,
          bathrooms: 6,
          kitchen: 2,
          balconies: 4,
          parking: 'Underground Parking',
          interiorFinish: 'Premium',
          roofType: 'Structural Steel Roof',
          foundationType: 'Raft Foundation',
          steelGrade: 'Fe 550D',
          cementBrand: 'Ambuja / Holcim',
          brickType: 'Fly Ash Bricks'
        }),
        calculateLocalEstimate({
          projectName: 'Green Valley Duplex Villa',
          buildingType: 'Villa',
          constructionType: 'Standard',
          location: { state: 'Florida', city: 'Orlando' },
          area: 1800,
          floors: 2,
          bedrooms: 3,
          bathrooms: 3,
          kitchen: 1,
          balconies: 2,
          parking: 'Covered 1-Car',
          interiorFinish: 'Standard',
          roofType: 'RCC Slab',
          foundationType: 'Isolated Footing',
          steelGrade: 'Fe 500D',
          cementBrand: 'UltraTech',
          brickType: 'Red Bricks'
        })
      ];
    }
  },
  delete: async (id: string) => {
    try {
      await api.delete(`/estimate/${id}`);
    } catch {
      console.log('Deleted locally');
    }
  }
};
