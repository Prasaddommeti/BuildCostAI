import jsPDF from 'jspdf';
import { EstimateResult } from '../types';
import { formatCurrency, formatArea } from './formatters';

export function generatePDFReport(estimate: EstimateResult, currency: string = 'USD', unit: string = 'sq.ft') {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Page Dimensions
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header Banner
  doc.setFillColor(15, 23, 42); // Slate 900
  doc.rect(0, 0, pageWidth, 40, 'F');

  // Brand Header
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('BuildCostAI', 15, 22);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(148, 163, 184); // Slate 400
  doc.text('AI-POWERED CONSTRUCTION COST ESTIMATE REPORT', 15, 29);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.text(`Report Date: ${new Date().toLocaleDateString()}`, pageWidth - 60, 22);
  doc.text(`Ref ID: #${estimate._id.slice(-6).toUpperCase()}`, pageWidth - 60, 29);

  // Section 1: Project Summary Box
  let y = 50;
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(15, y, pageWidth - 30, 32, 3, 3, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(37, 99, 235); // Brand Blue
  doc.text(estimate.projectName, 20, y + 10);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);
  doc.text(`Building Type: ${estimate.buildingType} (${estimate.constructionType} Grade)`, 20, y + 18);
  doc.text(`Location: ${estimate.location.city}, ${estimate.location.state}`, 20, y + 25);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(34, 197, 94); // Emerald Green
  doc.text(formatCurrency(estimate.totalCost, currency), pageWidth - 75, y + 15);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text(`Total Estimated Project Budget (incl. 18% GST)`, pageWidth - 85, y + 23);

  // Key Technical Specs Grid
  y += 42;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('1. Key Structural & Architectural Specifications', 15, y);

  y += 6;
  doc.setFillColor(241, 245, 249);
  doc.rect(15, y, pageWidth - 30, 26, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text(`Area: ${formatArea(estimate.area, unit)}`, 20, y + 7);
  doc.text(`Floors: ${estimate.floors} Level(s)`, 75, y + 7);
  doc.text(`Bedrooms / Baths: ${estimate.bedrooms} Beds / ${estimate.bathrooms} Baths`, 130, y + 7);

  doc.text(`Steel Grade: ${estimate.steelGrade}`, 20, y + 15);
  doc.text(`Cement Brand: ${estimate.cementBrand}`, 75, y + 15);
  doc.text(`Brick Type: ${estimate.brickType}`, 130, y + 15);

  doc.text(`Foundation: ${estimate.foundationType}`, 20, y + 23);
  doc.text(`Roof Type: ${estimate.roofType}`, 75, y + 23);
  doc.text(`Interior Finish: ${estimate.interiorFinish}`, 130, y + 23);

  // Cost Breakdown Table
  y += 35;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('2. Comprehensive Cost Allocation Breakdown', 15, y);

  y += 6;
  // Table Header
  doc.setFillColor(37, 99, 235);
  doc.rect(15, y, pageWidth - 30, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.text('Cost Category', 20, y + 5.5);
  doc.text('Allocated Amount', pageWidth - 70, y + 5.5);
  doc.text('% Share', pageWidth - 35, y + 5.5);

  const breakdownRows = [
    { label: 'Structural Steel (TMT)', cost: estimate.costBreakdown.steelCost },
    { label: 'Cement & Concrete', cost: estimate.costBreakdown.cementCost },
    { label: 'Masonry & AAC Bricks', cost: estimate.costBreakdown.brickCost },
    { label: 'Foundation & Earthwork', cost: estimate.costBreakdown.foundationCost },
    { label: 'Roofing & Slab Casting', cost: estimate.costBreakdown.roofCost },
    { label: 'Sand & Aggregates', cost: estimate.costBreakdown.sandCost + estimate.costBreakdown.aggregateCost },
    { label: 'Labour & Workforce Charges', cost: estimate.costBreakdown.labourCost },
    { label: 'Electrical & Automation', cost: estimate.costBreakdown.electricalCost },
    { label: 'Plumbing & Fixtures', cost: estimate.costBreakdown.plumbingCost },
    { label: 'Interior Fitouts & Woodwork', cost: estimate.costBreakdown.interiorCost + estimate.costBreakdown.woodCost },
    { label: 'Flooring & Tiles', cost: estimate.costBreakdown.tilesCost },
    { label: 'Painting & Finishing', cost: estimate.costBreakdown.paintingCost },
    { label: 'GST & Statutory Taxes (18%)', cost: estimate.costBreakdown.gstTax },
  ];

  y += 8;
  breakdownRows.forEach((row, index) => {
    const isEven = index % 2 === 0;
    doc.setFillColor(isEven ? 248 : 255, isEven ? 250 : 255, isEven ? 252 : 255);
    doc.rect(15, y, pageWidth - 30, 6.5, 'F');

    const share = ((row.cost / estimate.totalCost) * 100).toFixed(1);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    doc.text(row.label, 20, y + 4.5);
    doc.text(formatCurrency(row.cost, currency), pageWidth - 70, y + 4.5);
    doc.text(`${share}%`, pageWidth - 35, y + 4.5);

    y += 6.5;
  });

  // AI Optimization Recommendations
  y += 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('3. AI Smart Cost Optimization Recommendations', 15, y);

  y += 6;
  estimate.aiRecommendations.slice(0, 3).forEach((rec) => {
    doc.setFillColor(239, 246, 255);
    doc.roundedRect(15, y, pageWidth - 30, 14, 2, 2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(37, 99, 235);
    doc.text(`• ${rec.title} [Savings: ~${formatCurrency(rec.potentialSavings, currency)}]`, 20, y + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text(rec.description.slice(0, 110) + '...', 20, y + 10);

    y += 16;
  });

  // Footer Disclaimer
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('Generated by BuildCostAI Platform. Prices subject to localized market rate fluctuations.', 15, 285);

  doc.save(`${estimate.projectName.replace(/\s+/g, '_')}_BuildCostAI_Report.pdf`);
}
