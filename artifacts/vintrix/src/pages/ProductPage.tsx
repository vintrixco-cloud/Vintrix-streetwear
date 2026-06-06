import { useParams, Link } from "wouter";
import { useState } from "react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] ?? "");
  const [openPanel, setOpenPanel] = useState<string | null>(null);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
    toast.success(`${product.name} ADDED TO CART`, {
      style: {
        borderRadius: "0px",
        background: "#fff",
        color: "#000",
        border: "none",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        textTransform: "uppercase"
      }
    });
  };

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-4rem)]">
        {/* Left: Image */}
        <div className="bg-card border-r border-b lg:border-b-0 border-border p-8 lg:p-16 flex items-center justify-center relative overflow-hidden group">
          <motion.img 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            src={product.image} 
            alt={product.name}
            className="w-full max-w-2xl object-contain grayscale-[0.2] contrast-125 group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>

        {/* Right: Details */}
        <div className="p-8 lg:p-16 flex flex-col justify-center">
          <div className="mb-4">
            <Link href="/shop" className="font-space text-sm tracking-widest text-muted-foreground hover:text-white transition-colors">
              ← BACK TO SHOP
            </Link>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="font-bebas text-6xl md:text-8xl tracking-wider leading-none mb-4">{product.name}</h1>
            <p className="font-space text-2xl mb-8">{product.price} QAR</p>
            
            <div className="text-xl uppercase tracking-wide text-muted-foreground mb-12 max-w-xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {product.description}
            </div>

            <div className="mb-12">
              <div className="flex justify-between items-end mb-4">
                <span className="font-space text-sm tracking-widest">SIZE</span>
                <span className="font-space text-xs tracking-widest text-muted-foreground underline cursor-pointer">SIZE GUIDE</span>
              </div>
              <div className="flex flex-wrap gap-4">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 border font-space text-lg transition-colors ${
                      selectedSize === size 
                        ? "bg-white text-black border-white" 
                        : "bg-transparent text-white border-border hover:border-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={handleAddToCart}
              className="w-full bg-white text-black font-bebas text-4xl py-6 hover:bg-black hover:text-white border border-white transition-colors"
            >
              ADD TO CART
            </button>

            {/* Accordion */}
            <div className="mt-16 border-t border-border font-space text-sm tracking-widest uppercase">
              {[
                { key: "MATERIAL & CARE", content: "100% HEAVYWEIGHT COTTON. MACHINE WASH COLD. DO NOT TUMBLE DRY. IRON ON REVERSE." },
                { key: "SHIPPING", content: "WORLDWIDE SHIPPING. ORDERS PROCESSED WITHIN 2–4 BUSINESS DAYS. DELIVERY TIMES VARY BY REGION. TRACKING PROVIDED ON ALL ORDERS." },
                { key: "RETURNS", content: "RETURNS ACCEPTED WITHIN 14 DAYS OF DELIVERY. ITEM MUST BE UNWORN AND IN ORIGINAL CONDITION. CONTACT US BEFORE RETURNING." },
              ].map(({ key, content }) => (
                <div key={key} className="border-b border-border">
                  <div
                    className="py-6 flex justify-between cursor-pointer hover:bg-white/5 transition-colors px-1"
                    onClick={() => setOpenPanel(openPanel === key ? null : key)}
                  >
                    <span>{key}</span>
                    <span>{openPanel === key ? "−" : "+"}</span>
                  </div>
                  <div
                    style={{
                      maxHeight: openPanel === key ? "200px" : "0",
                      overflow: "hidden",
                      transition: "max-height 300ms ease",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: "13px",
                        lineHeight: "1.75",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                      className="text-muted-foreground pb-6 px-1"
                    >
                      {content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
