import { motion } from "framer-motion";
import { Link } from "wouter";

const fadeUp = {
  initial: { y: 40, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Section 1 — Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-background">
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="font-bebas text-[12vw] md:text-[10vw] leading-[0.85] tracking-tight text-foreground mb-8"
        >
          WE DON'T FOLLOW<br />TRENDS. WE IGNORE THEM.
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          style={{ fontFamily: 'var(--font-jakarta)' }}
          className="text-xs font-light text-muted-foreground uppercase tracking-[0.4em]"
        >
          VINTRIX — EST. 2025
        </motion.p>
      </section>

      {/* Section 2 — Brand Manifesto */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
          <motion.div {...fadeUp} transition={{ duration: 0.7 }}>
            <h2
              className="font-bebas text-[15vw] md:text-[9vw] leading-[0.85] text-stroke-white"
            >
              BUILT<br />DIFFERENT
            </h2>
          </motion.div>
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-8"
            style={{ fontFamily: 'var(--font-jakarta)' }}
          >
            <p className="text-[17px] md:text-[19px] text-muted-foreground uppercase tracking-[0.12em] leading-[1.8] font-semibold">
              VINTRIX WASN'T BUILT TO FIT IN. IT WAS BUILT FOR PEOPLE WHO LOOK AT MAINSTREAM FASHION AND FEEL ABSOLUTELY NOTHING. EVERY PIECE WE MAKE IS A REJECTION OF THE ORDINARY.
            </p>
            <p className="text-[17px] md:text-[19px] text-muted-foreground uppercase tracking-[0.12em] leading-[1.8] font-semibold">
              WE TREAT CLOTHING AS A CANVAS. EVERY ALL-OVER PRINT IS GRAPHIC ART YOU WEAR — NOT A LOGO SLAPPED ON A BLANK. NOT A TREND CHASED. SOMETHING MADE WITH INTENTION AND WORN WITH CONVICTION.
            </p>
            <p className="text-[17px] md:text-[19px] text-muted-foreground uppercase tracking-[0.12em] leading-[1.8] font-semibold">
              NO SOFT EDGES. NO SEASONAL COLLECTIONS. NO CHASING WHAT'S ALREADY BEEN DONE. JUST HEAVY GARMENTS, UNCOMPROMISING DESIGN, AND A STANDARD THAT DOESN'T MOVE.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 3 — Value Pillars */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-0">
          {[
            {
              num: "01",
              title: "THE CRAFT",
              desc: "Every design is built from scratch. All-over print done properly — not templated, not recycled. If it doesn't hit, it doesn't ship.",
            },
            {
              num: "02",
              title: "THE STANDARD",
              desc: "Premium heavyweight fabric. Custom neck labels. Branded packaging. Every detail considered before it reaches you.",
            },
            {
              num: "03",
              title: "THE MINDSET",
              desc: "We're not here to dress everyone. We're here for the ones who actually care about what they put on. You know who you are.",
            },
          ].map((pillar, i) => (
            <motion.div
              key={pillar.num}
              {...fadeUp}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="border border-border p-10 md:p-12 flex flex-col gap-6 bg-background"
              style={{ borderRight: i < 2 ? undefined : undefined }}
            >
              <span
                className="font-bebas text-[5rem] leading-none text-stroke-white"
              >
                {pillar.num}
              </span>
              <h3 className="font-bebas text-4xl tracking-widest text-foreground">
                {pillar.title}
              </h3>
              <p
                style={{ fontFamily: 'var(--font-jakarta)' }}
                className="text-sm text-muted-foreground leading-relaxed tracking-wide font-light"
              >
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section 4 — Closing Statement */}
      <section className="py-32 px-6 border-t border-border flex flex-col items-center text-center">
        <motion.div {...fadeUp} transition={{ duration: 0.7 }}>
          <h2 className="font-bebas text-[18vw] md:text-[14vw] leading-[0.85] text-foreground">
            WEAR IT
          </h2>
          <h2 className="font-bebas text-[18vw] md:text-[14vw] leading-[0.85] text-stroke-white">
            LIKE YOU
          </h2>
          <h2 className="font-bebas text-[18vw] md:text-[14vw] leading-[0.85] text-foreground">
            MEAN IT
          </h2>
        </motion.div>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ fontFamily: 'var(--font-jakarta)' }}
          className="mt-12 text-xs text-muted-foreground uppercase tracking-[0.4em] font-light"
        >
          WORLDWIDE SHIPPING — UNCOMPROMISING QUALITY — LIMITED DROPS
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-10"
        >
          <Link href="/shop">
            <button
              style={{ fontFamily: 'var(--font-jakarta)' }}
              className="border border-foreground text-foreground bg-transparent px-10 py-4 text-xs uppercase tracking-[0.35em] font-semibold hover:bg-foreground hover:text-background transition-colors duration-200"
            >
              SHOP NOW
            </button>
          </Link>
        </motion.div>
      </section>

    </div>
  );
}
