
export enum ProjectArea {
  KITCHEN = 'Kitchen',
  BATHROOM = 'Bathroom',
  LIVING_ROOM = 'Living Room',
  BEDROOM = 'Bedroom',
  OUTDOOR = 'Outdoor',
  OTHER = 'Other'
}

export enum TileType {
  CERAMIC = 'Ceramic',
  PORCELAIN = 'Porcelain',
  NATURAL_STONE = 'Natural Stone',
  WOOD = 'Wood / Hardwood',
  MOSAIC = 'Mosaic',
  GLASS = 'Glass',
  VINYL = 'Luxury Vinyl',
  UNSURE = 'I need advice'
}

export interface LeadInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  marketingConsent: boolean;
}

export interface ProjectDetail {
  area: ProjectArea[]; // Changed to array for multi-select
  subArea?: string[]; // e.g., 'Kitchen - Floor', 'Bathroom - Shower Walls'
  tileType: TileType;
  approxSqFt: number;
  description: string;
  budget?: string;
  requiresDemo: boolean;
  startDate: string;
  photos: File[];
}

export interface FormData {
  lead: LeadInfo;
  project: ProjectDetail;
}

export const INITIAL_FORM_DATA: FormData = {
  lead: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    marketingConsent: false,
  },
  project: {
    area: [ProjectArea.KITCHEN], // Default as array
    subArea: [],
    tileType: TileType.PORCELAIN,
    approxSqFt: 100,
    description: '',
    requiresDemo: false,
    startDate: '',
    photos: []
  }
};
