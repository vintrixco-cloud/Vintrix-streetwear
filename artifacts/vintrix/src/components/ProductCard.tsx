import { Link } from "wouter";
import { Product } from "../data/products";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addToCart } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes[0]);
    toast.success(`${product.name} added to cart`, {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/product/${product.id}`} className="group block relative h-full">
        <div className="bg-card border border-border aspect-[3/4] relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover grayscale-[0.2] contrast-125 group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
            <button 
              onClick={handleAdd}
              className="bg-white text-black font-bebas text-2xl px-8 py-3 tracking-widest hover:bg-black hover:text-white border border-white transition-colors"
            >
              QUICK ADD
            </button>
          </div>
        </div>
        
        <div className="mt-4 flex flex-col gap-1">
          <div className="flex justify-between items-start">
            <h3 className="font-bebas text-2xl tracking-wide">{product.name}</h3>
            <span className="font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>{product.price} QAR</span>
          </div>
          <span className="font-space text-xs text-muted-foreground uppercase">{product.category}</span>
        </div>
      </Link>
    </motion.div>
  );
}
