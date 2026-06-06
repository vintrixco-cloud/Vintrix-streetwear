import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import type { Order } from '../lib/supabase';
import { useLocation, Link } from 'wouter';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock, XCircle, ExternalLink, LogOut } from 'lucide-react';

const STATUS_CONFIG = {
  pending:    { label: 'ORDER RECEIVED',   icon: Clock,       color: 'text-yellow-400',  bg: 'bg-yellow-400/10 border-yellow-400/30' },
  processing: { label: 'BEING PREPARED',   icon: Package,     color: 'text-blue-400',    bg: 'bg-blue-400/10 border-blue-400/30' },
  shipped:    { label: 'SHIPPED',           icon: Truck,       color: 'text-purple-400',  bg: 'bg-purple-400/10 border-purple-400/30' },
  delivered:  { label: 'DELIVERED',         icon: CheckCircle, color: 'text-green-400',   bg: 'bg-green-400/10 border-green-400/30' },
  cancelled:  { label: 'CANCELLED',         icon: XCircle,     color: 'text-red-400',     bg: 'bg-red-400/10 border-red-400/30' },
};

const STEPS = ['pending', 'processing', 'shipped', 'delivered'];

function OrderStatusBar({ status }: { status: string }) {
  if (status === 'cancelled') return null;
  const currentStep = STEPS.indexOf(status);
  return (
    <div className="flex items-center gap-0 w-full mt-4">
      {STEPS.map((step, i) => {
        const cfg = STATUS_CONFIG[step as keyof typeof STATUS_CONFIG];
        const Icon = cfg.icon;
        const done = i <= currentStep;
        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            <div className={`flex flex-col items-center gap-1 ${done ? 'opacity-100' : 'opacity-30'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${done ? 'border-white bg-white/10' : 'border-border'}`}>
                <Icon size={14} className={done ? 'text-white' : 'text-muted-foreground'} />
              </div>
              <span className="text-[10px] tracking-widest text-center hidden sm:block" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {cfg.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-px mx-1 mb-5 ${i < currentStep ? 'bg-white' : 'bg-border'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = STATUS_CONFIG[order.status];
  const Icon = cfg.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-border bg-card"
    >
      <div
        className="p-6 cursor-pointer hover:bg-white/5 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="font-bebas text-2xl tracking-wider">ORDER #{order.id.slice(-8).toUpperCase()}</p>
            <p className="text-muted-foreground text-xs tracking-widest uppercase mt-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {new Date(order.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              {' · '}{order.items.length} item{order.items.length > 1 ? 's' : ''}
              {' · '}{order.subtotal} QAR
            </p>
          </div>
          <div className={`flex items-center gap-2 px-3 py-2 border text-xs tracking-widest uppercase self-start ${cfg.bg} ${cfg.color}`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <Icon size={12} />
            {cfg.label}
          </div>
        </div>
        <OrderStatusBar status={order.status} />
      </div>

      {expanded && (
        <div className="border-t border-border p-6 flex flex-col gap-6">
          {/* Items */}
          <div className="flex flex-col gap-4">
            {order.items.map((item, i) => (
              <div key={i} className="flex gap-4 items-center">
                <div className="w-16 h-20 bg-background border border-border shrink-0 overflow-hidden">
                  <img src={item.product_image} alt={item.product_name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-bebas text-xl tracking-wide">{item.product_name}</p>
                  <p className="text-muted-foreground text-xs tracking-widest uppercase" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    SIZE: {item.size} · QTY: {item.qty} · SKU: {item.sku}
                  </p>
                  <p className="text-sm mt-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{item.price * item.qty} QAR</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tracking */}
          {order.tracking_number && (
            <div className="border border-border p-4 flex items-center justify-between">
              <div>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>TRACKING NUMBER</p>
                <p className="font-bebas text-xl tracking-wider">{order.tracking_number}</p>
              </div>
              {order.tracking_url && (
                <a href={order.tracking_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs tracking-widest uppercase border border-white px-4 py-3 hover:bg-white hover:text-black transition-colors" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  TRACK <ExternalLink size={12} />
                </a>
              )}
            </div>
          )}

          {/* Shipping address */}
          <div>
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>SHIPPING TO</p>
            <p className="text-sm leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {order.shipping_address.full_name}<br />
              {order.shipping_address.address_line1}{order.shipping_address.address_line2 ? `, ${order.shipping_address.address_line2}` : ''}<br />
              {order.shipping_address.city}, {order.shipping_address.country} {order.shipping_address.postal_code}
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function Account() {
  const { user, signOut, loading } = useAuth();
  const [, navigate] = useLocation();
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) navigate('/auth');
  }, [user, loading]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setOrders((data as Order[]) || []);
        setOrdersLoading(false);
      });
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="font-bebas text-3xl tracking-widest text-muted-foreground">LOADING...</p>
    </div>
  );

  return (
    <div className="min-h-screen pt-12 pb-32 px-6 max-w-[1200px] mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
        <div>
          <h1 className="font-bebas text-7xl md:text-8xl tracking-wider">MY ACCOUNT</h1>
          <p className="text-muted-foreground text-sm tracking-widest uppercase mt-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {user?.user_metadata?.full_name || user?.email}
          </p>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 border border-border px-6 py-3 text-xs tracking-widest uppercase hover:border-white hover:text-white transition-colors text-muted-foreground self-start sm:self-auto"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          <LogOut size={14} />
          SIGN OUT
        </button>
      </div>

      <div>
        <h2 className="font-bebas text-4xl tracking-wider mb-8">YOUR ORDERS</h2>
        {ordersLoading ? (
          <p className="text-muted-foreground text-sm tracking-widest uppercase" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>LOADING ORDERS...</p>
        ) : orders.length === 0 ? (
          <div className="border border-border p-16 text-center">
            <p className="font-bebas text-4xl mb-4">NO ORDERS YET</p>
            <Link href="/shop" className="text-xs tracking-widest uppercase border border-white px-8 py-4 hover:bg-white hover:text-black transition-colors inline-block mt-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              START SHOPPING
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map(order => <OrderCard key={order.id} order={order} />)}
          </div>
        )}
      </div>
    </div>
  );
}
