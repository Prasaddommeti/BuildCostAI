const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    estimateId: { type: String, required: true },
    projectName: { type: String, required: true },
    reportType: { type: String, enum: ['Executive Summary', 'Detailed Cost Breakdown', 'Material Procurement Plan'], default: 'Detailed Cost Breakdown' },
    fileFormat: { type: String, enum: ['PDF', 'Excel', 'CSV'], default: 'PDF' },
    totalCost: { type: Number, required: true },
    area: { type: Number, required: true },
    downloadUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Report', reportSchema);
