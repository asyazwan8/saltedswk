export interface Category {
  id: string;
  name: string;
  slug: string;
  order: number;
  created_at: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  base_price: number;
  image_url: string | null;
  category_id: string;
  available: boolean;
  featured: boolean;
  order: number;
  created_at: string;
  updated_at: string;
  category?: Category;
  variants?: Variant[];
}

export interface Variant {
  id: string;
  menu_item_id: string;
  name: string;
  price_add: number;
}

export interface Setting {
  id: string;
  key: string;
  value: string;
}

export interface CartEntry {
  id: string;
  menuItemId: string;
  name: string;
  imageUrl: string | null;
  variantId?: string;
  variantName?: string;
  unitPrice: number;
  quantity: number;
  note: string;
}
