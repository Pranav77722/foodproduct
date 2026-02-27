import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiChevronDown, FiStar } from 'react-icons/fi';
import { FaShieldAlt, FaTruck, FaLeaf, FaSmile } from 'react-icons/fa';
import ProductCard from '../components/ui/ProductCard';
import Button from '../components/ui/Button';
import AnimateIn from '../components/ui/AnimateIn';
import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import t, { tx } from '../data/translations';
import { getFeaturedProducts } from '../data/products';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } } };

const Home = () => {
  const { lang } = useLang();
  const featured = getFeaturedProducts();

  const trustBadges = [
    { icon: <FaLeaf size={22} />, title: tx(t.trust.organic, lang), desc: tx(t.trust.organicDesc, lang), color: 'group-hover:bg-green-500' },
    { icon: <FaTruck size={22} />, title: tx(t.trust.shipping, lang), desc: tx(t.trust.shippingDesc, lang), color: 'group-hover:bg-blue-500' },
    { icon: <FaShieldAlt size={22} />, title: tx(t.trust.returns, lang), desc: tx(t.trust.returnsDesc, lang), color: 'group-hover:bg-amber-500' },
    { icon: <FaSmile size={22} />, title: tx(t.trust.happy, lang), desc: tx(t.trust.happyDesc, lang), color: 'group-hover:bg-purple-500' },
  ];

  return (
    <div className="bg-brand-cream overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1606491956689-2ea866880049?q=80&w=2000&auto=format&fit=crop"
            alt="Maharashtrian sweets"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-brand-dark/60 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <motion.div className="max-w-2xl" variants={stagger} initial="hidden" animate="visible">
            <motion.span variants={fadeUp} className="inline-block bg-white/15 text-white/90 text-sm md:text-base font-medium px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm border border-white/10">
              {tx(t.home.badge, lang)}
            </motion.span>
            <motion.h1 variants={fadeUp} className="font-display font-bold text-white leading-[1.08] mb-6" style={{ fontSize: 'clamp(2.25rem, 6vw, 4rem)' }}>
              {tx(t.home.heroTitle1, lang)}<br />
              <span className="text-brand-orange">{tx(t.home.heroTitle2, lang)}</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/85 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              {tx(t.home.heroDesc, lang)}
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 sm:gap-4">
              <Link to="/catalog">
                <Button size="lg" className="w-full sm:w-auto group glow-hover">
                  {tx(t.home.shopNow, lang)} <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="ghost" className="w-full sm:w-auto text-white border border-white/30 hover:bg-white/15 hover:border-white/50">
                  {tx(t.home.ourStory, lang)}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <motion.div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 hidden md:block" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}>
          <FiChevronDown size={24} />
        </motion.div>
      </section>

      {/* ── Trust Badges ── */}
      <section className="py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 stagger-fade">
          {trustBadges.map((badge, idx) => (
            <div key={idx} className="card-hover bg-white rounded-2xl p-4 md:p-5 text-center shadow-soft border border-brand-gray/30 group h-full cursor-default">
              <div className={`w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green mx-auto mb-3 ${badge.color} group-hover:text-white transition-all duration-300`}>
                {badge.icon}
              </div>
              <h3 className="font-semibold text-brand-dark text-sm mb-1 group-hover:text-brand-green transition-colors duration-200">{badge.title}</h3>
              <p className="text-brand-dark/60 text-xs">{badge.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn preset="fadeUp" className="text-center mb-8 md:mb-12">
            <h2 className="font-display font-bold text-brand-dark mb-3" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
              {tx(t.home.curatedTitle, lang)}
            </h2>
            <p className="text-brand-dark/70 max-w-2xl mx-auto text-base">
              {tx(t.home.curatedDesc, lang)}
            </p>
          </AnimateIn>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 stagger-fade">
            {featured.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <AnimateIn preset="fadeUp" delay={0.3} className="text-center mt-8 md:mt-10">
            <Link to="/catalog">
              <Button variant="outline" className="group glow-hover">
                {tx(t.home.viewAllProducts, lang)} <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </Link>
          </AnimateIn>
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateIn preset="fadeUp">
            <div className="flex justify-center gap-1 text-brand-orange mb-4">
              {[...Array(5)].map((_, i) => <FiStar key={i} size={18} className="fill-current" />)}
            </div>
            <blockquote className="font-display text-brand-dark italic mb-5 leading-relaxed" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.35rem)' }}>
              {lang === 'mr'
                ? '"आईच्या हातच्या लाडवांसारखी चव! Natura चे लाडू खाल्ल्यावर बालपणीच्या आठवणी ताज्या झाल्या. खूपच शुद्ध आणि ताजे."'
                : '"Tastes exactly like my mother used to make! Natura\'s ladoos brought back childhood memories. Incredibly pure and fresh."'
              }
            </blockquote>
            <p className="font-semibold text-brand-dark text-sm">{lang === 'mr' ? '— मीरा जोशी, पुणे' : '— Meera Joshi, Pune'}</p>
          </AnimateIn>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <AnimateIn preset="scaleIn">
        <section className="py-14 md:py-20 bg-brand-green mx-3 sm:mx-6 lg:mx-8 my-6 md:my-8 rounded-2xl md:rounded-3xl relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/5 rounded-full" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-white/5 rounded-full" />
          <div className="max-w-3xl mx-auto px-5 md:px-8 text-center space-y-6 relative z-10">
            <h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
              {tx(t.home.bannerTitle, lang)}
            </h2>
            <p className="text-white/80 text-base max-w-xl mx-auto">
              {tx(t.home.bannerDesc, lang)}
            </p>
            <Link to="/about" className="block sm:inline-block">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto px-10 mt-2 glow-hover">
                {tx(t.home.discoverStandards, lang)}
              </Button>
            </Link>
          </div>
        </section>
      </AnimateIn>
    </div>
  );
};

export default Home;
