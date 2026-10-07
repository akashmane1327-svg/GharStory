// Real projects: Ventila Park (Bopkhel), Sai Regency (Dighi), Ved Krushnarang (Charoli, Wadmukhwadi)

export const PROJECTS = [
  {
    id: 1,
    name: 'Ventila Park',
    location: 'Bopkhel, Pune',
    city: 'Bopkhel',
    priceLabel: 'Price on Request',
    priceFromL: 0,
    priceToL: null,
    configLabel: '1 & 2 BHK Apartments',
    bhk: [1, 2],
    areaLabel: '650 - 1100 sq.ft',
    amenities: 15,
    status: 'Ready to Move',
    type: 'Residential',
    dateAdded: '2026-06-01',
    image: '/ventila-park.jpg',
  },
  {
    id: 2,
    name: 'Sai Regency',
    location: 'Dighi, Pune',
    city: 'Dighi',
    priceLabel: 'Price on Request',
    priceFromL: 0,
    priceToL: null,
    configLabel: '1 & 2 BHK Apartments',
    bhk: [1, 2],
    areaLabel: '600 - 1050 sq.ft',
    amenities: 12,
    status: 'New Launch',
    type: 'Residential',
    dateAdded: '2026-06-15',
    image: '/sai-residency.jpg',
  },
  {
    id: 3,
    name: 'Ved Krushnarang',
    location: 'Charoli, Wadmukhwadi, Pune',
    city: 'Charoli',
    priceLabel: 'Price on Request',
    priceFromL: 0,
    priceToL: null,
    configLabel: '1 & 2 BHK Apartments',
    bhk: [1, 2],
    areaLabel: '650 - 1150 sq.ft',
    amenities: 18,
    status: 'New Launch',
    type: 'Residential',
    dateAdded: '2026-07-01',
    image: '/ved-krushnarang.jpg',
  },
]

export const FEATURED_PROJECTS = PROJECTS

// Fixed price-range buckets (kept for backward compatibility)
export const PRICE_BUCKETS = [
  { id: 'under-75', label: 'Under ₹75 L', test: (p) => p.priceFromL < 75 },
  { id: '75-100', label: '₹75 L - ₹1 Cr', test: (p) => p.priceFromL >= 75 && p.priceFromL < 100 },
  { id: '100-150', label: '₹1 Cr - ₹1.5 Cr', test: (p) => p.priceFromL >= 100 && p.priceFromL < 150 },
  { id: '150-plus', label: '₹1.5 Cr & Above', test: (p) => p.priceFromL >= 150 },
]
