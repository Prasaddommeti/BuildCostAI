const Estimate = require('../models/Estimate');
const { calculateCost } = require('../services/aiEstimationEngine');
const { getIsConnected } = require('../config/db');

// In-Memory Estimates Store with initial mock datasets
const memoryEstimates = [
  {
    _id: 'est_2026_01',
    userId: 'demo_user_101',
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
    brickType: 'AAC Blocks',
    expectedTimelineMonths: 10,
    totalCost: 598500,
    metrics: { costPerSqFt: 210, monthlyExpense: 59850, completionTimeMonths: 10 },
    costBreakdown: {
      materialCost: 263340, labourCost: 137655, steelCost: 95760, cementCost: 83790,
      sandCost: 29925, aggregateCost: 23940, brickCost: 41895, roofCost: 47880,
      foundationCost: 53865, electricalCost: 35910, plumbingCost: 33525, paintingCost: 23940,
      tilesCost: 35910, woodCost: 29925, interiorCost: 47880, miscellaneous: 17955, gstTax: 91305
    },
    aiRecommendations: [
      { category: 'Material Optimization', title: 'AAC Blocks Replacement', description: 'Cuts wall weight by 40%', potentialSavings: 9200, impactLevel: 'High' },
      { category: 'Steel Efficiency', title: 'Fe 550D High Tensile', description: 'Reduces steel weight by 10%', potentialSavings: 7600, impactLevel: 'Medium' }
    ],
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    _id: 'est_2026_02',
    userId: 'demo_user_101',
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
    brickType: 'Fly Ash Bricks',
    expectedTimelineMonths: 14,
    totalCost: 1248000,
    metrics: { costPerSqFt: 240, monthlyExpense: 89142, completionTimeMonths: 14 },
    costBreakdown: {
      materialCost: 549120, labourCost: 287040, steelCost: 199680, cementCost: 174720,
      sandCost: 62400, aggregateCost: 49920, brickCost: 87360, roofCost: 99840,
      foundationCost: 112320, electricalCost: 74880, plumbingCost: 69600, paintingCost: 49920,
      tilesCost: 74880, woodCost: 62400, interiorCost: 99840, miscellaneous: 37440, gstTax: 190368
    },
    aiRecommendations: [
      { category: 'Facade Optimization', title: 'Double Glazed Low-E Glass', description: 'Reduces HVAC cooling load by 22%', potentialSavings: 18400, impactLevel: 'High' }
    ],
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    _id: 'est_2026_03',
    userId: 'demo_user_101',
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
    brickType: 'Red Bricks',
    expectedTimelineMonths: 7,
    totalCost: 324000,
    metrics: { costPerSqFt: 180, monthlyExpense: 46285, completionTimeMonths: 7 },
    costBreakdown: {
      materialCost: 142560, labourCost: 74520, steelCost: 51840, cementCost: 45360,
      sandCost: 16200, aggregateCost: 12960, brickCost: 22680, roofCost: 25920,
      foundationCost: 29160, electricalCost: 19440, plumbingCost: 18000, paintingCost: 12960,
      tilesCost: 19440, woodCost: 16200, interiorCost: 25920, miscellaneous: 9720, gstTax: 49410
    },
    aiRecommendations: [
      { category: 'Plumbing', title: 'PEX Pipe installation', description: 'Speeds up plumbing labor', potentialSavings: 4500, impactLevel: 'Medium' }
    ],
    createdAt: new Date(Date.now() - 86400000 * 8).toISOString()
  }
];

const createEstimate = async (req, res) => {
  try {
    const inputData = req.body;
    if (!inputData.projectName || !inputData.area) {
      return res.status(400).json({ message: 'Project Name and Building Area are required' });
    }

    const calculated = calculateCost(inputData);

    const estimateObject = {
      userId: req.user.id || 'demo_user_101',
      projectName: inputData.projectName,
      buildingType: inputData.buildingType || 'House',
      constructionType: inputData.constructionType || 'Standard',
      location: inputData.location || { state: 'California', city: 'San Francisco' },
      area: Number(inputData.area),
      floors: Number(inputData.floors || 1),
      bedrooms: Number(inputData.bedrooms || 2),
      bathrooms: Number(inputData.bathrooms || 2),
      kitchen: Number(inputData.kitchen || 1),
      balconies: Number(inputData.balconies || 1),
      parking: inputData.parking || 'Covered 1-Car',
      interiorFinish: inputData.interiorFinish || 'Standard',
      roofType: inputData.roofType || 'RCC Slab',
      foundationType: inputData.foundationType || 'Isolated Footing',
      steelGrade: inputData.steelGrade || 'Fe 550D',
      cementBrand: inputData.cementBrand || 'UltraTech / Holcim',
      brickType: inputData.brickType || 'AAC Blocks',
      expectedTimelineMonths: calculated.metrics.completionTimeMonths,
      totalCost: calculated.totalCost,
      metrics: calculated.metrics,
      costBreakdown: calculated.costBreakdown,
      aiRecommendations: calculated.aiRecommendations,
      status: 'Completed'
    };

    if (getIsConnected()) {
      const saved = await Estimate.create(estimateObject);
      return res.status(201).json(saved);
    } else {
      const newEstimate = {
        _id: 'est_' + Date.now(),
        ...estimateObject,
        createdAt: new Date().toISOString()
      };
      memoryEstimates.unshift(newEstimate);
      return res.status(201).json(newEstimate);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEstimates = async (req, res) => {
  try {
    if (getIsConnected()) {
      const estimates = await Estimate.find({ userId: req.user.id }).sort({ createdAt: -1 });
      return res.json(estimates);
    } else {
      return res.json(memoryEstimates);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEstimateById = async (req, res) => {
  try {
    const { id } = req.params;
    if (getIsConnected()) {
      const estimate = await Estimate.findById(id);
      if (!estimate) return res.status(404).json({ message: 'Estimate not found' });
      return res.json(estimate);
    } else {
      const estimate = memoryEstimates.find(e => e._id === id) || memoryEstimates[0];
      return res.json(estimate);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteEstimate = async (req, res) => {
  try {
    const { id } = req.params;
    if (getIsConnected()) {
      await Estimate.findByIdAndDelete(id);
      return res.json({ message: 'Estimate deleted successfully' });
    } else {
      const idx = memoryEstimates.findIndex(e => e._id === id);
      if (idx !== -1) memoryEstimates.splice(idx, 1);
      return res.json({ message: 'Estimate deleted successfully' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createEstimate, getEstimates, getEstimateById, deleteEstimate };
