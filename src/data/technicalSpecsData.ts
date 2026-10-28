import { TechnicalSpecs, LegalitySheet } from '../types/showroom';

export const DEFAULT_TECHNICAL_SPECS: TechnicalSpecs = {
  engine: {
    displacement: '2.393 cc 2GD-FTV Diesel',
    fuelType: 'Diesel (Dex / Biosolar Rekomendasi)',
    compression: '15.6 : 1 (Kompresi Prima)',
    maxPower: '149.6 PS @ 3.400 rpm',
    transmissionType: '6-Speed Automatic Tiptronic',
    gearboxStatus: 'Girboks Sehat, Respon Torsi Normal',
  },
  chassis: {
    frontSuspension: 'Double Wishbone with Coil Spring & Stabilizer',
    rearSuspension: '4-Link with Lateral Rod Coil Spring',
    brakeSystem: 'Ventilated Disc ABS + EBD + Brake Assist',
    tireCondition: 'Bridgestone Dueler A/T (85% Tapak Tebal Rata)',
  },
  dimensions: {
    fuelTank: '80 Liter',
    groundClearance: '225 mm (Aman Kontur Tanjakan Bogor)',
    seatingRows: '3 Baris (7 Penumpang Dewasa)',
    bootCapacity: '200 Liter (Ekspansi 1.080 Liter)',
  },
  odometer: {
    verifiedMileage: '34.200 km (Record Asli Tanpa Putar)',
    serviceRecord: 'Service Rutin Bengkel Resmi Auto2000 Yasmin Bogor',
    odometerAuthenticity: 'Tervalidasi Database ATPM Resmi',
  },
};

export const DEFAULT_LEGALITY_SHEET: LegalitySheet = {
  bpkbInvoiceStatus: 'Asli, Faktur Lengkap, Tangan Pertama Pribadi',
  stnkTaxValidity: 'Pajak Hidup s/d 11/2027, Kaleng Panjang s/d 2029',
  registrationArea: 'Plat F Kota Bogor (Samsat Pajajaran)',
  samsatPhysicalCheck: 'Nomor Rangka & Mesin Identik 100% Cek Fisik Polda Jabar',
  buybackGuaranteeClause: 'Garansi Uang Kembali 100% di Atas Meterai Resmi',
};

export const CAR_SPECS_MAP: Record<string, { specs: TechnicalSpecs; legality: LegalitySheet }> = {
  'toyota-fortuner-vrz-2021': {
    specs: DEFAULT_TECHNICAL_SPECS,
    legality: DEFAULT_LEGALITY_SHEET,
  },
  'toyota-innova-reborn-2020': {
    specs: {
      engine: {
        displacement: '2.393 cc 2GD-FTV Common Rail',
        fuelType: 'Diesel CN 51+',
        compression: '15.6 : 1 Padat',
        maxPower: '149 PS @ 3.400 rpm',
        transmissionType: '6-Speed Otomatis Sport Sequential',
        gearboxStatus: 'Oli Matic Baru Diganti, Tidak Ada Delay',
      },
      chassis: {
        frontSuspension: 'Double Wishbone Coil Spring',
        rearSuspension: '4-Link with Coil Spring',
        brakeSystem: 'Depan Cakram Berventilasi, Belakang Teromol ABS',
        tireCondition: 'Dunlop Enasave (80% Tapak Tebal)',
      },
      dimensions: {
        fuelTank: '55 Liter',
        groundClearance: '178 mm',
        seatingRows: '3 Baris (7-8 Penumpang)',
        bootCapacity: '300 Liter',
      },
      odometer: {
        verifiedMileage: '48.900 km Asli',
        serviceRecord: 'Auto2000 Siliwangi Bogor',
        odometerAuthenticity: 'Buku Servis & Manual Book Lengkap',
      },
    },
    legality: {
      bpkbInvoiceStatus: 'BPKB Asli & Faktur PT Toyota Astra Motor',
      stnkTaxValidity: 'Pajak Aktif s/d 09/2026, Plat F Kota Bogor',
      registrationArea: 'Kota Bogor',
      samsatPhysicalCheck: 'Cek Fisik Samsat Bebas Masalah Hukum',
      buybackGuaranteeClause: 'Jaminan Dokumen Sah 100% Buyback',
    },
  },
};
