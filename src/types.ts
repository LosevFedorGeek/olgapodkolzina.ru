export type ArtworkCategory = 'all' | 'watercolor' | 'graphics' | 'in_stock' | 'collection';

export interface Artwork {
  id: string;
  title: string;
  technique: string;
  size: string;
  price: number | null;
  priceFormatted: string;
  inStock: boolean;
  category: 'watercolor' | 'graphics';
  imagePlaceholder?: string;
  imageSrc?: string;
  description: string;
  year: string;
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  priceFormatted: string;
  technique?: string;
  size?: string;
  imageSrc?: string;
  type: 'artwork' | 'masterclass' | 'consultation';
  frameOption?: 'with_frame' | 'canvas_only';
}

export interface ServiceItem {
  id: string;
  title: string;
  desc: string;
  price: string;
  period: string;
  badge: string;
}

export interface InquiryData {
  type: 'artwork' | 'masterclass' | 'consultation' | 'general';
  itemTitle?: string;
  price?: string;
}
