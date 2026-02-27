import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ui/ProductCard';
import AnimateIn from '../components/ui/AnimateIn';
import Button from '../components/ui/Button';
import { FiSliders, FiX, FiChevronDown } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import t, { tx } from '../data/translations';
import PRODUCTS from '../data/products';

const PRICE_RANGES = [
    { label: { en: 'Under ₹200', mr: '₹२०० खालील' }, min: 0, max: 200 },
    { label: { en: '₹200 – ₹400', mr: '₹२०० – ₹४००' }, min: 200, max: 400 },
    { label: { en: 'Over ₹400', mr: '₹४०० वरील' }, min: 400, max: Infinity },
];

const Catalog = () => {
    const { lang } = useLang();
    const [activeCategory, setActiveCategory] = useState('all');
    const [activePriceRange, setActivePriceRange] = useState(null);
    const [sortOpen, setSortOpen] = useState(false);
    const [sortBy, setSortBy] = useState('featured');
    const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

    const categoryKeys = ['all', 'sweets', 'snacks', 'spices', 'drinks', 'staples'];

    const filtered = useMemo(() => {
        let list = [...PRODUCTS];
        if (activeCategory !== 'all') list = list.filter(p => p.category === activeCategory);
        if (activePriceRange !== null) {
            const range = PRICE_RANGES[activePriceRange];
            list = list.filter(p => p.price >= range.min && p.price < range.max);
        }
        if (sortBy === 'priceLow') list.sort((a, b) => a.price - b.price);
        else if (sortBy === 'priceHigh') list.sort((a, b) => b.price - a.price);
        else if (sortBy === 'topRated') list.sort((a, b) => b.rating - a.rating);
        return list;
    }, [activeCategory, activePriceRange, sortBy]);

    const FilterPanel = ({ mobile = false }) => (
        <div className="space-y-6">
            <div>
                <h4 className="text-sm font-bold text-brand-dark/90 mb-3">{tx(t.catalog.categories, lang)}</h4>
                <div className={`flex ${mobile ? 'flex-wrap' : 'flex-col'} gap-1.5`}>
                    {categoryKeys.map(key => (
                        <button
                            key={key}
                            onClick={() => { setActiveCategory(key); if (mobile) setFilterDrawerOpen(false); }}
                            className={`px-3.5 py-2 rounded-lg text-sm font-medium text-left transition-colors min-h-[40px] ${activeCategory === key
                                    ? 'bg-brand-green text-white'
                                    : 'text-brand-dark/70 hover:bg-brand-cream'
                                }`}
                        >
                            {tx(t.categories[key], lang)}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <h4 className="text-sm font-bold text-brand-dark/90 mb-3">{tx(t.catalog.priceRange, lang)}</h4>
                <div className={`flex ${mobile ? 'flex-wrap' : 'flex-col'} gap-1.5`}>
                    {PRICE_RANGES.map((range, idx) => (
                        <button
                            key={idx}
                            onClick={() => { setActivePriceRange(activePriceRange === idx ? null : idx); if (mobile) setFilterDrawerOpen(false); }}
                            className={`px-3.5 py-2 rounded-lg text-sm font-medium text-left transition-colors min-h-[40px] ${activePriceRange === idx
                                    ? 'bg-brand-green text-white'
                                    : 'text-brand-dark/70 hover:bg-brand-cream'
                                }`}
                        >
                            {tx(range.label, lang)}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-brand-cream min-h-screen py-8 md:py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <AnimateIn preset="fadeUp" className="mb-8 md:mb-10">
                    <span className="text-xs font-bold text-brand-green bg-brand-green/10 px-3 py-1.5 rounded-full uppercase tracking-wider">
                        {tx(t.catalog.badge, lang)}
                    </span>
                    <h1 className="font-display font-bold text-brand-dark mt-4 mb-3" style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}>
                        {tx(t.catalog.title, lang)}
                    </h1>
                    <p className="text-brand-dark/70 text-base max-w-2xl">{tx(t.catalog.desc, lang)}</p>
                </AnimateIn>

                <div className="flex gap-8 lg:gap-10">
                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-56 shrink-0">
                        <div className="sticky top-[88px] bg-white rounded-2xl p-5 shadow-soft border border-brand-gray/30">
                            <FilterPanel />
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        {/* Toolbar */}
                        <div className="flex items-center justify-between mb-6 gap-3">
                            <p className="text-sm text-brand-dark/60">
                                {tx(t.catalog.showing, lang)} <strong>{filtered.length}</strong> {tx(t.catalog.products, lang)}
                            </p>
                            <div className="flex items-center gap-2">
                                {/* Mobile filter button */}
                                <button onClick={() => setFilterDrawerOpen(true)} className="lg:hidden flex items-center gap-2 px-3.5 py-2.5 bg-white rounded-xl shadow-soft border border-brand-gray/30 text-sm font-medium min-h-[44px]">
                                    <FiSliders size={16} /> {tx(t.catalog.filters, lang)}
                                </button>
                                {/* Sort */}
                                <div className="relative">
                                    <button onClick={() => setSortOpen(!sortOpen)} className="flex items-center gap-2 px-3.5 py-2.5 bg-white rounded-xl shadow-soft border border-brand-gray/30 text-sm font-medium min-h-[44px]">
                                        {tx(t.sort[sortBy], lang)} <FiChevronDown size={14} />
                                    </button>
                                    <AnimatePresence>
                                        {sortOpen && (
                                            <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.15 }}
                                                className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-premium border border-brand-gray/30 py-1.5 z-20"
                                            >
                                                {['featured', 'priceLow', 'priceHigh', 'topRated'].map(key => (
                                                    <button key={key} onClick={() => { setSortBy(key); setSortOpen(false); }}
                                                        className={`w-full text-left px-4 py-2.5 text-sm min-h-[40px] transition-colors ${sortBy === key ? 'text-brand-green font-semibold bg-brand-cream' : 'text-brand-dark/80 hover:bg-brand-cream'}`}
                                                    >
                                                        {tx(t.sort[key], lang)}
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        {/* Product Grid */}
                        {filtered.length > 0 ? (
                            <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
                                <AnimatePresence>
                                    {filtered.map((product, idx) => (
                                        <motion.div
                                            key={product.id}
                                            layout
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.25, delay: idx * 0.03 }}
                                        >
                                            <ProductCard product={product} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        ) : (
                            <motion.div className="text-center py-20 bg-white rounded-2xl shadow-soft" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <h3 className="font-display font-semibold text-xl text-brand-dark mb-2">{tx(t.catalog.noProducts, lang)}</h3>
                                <p className="text-brand-dark/60 text-sm mb-5">{tx(t.catalog.noProductsDesc, lang)}</p>
                                <Button variant="outline" onClick={() => { setActiveCategory('all'); setActivePriceRange(null); }}>
                                    {tx(t.catalog.clearFilters, lang)}
                                </Button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Filter Drawer */}
            <AnimatePresence>
                {filterDrawerOpen && (
                    <motion.div key="fov" className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setFilterDrawerOpen(false)} />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {filterDrawerOpen && (
                    <motion.div key="fpanel" className="fixed bottom-0 left-0 right-0 z-[70] bg-white rounded-t-3xl shadow-2xl lg:hidden max-h-[75vh] overflow-y-auto"
                        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}
                    >
                        <div className="flex items-center justify-between px-5 py-4 border-b border-brand-gray/40 sticky top-0 bg-white rounded-t-3xl z-10">
                            <h3 className="font-display font-semibold text-lg">{tx(t.catalog.filters, lang)}</h3>
                            <button onClick={() => setFilterDrawerOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-brand-cream"><FiX size={20} /></button>
                        </div>
                        <div className="px-5 py-5">
                            <FilterPanel mobile />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Catalog;
