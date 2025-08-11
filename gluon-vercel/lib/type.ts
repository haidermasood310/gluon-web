export type User = {
  id: string;
  email?: string;
  created_at?: string;
  tier?: string;
};

export type Campaign = {
  id: string;
  name: string;
  created_at: string;
  brand_name?: string;
  brand_tone?: string;
  product_name?: string;
  product_description?: string;
  product_features?: string[];
};

export type Tier = {
  id: string;
  name: string;
  price: number;
  price_id: string;
  emails_allowed: number;
};
