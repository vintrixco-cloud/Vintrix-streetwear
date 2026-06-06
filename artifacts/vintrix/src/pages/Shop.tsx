import { useState } from "react";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";

const CATEGORIES = ["All", "Tees", "Hoodies", "Bottoms", "Accessories"];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen pt-12 pb-32 px-6 max-w-[1600px] mx-auto w-full">
      <div className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <h1 className="font-bebas text-8xl tracking-wider">SHOP</h1>
        
        <div className="flex flex-wrap gap-4 font-space text-sm tracking-widest">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 border transition-colors ${
                activeCategory === category 
                  ? "bg-white text-black border-white" 
                  : "bg-transparent text-white border-border hover:border-white"
              }`}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {filteredProducts.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="py-32 text-center font-space text-xl tracking-widest text-muted-foreground">
          NO PRODUCTS FOUND IN THIS CATEGORY.
        </div>
      )}
    </div>
  );
}
