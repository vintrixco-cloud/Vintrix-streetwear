-- Run this in your Supabase SQL editor to set up the database

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','processing','shipped','delivered','cancelled')),
  items JSONB NOT NULL,
  subtotal NUMERIC NOT NULL,
  shipping_address JSONB NOT NULL,
  tracking_number TEXT,
  tracking_url TEXT
);

-- Allow logged-in users to see only their own orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Anyone can insert orders" ON orders
  FOR INSERT WITH CHECK (true);

-- Allow service role (Make.com webhook) to update orders
CREATE POLICY "Service role can update orders" ON orders
  FOR UPDATE USING (true);
