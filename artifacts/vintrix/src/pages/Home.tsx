import { Link } from "wouter";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { Ticker } from "../components/Ticker";
import { motion } from "framer-motion";

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-4rem)] flex flex-col items-center justify-center overflow-hidden bg-grid-texture pt-20">
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
        
        <div className="relative z-10 text-center flex flex-col items-center w-full px-4">
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-bebas text-[25vw] leading-[0.8] tracking-tighter"
          >
            VINTRIX
          </motion.h1>
          <motion.h2 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="font-bebas text-[15vw] leading-[0.8] tracking-tighter text-stroke-white absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-4 w-full"
          >
            STREETWEAR
          </motion.h2>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-12 font-space tracking-widest text-sm text-center w-full"
        >
          <p>WEAR IT ANYWHERE. SHIPS WORLDWIDE.</p>
        </motion.div>
      </section>

      <Ticker />

      {/* Featured Products */}
      <section className="py-32 px-6 max-w-[1600px] mx-auto w-full">
        <div className="flex justify-between items-end mb-16">
          <h2 className="font-bebas text-6xl tracking-wide">LATEST DROPS</h2>
          <Link href="/shop" className="font-space tracking-widest text-sm hover:text-muted-foreground transition-colors border-b border-white pb-1">
            VIEW ALL
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* Brand Statement */}
      <section className="py-32 px-6 border-t border-border">
        <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <div>
            <h2 className="font-bebas text-[12vw] lg:text-[8vw] leading-[0.85] text-stroke-white">
              MADE<br/>DIFFERENT
            </h2>
          </div>
          <div className="flex flex-col gap-8 font-barlow text-2xl lg:text-3xl uppercase tracking-wide leading-tight text-muted-foreground">
            <p className="text-foreground">
              WE ARE NOT HERE TO BLEND IN. VINTRIX IS BUILT FOR THOSE WHO WEAR THEIR CULTURE LIKE ARMOUR.
            </p>
            <p>
              WE TAKE RAW ENERGY AND TRANSLATE IT INTO HEAVY GARMENTS, STARK SILHOUETTES, AND UNCOMPROMISING DESIGN. NO GEOGRAPHY. NO LIMITS.
            </p>
            <p>
              NO SOFT EDGES. NO APOLOGIES. JUST PURE, UNADULTERATED STREETWEAR.
            </p>
            <Link href="/about" className="font-space text-sm tracking-widest text-white hover:text-muted-foreground transition-colors w-max mt-8 border border-white px-8 py-4">
              READ OUR STORY
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
