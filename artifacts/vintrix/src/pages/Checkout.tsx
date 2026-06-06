import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import type { ShippingAddress, OrderItem } from '../lib/supabase';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const COUNTRIES = ['Qatar','United Arab Emirates','Saudi Arabia','Kuwait','Bahrain','Oman','United Kingdom','United States','Germany','France','Australia','Canada','Other'];

function generateSKU(productId: string, size: string): string {
  return `VX-${productId.padStart(3,'0')}-${size.toUpperCase()}`;
}

export default function Checkout() {
  const { items, subtotal, cartCount } = useCart();
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [step, setStep] = useState<'address' | 'review' | 'success'>('address');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  const [address, setAddress] = useState<ShippingAddress>({
    full_name: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    address_line1: '',
    address_line2: '',
    city: '',
    country: 'Qatar',
    postal_code: '',
    phone: '',
  });

  const inputClass = "w-full bg-transparent border border-border px-4 py-4 text-foreground text-sm outline-none focus:border-white transition-colors placeholder:text-muted-foreground";
  const labelClass = "text-xs tracking-widest uppercase text-muted-foreground mb-2 block";

  const handleAddressNext = () => {
    if (!address.full_name || !address.email || !address.address_line1 || !address.city || !address.country || !address.phone) {
      setError('Please fill in all required fields.'); return;
    }
    setError(null);
    setStep('review');
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError(null);
    try {
      const orderItems: OrderItem[] = items.map(item => ({
        product_id: item.product.id,
        product_name: item.product.name,
        product_image: item.product.image,
        size: item.size,
        qty: item.qty,
        price: item.product.price,
        sku: generateSKU(item.product.id, item.size),
      }));

      const { data, error: insertError } = await supabase.from('orders').insert({
        user_id: user?.id || null,
        status: 'pending',
        items: orderItems,
        subtotal,
        shipping_address: address,
      }).select().single();

      if (insertError) throw new Error(insertError.message);

      // Trigger Make.com webhook
      const webhookUrl = import.meta.env.VITE_MAKE_WEBHOOK_URL;
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            order_id: data.id,
            customer_email: address.email,
            customer_name: address.full_name,
            shipping_address: address,
            items: orderItems,
            subtotal,
            created_at: new Date().toISOString(),
          }),
        });
      }

      setOrderId(data.id);
      // Clear cart
      localStorage.removeItem('vintrix_cart');
      window.dispatchEvent(new Event('vintrix_cart_cleared'));
      setStep('success');
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  if (cartCount === 0 && step !== 'success') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="font-bebas text-7xl mb-8">YOUR CART IS EMPTY</h1>
        <Link href="/shop" className="font-space text-sm tracking-widest border border-white px-8 py-4 hover:bg-white hover:text-black transition-colors">
          RETURN TO SHOP
        </Link>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
          <CheckCircle size={64} className="text-green-400 mx-auto mb-8" />
          <h1 className="font-bebas text-7xl mb-4">ORDER PLACED</h1>
          <p className="text-muted-foreground text-sm tracking-widest uppercase mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            ORDER #{orderId?.slice(-8).toUpperCase()}
          </p>
          <p className="text-muted-foreground text-sm mb-12 max-w-md" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            A confirmation email has been sent to {address.email}. You can track your order in your account.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user && (
              <Link href="/account" className="border border-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-colors" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                TRACK MY ORDER
              </Link>
            )}
            <Link href="/shop" className="border border-border px-8 py-4 text-sm tracking-widest uppercase hover:border-white transition-colors text-muted-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              CONTINUE SHOPPING
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-12 pb-32 px-6 max-w-[1400px] mx-auto w-full">
      <h1 className="font-bebas text-7xl md:text-8xl tracking-wider mb-4">CHECKOUT</h1>

      {/* Steps indicator */}
      <div className="flex items-center gap-4 mb-16" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {['address', 'review'].map((s, i) => (
          <div key={s} className="flex items-center gap-4">
            <div className={`flex items-center gap-2 text-xs tracking-widest uppercase ${step === s ? 'text-white' : 'text-muted-foreground'}`}>
              <span className={`w-6 h-6 flex items-center justify-center border text-xs ${step === s ? 'border-white bg-white text-black' : 'border-border'}`}>{i + 1}</span>
              {s === 'address' ? 'SHIPPING' : 'REVIEW'}
            </div>
            {i < 1 && <div className="w-8 h-px bg-border" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left */}
        <div className="lg:col-span-2">
          {step === 'address' && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
              <h2 className="font-bebas text-4xl tracking-wider">SHIPPING ADDRESS</h2>
              {!user && (
                <div className="border border-border p-4 text-xs tracking-widest uppercase text-muted-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  <Link href="/auth" className="text-white hover:underline">SIGN IN</Link> to save your order history and track orders easily.
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className={labelClass} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Full Name *</label>
                  <input className={inputClass} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} value={address.full_name} onChange={e => setAddress({...address, full_name: e.target.value})} placeholder="John Doe" />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Email *</label>
                  <input className={inputClass} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} type="email" value={address.email} onChange={e => setAddress({...address, email: e.target.value})} placeholder="john@example.com" />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Address Line 1 *</label>
                  <input className={inputClass} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} value={address.address_line1} onChange={e => setAddress({...address, address_line1: e.target.value})} placeholder="Street address, building, flat" />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Address Line 2</label>
                  <input className={inputClass} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} value={address.address_line2} onChange={e => setAddress({...address, address_line2: e.target.value})} placeholder="Apartment, suite, floor (optional)" />
                </div>
                <div>
                  <label className={labelClass} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>City *</label>
                  <input className={inputClass} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} value={address.city} onChange={e => setAddress({...address, city: e.target.value})} placeholder="City" />
                </div>
                <div>
                  <label className={labelClass} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Postal Code</label>
                  <input className={inputClass} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} value={address.postal_code} onChange={e => setAddress({...address, postal_code: e.target.value})} placeholder="Postal / ZIP code" />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Country *</label>
                  <select className={inputClass + ' cursor-pointer'} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} value={address.country} onChange={e => setAddress({...address, country: e.target.value})}>
                    {COUNTRIES.map(c => <option key={c} value={c} className="bg-black">{c}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Phone Number *</label>
                  <input className={inputClass} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} value={address.phone} onChange={e => setAddress({...address, phone: e.target.value})} placeholder="+974 XXXX XXXX" />
                </div>
              </div>
              {error && <p className="text-red-400 text-xs tracking-widest uppercase" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{error}</p>}
              <button onClick={handleAddressNext} className="w-full bg-white text-black font-bebas text-3xl tracking-widest py-5 hover:bg-black hover:text-white border border-white transition-colors mt-4">
                CONTINUE TO REVIEW
              </button>
            </motion.div>
          )}

          {step === 'review' && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h2 className="font-bebas text-4xl tracking-wider">REVIEW ORDER</h2>
                <button onClick={() => setStep('address')} className="text-xs tracking-widest uppercase text-muted-foreground hover:text-white transition-colors" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>← EDIT ADDRESS</button>
              </div>
              <div className="border border-border p-6">
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>SHIPPING TO</p>
                <p className="text-sm leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {address.full_name} · {address.email}<br />
                  {address.address_line1}{address.address_line2 ? `, ${address.address_line2}` : ''}<br />
                  {address.city}, {address.country}{address.postal_code ? ` ${address.postal_code}` : ''}<br />
                  {address.phone}
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {items.map((item, i) => (
                  <div key={i} className="flex gap-4 items-center border-b border-border pb-4">
                    <div className="w-16 h-20 bg-card border border-border shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bebas text-xl tracking-wide">{item.product.name}</p>
                      <p className="text-muted-foreground text-xs tracking-widest" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>SIZE: {item.size} · QTY: {item.qty}</p>
                    </div>
                    <p className="font-bebas text-xl">{item.product.price * item.qty} QAR</p>
                  </div>
                ))}
              </div>
              <div className="border border-border p-6 text-xs tracking-widest uppercase text-muted-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                ⚠ PAYMENT INTEGRATION COMING SOON. CLICKING PLACE ORDER WILL SUBMIT YOUR ORDER FOR DEMO PURPOSES.
              </div>
              {error && <p className="text-red-400 text-xs tracking-widest uppercase" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{error}</p>}
              <button onClick={handlePlaceOrder} disabled={loading} className="w-full bg-white text-black font-bebas text-3xl tracking-widest py-5 hover:bg-black hover:text-white border border-white transition-colors disabled:opacity-50">
                {loading ? 'PLACING ORDER...' : 'PLACE ORDER'}
              </button>
            </motion.div>
          )}
        </div>

        {/* Right: Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border p-8 sticky top-24">
            <h2 className="font-bebas text-4xl tracking-wider mb-8">ORDER SUMMARY</h2>
            <div className="flex flex-col gap-3 mb-6">
              {items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  <span className="text-muted-foreground">{item.product.name} × {item.qty}</span>
                  <span>{item.product.price * item.qty} QAR</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-6 flex justify-between items-center">
              <span className="font-bebas text-2xl tracking-wider">TOTAL</span>
              <span className="font-bebas text-2xl">{subtotal} QAR</span>
            </div>
            <p className="text-muted-foreground text-xs tracking-widest uppercase mt-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              SHIPPING CALCULATED AFTER ORDER
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
