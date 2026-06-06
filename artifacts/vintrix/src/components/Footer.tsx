import { Link } from "wouter";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h2 className="font-bebas text-4xl mb-4">VINTRIX</h2>
          <p className="font-barlow text-muted-foreground uppercase tracking-widest max-w-xs">
            UNCOMPROMISING STREETWEAR. MADE DIFFERENT.
          </p>
        </div>
        
        <div className="flex flex-col gap-4 font-space text-sm tracking-widest">
          {[
            { href: "/", label: "HOME" },
            { href: "/shop", label: "SHOP" },
            { href: "/about", label: "ABOUT" },
            { href: "/contact", label: "CONTACT" },
          ].map(({ href, label }) => (
            <motion.div
              key={label}
              whileHover={{ x: 6, color: "#ffffff" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="w-max cursor-pointer text-muted-foreground"
            >
              <Link href={href}>{label}</Link>
            </motion.div>
          ))}
        </div>

        <div className="font-space text-sm tracking-widest text-muted-foreground flex flex-col justify-end items-start md:items-end">
          <p>© {new Date().getFullYear()} VINTRIX</p>
          <p className="mt-2">ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
}
