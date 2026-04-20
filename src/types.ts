/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  available?: boolean;
  isComplemento?: boolean;
}

export interface DeliveryZone {
  id: string;
  name: string;
  price: number;
}

export interface StoreSettings {
  storeName: string;
  whatsapp: string;
  logo: string;
  socialLinks: {
    instagram: string;
    facebook: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id?: string;
  customerName: string;
  phone: string;
  address: string;
  neighborId: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  createdAt: any;
  status: 'pending' | 'completed' | 'cancelled';
}
