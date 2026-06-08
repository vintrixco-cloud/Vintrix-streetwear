import { Link, useLocation } from "wouter";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Menu, X, User } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export function Nav() {
  const { cartCount } = useCart();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/shop", label: "SHOP" },
    { href: "/about", label: "ABOUT" },
    { href: "/contact", label: "CONTACT" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur border-b border-border h-16 flex items-center px-6">
      <div className="flex-1">
        <motion.div whileHover={{ letterSpacing: "0.12em" }} whileTap={{ scale: 0.96 }} transition={{ duration: 0.2 }} className="inline-block">
          <Link href="/" className="font-bebas text-3xl tracking-wider text-foreground">VINTRIX</Link>
        </motion.div>
      </div>

      <div className="hidden md:flex gap-8 text-sm tracking-widest uppercase text-muted-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {navLinks.map(({ href, label }) => (
          <motion.div key={label} whileHover={{ y: -2, color: "#ffffff" }} whileTap={{ scale: 0.93 }} transition={{ duration: 0.15 }} className="relative cursor-pointer">
            <Link href={href} className="block">
              {label}
              <motion.span className="absolute -bottom-1 left-0 h-px bg-white block" initial={{ width: 0 }} whileHover={{ width: "100%" }} transition={{ duration: 0.2 }} />
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="flex-1 flex justify-end items-center gap-3">
        <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }} transition={{ duration: 0.15 }}>
          <Link href={user ? "/account" : "/auth"} className="flex items-center justify-center w-9 h-9 border border-transparent hover:border-white transition-colors text-muted-foreground hover:text-white">
            <User size={16} />
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }} transition={{ duration: 0.15 }}>
          <Link href="/cart" className="flex items-center gap-2 text-sm tracking-widest border border-transparent hover:border-white transition-colors px-3 py-1 text-muted-foreground hover:text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            CART
            <span className="text-white font-bold text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {cartCount}
            </span>
          </Link>
        </motion.div>

        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.15 }} className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center md:hidden" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="absolute top-5 right-6 text-white" onClick={() => setIsOpen(false)}>
            <X size={28} />
          </motion.button>
          <nav className="flex flex-col items-center gap-10 text-4xl tracking-widest">
            {[...navLinks, { href: user ? '/account' : '/auth', label: user ? 'MY ACCOUNT' : 'SIGN IN' }].map(({ href, label }, i) => (
              <motion.div key={label} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.07, duration: 0.3 }} whileHover={{ x: 8, color: "#ffffff" }} whileTap={{ scale: 0.95 }}>
                <Link href={href} onClick={() => setIsOpen(false)} className="text-muted-foreground font-bebas">{label}</Link>
              </motion.div>
            ))}
          </nav>
        </motion.div>
      )}
    </nav>
  );
}
