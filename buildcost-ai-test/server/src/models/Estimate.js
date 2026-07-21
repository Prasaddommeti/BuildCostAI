const mongoose = require('mongoose');

const estimateSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    projectName: { type: String, required: true },
    buildingType: { type: String, required: true },
    constructionType: { type: String, required: true },
    location: {
      state: { type: String, default: 'California' },
      city: { type: String, default: 'San Francisco' }
    },
    area: { type: Number, required: true },
    floors: { type: Number, default: 1 },
    bedrooms: { type: Number, default: 2 },
    bathrooms: { type: Number, default: 2 },
    kitchen: { type: Number, default: 1 },
    balconies: { type: Number, default: 1 },
    parking: { type: String, default: 'Covered 1-Car' },
    interiorFinish: { type: String, default: 'Standard' },
    roofType: { type: String, default: 'RCC Slab' },
    foundationType: { type: String, default: 'Isolated Footing' },
    steelGrade: { type: String, default: 'Fe 550D' },
    cementBrand: { type: String, default: 'UltraTech / Holcim' },
    brickType: { type: String, default: 'AAC Blocks' },
    expectedTimelineMonths: { type: Number, default: 8 },

    // Calculations
    costBreakdown: {
      materialCost: Number,
      labourCost: Number,
      steelCost: Number,
      cementCost: Number,
      sandCost: Number,
      aggregateCost: Number,
      brickCost: Number,
      roofCost: Number,
      foundationCost: Number,
      electricalCost: Number,
      plumbingCost: Number,
      paintingCost: Number,
      tilesCost: Number,
      woodCost: Number,
      interiorCost: Number,
      miscellaneous: Number,
      gstTax: Number,
    },
    metrics: {
      costPerSqFt: Number,
      monthlyExpense: Number,
      completionTimeMonths: Number,
    },
    totalCost: { type: Number, required: true },
    aiRecommendations: [
      {
        category: String,
        title: String,
        description: String,
        potentialSavings: Number,
        impactLevel: String,
      }
    ],
    status: { type: String, enum: ['Draft', 'Completed', 'Archived'], default: 'Completed' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Estimate', estimateSchema);
