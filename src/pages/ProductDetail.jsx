import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import Button from '../components/ui/Button';
import AnimateIn from '../components/ui/AnimateIn';
import { FiMinus, FiPlus, FiStar, FiTruck, FiShield, FiCheck, FiChevronDown } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { useLang } from '../context/LanguageContext';
import t, { tx } from '../data/translations';
import { getProductById, getProductText } from '../data/products';

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { lang } = useLang();
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [activeAccordion, setActiveAccordion] = useState('description');
    const [activeImageIdx, setActiveImageIdx] = useState(0);

    const product = getProductById(id);
    const name = getProductText(product, 'name', lang);
    const description = getProductText(product, 'description', lang);
    const ingredientsList = product.ingredients?.[lang] || product.ingredients?.en || [];
    const productImages = [product.image, product.image, product.image];

    const TABS = [
        { id: 'description', label: tx(t.product.description, lang) },
        { id: 'ingredients', label: tx(t.product.ingredients, lang) },
        { id: 'shipping', label: tx(t.product.shipping, lang) },
    ];

    const handleAddToCart = () => {
        dispatch(addToCart({ ...product, name, quantity }));
        toast.success(lang === 'mr' ? `${name} कार्टमध्ये जोडले!` : `${name} added to cart!`, {
            position: 'bottom-right', autoClose: 2000, hideProgressBar: true,
        });
    };

    const handleInc = () => setQuantity(q => q + 1);
    const handleDec = () => setQuantity(q => Math.max(1, q - 1));

    const TabContent = ({ tabId }) => {
        if (tabId === 'description') return <p className="text-brand-dark/80 leading-relaxed">{description}</p>;
        if (tabId === 'ingredients') return (
            <ul className="list-disc pl-5 space-y-2 text-brand-dark/80">
                {ingredientsList.map((ing, i) => <li key={i}>{ing}</li>)}
            </ul>
        );
        if (tabId === 'shipping') return <p className="text-brand-dark/80 leading-relaxed">{tx(t.product.shippingInfo, lang)}</p>;
        return null;
    };

    return (
        <>
            <div className="bg-brand-cream min-h-screen pb-28 md:pb-16 pt-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20">

                        {/* Image Gallery */}
                        <AnimateIn preset="fadeIn">
                            <div className="space-y-3">
                                <div className="relative bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-soft border border-brand-gray/30 aspect-square">
                                    {product.originalPrice && (
                                        <div className="absolute top-4 left-4 bg-brand-orange text-white text-xs font-bold px-3 py-1.5 rounded-full z-10">
                                            {tx(t.product.sale, lang)}
                                        </div>
                                    )}
                                    <AnimatePresence mode="wait">
                                        <motion.img key={activeImageIdx} src={productImages[activeImageIdx]} alt={name}
                                            className="w-full h-full object-cover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} loading="lazy"
                                        />
                                    </AnimatePresence>
                                </div>
                                <div className="grid grid-cols-4 gap-2 md:gap-3">
                                    {productImages.map((img, i) => (
                                        <button key={i} onClick={() => setActiveImageIdx(i)}
                                            className={`aspect-square rounded-lg md:rounded-xl overflow-hidden border-2 transition-all min-h-[60px] ${activeImageIdx === i ? 'border-brand-green opacity-100' : 'border-transparent opacity-60 hover:opacity-100'} bg-white shadow-sm`}
                                        >
                                            <img src={img} className="w-full h-full object-cover" alt={`View ${i + 1}`} loading="lazy" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </AnimateIn>

                        {/* Product Info */}
                        <AnimateIn preset="fadeUp" delay={0.1}>
                            <div className="flex flex-col py-0 lg:py-4">
                                <h1 className="font-display font-bold text-brand-dark leading-tight mb-3" style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)' }}>
                                    {name}
                                </h1>

                                <div className="flex items-center gap-3 mb-5">
                                    <div className="flex items-center text-yellow-400 gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <FiStar key={i} size={16} className={i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'} />
                                        ))}
                                    </div>
                                    <span className="text-brand-dark font-semibold text-sm">{product.rating}</span>
                                    <span className="text-brand-dark/50 text-sm">{product.reviewCount} {tx(t.product.reviews, lang)}</span>
                                </div>

                                <div className="flex items-end gap-3 mb-5">
                                    <span className="text-3xl font-bold text-brand-dark">₹{product.price}</span>
                                    {product.originalPrice && (
                                        <>
                                            <span className="text-xl text-brand-dark/40 line-through mb-0.5">₹{product.originalPrice}</span>
                                            <span className="text-sm font-semibold text-brand-orange mb-0.5">
                                                {tx(t.product.save, lang)} ₹{product.originalPrice - product.price}
                                            </span>
                                        </>
                                    )}
                                </div>

                                <p className="text-brand-dark/80 leading-relaxed mb-6 text-base">{description}</p>

                                {/* Desktop Add to Cart */}
                                <div className="hidden md:block bg-white rounded-2xl p-5 shadow-soft border border-brand-gray/30 mb-6">
                                    <div className="flex items-center gap-2 text-brand-green mb-4">
                                        <FiCheck size={18} />
                                        <span className="font-medium text-sm">{tx(t.product.inStock, lang)}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center bg-brand-cream rounded-full border border-brand-gray">
                                            <button onClick={handleDec} className="w-11 h-11 flex items-center justify-center text-brand-dark hover:text-brand-green transition-colors" aria-label="Decrease"><FiMinus size={16} /></button>
                                            <span className="w-8 text-center font-semibold text-base">{quantity}</span>
                                            <button onClick={handleInc} className="w-11 h-11 flex items-center justify-center text-brand-dark hover:text-brand-green transition-colors" aria-label="Increase"><FiPlus size={16} /></button>
                                        </div>
                                        <Button size="lg" className="flex-1 text-base" onClick={handleAddToCart}>
                                            {tx(t.product.addToCart, lang)} — ₹{product.price * quantity}
                                        </Button>
                                    </div>
                                </div>

                                {/* Trust */}
                                <div className="grid grid-cols-2 gap-3 md:gap-4">
                                    <div className="flex items-start gap-3 bg-white rounded-xl p-3 md:p-0 md:bg-transparent border border-brand-gray/30 md:border-0">
                                        <div className="w-9 h-9 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green shrink-0"><FiTruck size={16} /></div>
                                        <div>
                                            <h4 className="font-semibold text-brand-dark text-sm">{tx(t.product.freeDelivery, lang)}</h4>
                                            <p className="text-xs text-brand-dark/60">{tx(t.product.ordersOver, lang)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 bg-white rounded-xl p-3 md:p-0 md:bg-transparent border border-brand-gray/30 md:border-0">
                                        <div className="w-9 h-9 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green shrink-0"><FiShield size={16} /></div>
                                        <div>
                                            <h4 className="font-semibold text-brand-dark text-sm">{tx(t.product.qualityGuaranteed, lang)}</h4>
                                            <p className="text-xs text-brand-dark/60">{tx(t.product.dayRefunds, lang)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AnimateIn>
                    </div>

                    {/* Desktop Tabs */}
                    <div className="mt-16 pt-10 border-t border-brand-gray hidden md:block">
                        <div className="flex gap-8 border-b border-brand-gray mb-8">
                            {TABS.map(tab => (
                                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                                    className={`capitalize pb-4 text-base font-medium transition-colors relative ${activeTab === tab.id ? 'text-brand-green' : 'text-brand-dark/50 hover:text-brand-dark'}`}
                                >
                                    {tab.label}
                                    {activeTab === tab.id && (
                                        <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-green rounded-full" transition={{ type: 'spring', stiffness: 500, damping: 35 }} />
                                    )}
                                </button>
                            ))}
                        </div>
                        <AnimatePresence mode="wait">
                            <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="max-w-3xl">
                                <TabContent tabId={activeTab} />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Mobile Accordion */}
                    <div className="mt-10 md:hidden border-t border-brand-gray divide-y divide-brand-gray">
                        {TABS.map(tab => (
                            <div key={tab.id}>
                                <button onClick={() => setActiveAccordion(activeAccordion === tab.id ? null : tab.id)} className="w-full flex items-center justify-between py-4 text-left min-h-[52px]">
                                    <span className={`font-semibold text-base ${activeAccordion === tab.id ? 'text-brand-green' : 'text-brand-dark'}`}>{tab.label}</span>
                                    <motion.span animate={{ rotate: activeAccordion === tab.id ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                        <FiChevronDown className="text-brand-green" size={20} />
                                    </motion.span>
                                </button>
                                <AnimatePresence initial={false}>
                                    {activeAccordion === tab.id && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                                            <div className="pb-5"><TabContent tabId={tab.id} /></div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile Sticky CTA */}
            <motion.div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-brand-gray/60 px-4 py-3 shadow-premium"
                style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }} initial={{ y: 100 }} animate={{ y: 0 }} transition={{ type: 'spring', damping: 25, stiffness: 300, delay: 0.3 }}
            >
                <div className="flex items-center gap-3 max-w-lg mx-auto">
                    <div className="flex items-center bg-brand-cream rounded-full border border-brand-gray shrink-0">
                        <button onClick={handleDec} className="w-11 h-11 flex items-center justify-center text-brand-dark hover:text-brand-green transition-colors" aria-label="Decrease"><FiMinus size={15} /></button>
                        <span className="w-7 text-center font-semibold text-sm">{quantity}</span>
                        <button onClick={handleInc} className="w-11 h-11 flex items-center justify-center text-brand-dark hover:text-brand-green transition-colors" aria-label="Increase"><FiPlus size={15} /></button>
                    </div>
                    <Button size="md" className="flex-1 text-sm font-semibold" onClick={handleAddToCart}>
                        {tx(t.product.addToCart, lang)} — ₹{product.price * quantity}
                    </Button>
                </div>
            </motion.div>
        </>
    );
};

export default ProductDetail;
