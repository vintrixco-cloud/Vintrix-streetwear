import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export type Order = {
  id: string;
  user_id: string;
  created_at: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  shipping_address: ShippingAddress;
  tracking_number?: string;
  tracking_url?: string;
};

export type OrderItem = {
  product_id: string;
  product_name: string;
  product_image: string;
  size: string;
  qty: number;
  price: number;
  sku: string;
};

export type ShippingAddress = {
  full_name: string;
  email: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  country: string;
  postal_code: string;
  phone: string;
};
