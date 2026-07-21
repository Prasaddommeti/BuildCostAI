export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  avatar?: string;
  subscription: string;
  currency: string;
  unit: string;
}

export interface CostBreakdown {
  materialCost: number;
  labourCost: number;
  steelCost: number;
  cementCost: number;
  sandCost: number;
  aggregateCost: number;
  brickCost: number;
  roofCost: number;
  foundationCost: number;
  electricalCost: number;
  plumbingCost: number;
  paintingCost: number;
  tilesCost: number;
  woodCost: number;
  interiorCost: number;
  miscellaneous: number;
  gstTax: number;
}

export interface MetricSummary {
  costPerSqFt: number;
  monthlyExpense: number;
  completionTimeMonths: number;
}

export interface AIRecommendation {
  category: string;
  title: string;
  description: string;
  potentialSavings: number;
  impactLevel: 'High' | 'Medium' | 'Low';
}

export interface EstimateInput {
  projectName: string;
  buildingType: string;
  constructionType: string;
  location: { state: string; city: string };
  area: number;
  floors: number;
  bedrooms: number;
  bathrooms: number;
  kitchen: number;
  balconies: number;
  parking: string;
  interiorFinish: string;
  roofType: string;
  foundationType: string;
  steelGrade: string;
  cementBrand: string;
  brickType: string;
}

export interface EstimateResult extends EstimateInput {
  _id: string;
  userId: string;
  totalCost: number;
  metrics: MetricSummary;
  costBreakdown: CostBreakdown;
  aiRecommendations: AIRecommendation[];
  createdAt: string;
  status?: string;
}

export interface ReportItem {
  _id: string;
  userId: string;
  estimateId: string;
  projectName: string;
  reportType: string;
  fileFormat: string;
  totalCost: number;
  area: number;
  createdAt: string;
}
