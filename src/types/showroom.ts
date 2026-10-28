export type CarStatus = 'Tersedia' | 'Terpesan' | 'Terjual';
export type TransmissionType = 'Otomatis' | 'Manual';
export type ActiveTab = 'home' | 'inventory' | 'detail' | 'about' | 'contact';

export interface InspectionBreakdown {
  engineScore: string;
  transmissionScore: string;
  chassisScore: string;
  electricalScore: string;
  interiorScore: string;
  floodFreeConfirmed: boolean;
  accidentFreeConfirmed: boolean;
}

export interface TechnicalSpecs {
  engine: {
    displacement: string;
    fuelType: string;
    compression: string;
    maxPower: string;
    transmissionType: string;
    gearboxStatus: string;
  };
  chassis: {
    frontSuspension: string;
    rearSuspension: string;
    brakeSystem: string;
    tireCondition: string;
  };
  dimensions: {
    fuelTank: string;
    groundClearance: string;
    seatingRows: string;
    bootCapacity: string;
  };
  odometer: {
    verifiedMileage: string;
    serviceRecord: string;
    odometerAuthenticity: string;
  };
}

export interface LegalitySheet {
  bpkbInvoiceStatus: string;
  stnkTaxValidity: string;
  registrationArea: string;
  samsatPhysicalCheck: string;
  buybackGuaranteeClause: string;
}

export interface CarUnit {
  id: string;
  title: string;
  brand: string;
  year: number;
  price: number;
  transmission: TransmissionType;
  mileage: number;
  engineCapacity: string;
  taxStatus: string;
  plateNumber: string;
  ownership: string;
  serviceHistory: string;
  inspectionStatus: string;
  status: CarStatus;
  isFeatured: boolean;
  images: string[];
  inspectionBreakdown: InspectionBreakdown;
  technicalSpecs?: TechnicalSpecs;
  legalitySheet?: LegalitySheet;
}

export interface HowItWorksStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  description: string;
  type?: 'success' | 'info' | 'warning';
}

export interface SalesAdvisor {
  name: string;
  role: string;
  phone: string;
  experience: string;
  avatar: string;
}
