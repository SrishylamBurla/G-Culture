import { motion } from "framer-motion";
import { Heart, Zap, Shield, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutPage() {
  const values = [
    {
      icon: Zap,
      title: "Bold Expression",
      desc: "Every piece is designed for those who refuse to blend in. We create fashion that speaks before you do.",
    },
    {
      icon: Shield,
      title: "Uncompromised Quality",
      desc: "Premium fabrics, meticulous craftsmanship, and attention to detail in every stitch and seam.",
    },
    {
      icon: Heart,
      title: "Rooted in Culture",
      desc: "Inspired by Indian street culture, global trends, and the fearless spirit of the youth.",
    },
    {
      icon: Users,
      title: "Community First",
      desc: "More than a brand — we're a movement. Built by the community, for the community.",
    },
  ];

  const stats = [
    { number: "10K+", label: "Happy Customers" },
    { number: "500+", label: "Products" },
    { number: "50+", label: "Cities Delivered" },
    { number: "4.8★", label: "Average Rating" },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <section className="w-full min-h-screen bg-[#050507] text-white pt-28 md:pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37]/50 mb-3">
            Our Story
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
            About G-Culture
          </h1>
          <p className="text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Born from the streets of India, G-Culture is more than just a fashion
            brand — it's a statement. We blend raw street energy with premium
            quality to create pieces that define a generation.
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-20"
        >
          <div className="bg-white/[0.03] border border-[#d4af37]/10 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  From Silent Struggle to{" "}
                  <span className="text-[#d4af37]">Street Strength</span>
                </h2>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  G-Culture started with a simple belief — fashion should be
                  fearless. Founded by a group of young creatives from India, we
                  set out to build a brand that represents the hustle, the grind,
                  and the unapologetic confidence of street culture.
                </p>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Every hoodie, every tee, every cap carries a story. Our designs
                  are inspired by late-night studio sessions, city streets, hip-hop
                  beats, and the relentless pursuit of something bigger. We don't
                  just make clothes — we make armor for the ambitious.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-square flex items-center justify-center">
                  <img
                    src="/images/gculture.png"
                    alt="G-Culture"
                    className="w-48 h-48 opacity-80"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              variants={fadeUp}
              className="bg-white/[0.03] border border-[#d4af37]/10 rounded-2xl p-6 text-center"
            >
              <p className="text-2xl md:text-3xl font-bold text-[#d4af37] mb-1">
                {stat.number}
              </p>
              <p className="text-xs uppercase tracking-wider text-gray-500">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Values */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.div variants={fadeUp} className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37]/50 mb-3">
              What Drives Us
            </p>
            <h2 className="text-3xl font-bold tracking-tight">Our Values</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                custom={i}
                variants={fadeUp}
                className="bg-white/[0.03] border border-[#d4af37]/10 rounded-2xl p-6 hover:border-[#d4af37]/20 transition-colors duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0">
                    <value.icon size={18} className="text-[#d4af37]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-[#d4af37]/10 via-[#050507] to-[#d4af37]/5 border border-[#d4af37]/10 rounded-2xl p-10 md:p-14">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Ready to Join the Culture?
            </h2>
            <p className="text-sm text-gray-400 mb-6 max-w-md mx-auto">
              Explore our latest collections and find pieces that match your energy.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#d4af37] text-black rounded-full text-sm font-semibold uppercase tracking-wider hover:bg-[#c09b33] hover:shadow-lg hover:shadow-[#d4af37]/20 transition-all duration-300"
            >
              Shop Now
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
