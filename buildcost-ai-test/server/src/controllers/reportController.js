const Report = require('../models/Report');
const { getIsConnected } = require('../config/db');

const memoryReports = [
  {
    _id: 'rep_01',
    userId: 'demo_user_101',
    estimateId: 'est_2026_01',
    projectName: 'Skyline Modern Residence',
    reportType: 'Executive Summary',
    fileFormat: 'PDF',
    totalCost: 598500,
    area: 2850,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    _id: 'rep_02',
    userId: 'demo_user_101',
    estimateId: 'est_2026_02',
    projectName: 'Apex Commercial Tech Hub',
    reportType: 'Detailed Cost Breakdown',
    fileFormat: 'PDF',
    totalCost: 1248000,
    area: 5200,
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
  }
];

const createReport = async (req, res) => {
  try {
    const { estimateId, projectName, reportType, fileFormat, totalCost, area } = req.body;
    if (getIsConnected()) {
      const report = await Report.create({
        userId: req.user.id,
        estimateId,
        projectName,
        reportType: reportType || 'Detailed Cost Breakdown',
        fileFormat: fileFormat || 'PDF',
        totalCost,
        area
      });
      return res.status(201).json(report);
    } else {
      const newReport = {
        _id: 'rep_' + Date.now(),
        userId: req.user.id || 'demo_user_101',
        estimateId,
        projectName,
        reportType: reportType || 'Detailed Cost Breakdown',
        fileFormat: fileFormat || 'PDF',
        totalCost,
        area,
        createdAt: new Date().toISOString()
      };
      memoryReports.unshift(newReport);
      return res.status(201).json(newReport);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getReports = async (req, res) => {
  try {
    if (getIsConnected()) {
      const reports = await Report.find({ userId: req.user.id }).sort({ createdAt: -1 });
      return res.json(reports);
    } else {
      return res.json(memoryReports);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    if (getIsConnected()) {
      await Report.findByIdAndDelete(id);
      return res.json({ message: 'Report deleted successfully' });
    } else {
      const idx = memoryReports.findIndex(r => r._id === id);
      if (idx !== -1) memoryReports.splice(idx, 1);
      return res.json({ message: 'Report deleted successfully' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createReport, getReports, deleteReport };
