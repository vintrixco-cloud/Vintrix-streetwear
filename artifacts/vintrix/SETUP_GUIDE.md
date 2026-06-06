# VINTRIX Setup Guide

## Environment Variables
Create a `.env` file in the `artifacts/vintrix/` folder with:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_MAKE_WEBHOOK_URL=https://hook.eu1.make.com/your-webhook-id
```

## Supabase Setup
1. Go to supabase.com and create a free project
2. Go to SQL Editor and paste + run the contents of SUPABASE_SETUP.sql
3. Go to Project Settings → API to get your URL and anon key
4. Go to Authentication → Settings and enable Email auth

## Make.com Automation Setup
Create a new scenario with these modules in order:

**Scenario 1 — New Order (triggers on new Supabase order)**
1. Webhook (Custom) — receives order data from your website
2. Gmail/Resend — send confirmation email to customer
3. Gmail — send order details to yourself (forward to manufacturer)

**Scenario 2 — Tracking Update**
1. Gmail — watch for emails from manufacturer containing tracking numbers
2. Supabase — update order status to 'shipped' and add tracking_number
3. Gmail/Resend — email customer their tracking number

## Operations per order on Make.com free plan:
- Webhook trigger: 1 operation
- Send confirmation email: 1 operation  
- Send order to manufacturer: 1 operation
- TOTAL PER ORDER: ~3 operations
- Free plan gives 1000/month = ~333 orders before needing to upgrade
