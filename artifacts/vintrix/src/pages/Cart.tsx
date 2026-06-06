import { useCart } from "../context/CartContext";
import { Link, useLocation } from "wouter";
import { Minus, Plus, X } from "lucide-react";
import { motion } from "framer-motion";

export default function Cart() {
  const { items, updateQty, removeFromCart, subtotal, cartCount } = useCart();

  if (cartCount === 0) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="font-bebas text-7xl mb-8">YOUR CART IS EMPTY</h1>
        <Link href="/shop" className="font-space text-sm tracking-widest border border-white px-8 py-4 hover:bg-white hover:text-black transition-colors">
          RETURN TO SHOP
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] pt-12 pb-32 px-6 max-w-[1600px] mx-auto w-full">
      <h1 className="font-bebas text-7xl md:text-8xl tracking-wider mb-16">YOUR CART</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-border font-space text-sm tracking-widest text-muted-foreground">
            <div className="col-span-6">PRODUCT</div>
            <div className="col-span-2 text-center">PRICE</div>
            <div className="col-span-2 text-center">QUANTITY</div>
            <div className="col-span-2 text-right">TOTAL</div>
          </div>

          {items.map((item, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={`${item.product.id}-${item.size}`} 
              className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center py-6 border-b border-border"
            >
              <div className="col-span-1 md:col-span-6 flex gap-6">
                <div className="w-24 h-32 bg-card border border-border shrink-0">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover grayscale-[0.2]" />
                </div>
                <div className="flex flex-col justify-center">
                  <Link href={`/product/${item.product.id}`} className="font-bebas text-3xl hover:text-muted-foreground transition-colors">
                    {item.product.name}
                  </Link>
                  <span className="font-space text-sm text-muted-foreground mt-1">SIZE: {item.size}</span>
                  <button 
                    onClick={() => removeFromCart(item.product.id, item.size)}
                    className="font-space text-xs tracking-widest text-muted-foreground underline mt-4 text-left w-max hover:text-white"
                  >
                    REMOVE
                  </button>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 font-space md:text-center">
                <span className="md:hidden text-muted-foreground text-sm mr-4">PRICE:</span>
                {item.product.price} QAR
              </div>

              <div className="col-span-1 md:col-span-2 flex justify-start md:justify-center">
                <div className="flex items-center border border-border w-max">
                  <button 
                    onClick={() => updateQty(item.product.id, item.size, item.qty - 1)}
                    className="p-3 hover:bg-white hover:text-black transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-space w-10 text-center">{item.qty}</span>
                  <button 
                    onClick={() => updateQty(item.product.id, item.size, item.qty + 1)}
                    className="p-3 hover:bg-white hover:text-black transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 font-space md:text-right">
                 <span className="md:hidden text-muted-foreground text-sm mr-4">TOTAL:</span>
                {item.product.price * item.qty} QAR
              </div>
            </motion.div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-card border border-border p-8 sticky top-24">
            <h2 className="font-bebas text-4xl tracking-wider mb-8">ORDER SUMMARY</h2>
            
            <div className="flex justify-between items-center mb-6 font-space">
              <span className="text-muted-foreground tracking-widest">SUBTOTAL</span>
              <span>{subtotal} QAR</span>
            </div>
            
            <div className="flex justify-between items-center mb-8 font-space pb-8 border-b border-border">
              <span className="text-muted-foreground tracking-widest">SHIPPING</span>
              <span className="text-xs text-right">CALCULATED AT CHECKOUT</span>
            </div>
            
            <div className="flex justify-between items-center mb-10 font-space text-xl">
              <span className="tracking-widest">TOTAL</span>
              <span>{subtotal} QAR</span>
            </div>

            <Link href="/checkout" className="w-full bg-white text-black font-bebas text-3xl tracking-widest py-5 hover:bg-black hover:text-white border border-white transition-colors block text-center">
              PROCEED TO CHECKOUT
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
