import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';
import Button from '../components/ui/Button';
import AnimateIn from '../components/ui/AnimateIn';
import { FiTrash2, FiMinus, FiPlus, FiArrowRight, FiShoppingCart, FiShield, FiChevronDown } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { useLang } from '../context/LanguageContext';
import t, { tx } from '../data/translations';

const Cart = () => {
    const { items, totalAmount } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { lang } = useLang();
    const [isSummaryOpen, setIsSummaryOpen] = useState(false);

    const handleUpdateQuantity = (id, newQuantity) => {
        if (newQuantity > 0) dispatch(updateQuantity({ id, quantity: newQuantity }));
    };

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
        toast(lang === 'mr' ? 'वस्तू कार्टमधून काढली' : 'Item removed from cart', { position: 'bottom-right', autoClose: 2000, hideProgressBar: true });
    };

    const tax = totalAmount * 0.05;
    const shipping = totalAmount > 500 ? 0 : 49;
    const finalTotal = totalAmount + tax + (totalAmount > 0 ? shipping : 0);

    const SummaryContent = () => (
        <div className="space-y-2.5 text-sm">
            <div className="flex justify-between text-brand-dark/70">
                <span>{tx(t.cart.subtotal, lang)}</span>
                <span className="font-medium text-brand-dark">₹{totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-brand-dark/70">
                <span>{tx(t.cart.tax, lang)}</span>
                <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-brand-dark/70">
                <span>{tx(t.cart.shipping, lang)}</span>
                <span>{shipping === 0 ? <span className="text-brand-green font-medium">{tx(t.cart.free, lang)}</span> : `₹${shipping}`}</span>
            </div>
        </div>
    );

    if (items.length === 0) {
        return (
            <motion.div className="bg-brand-cream min-h-[80vh] flex flex-col items-center justify-center p-6 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}>
                    <FiShoppingCart size={56} className="text-brand-dark/15 mx-auto mb-6" />
                </motion.div>
                <h1 className="font-display font-bold text-brand-dark mb-3" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>{tx(t.cart.emptyTitle, lang)}</h1>
                <p className="text-brand-dark/60 text-base md:text-lg mb-8 max-w-md">{tx(t.cart.emptyDesc, lang)}</p>
                <Button onClick={() => navigate('/catalog')} size="lg" className="w-full sm:w-auto">
                    {tx(t.cart.startShopping, lang)} <FiArrowRight className="ml-2" />
                </Button>
            </motion.div>
        );
    }

    return (
        <div className="bg-brand-cream min-h-screen py-8 md:py-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimateIn preset="fadeUp">
                    <h1 className="font-display font-bold text-brand-dark mb-8" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
                        {tx(t.cart.title, lang)} <span className="text-brand-dark/40 font-normal text-lg md:text-xl">({items.length} {items.length === 1 ? tx(t.cart.item, lang) : tx(t.cart.items, lang)})</span>
                    </h1>
                </AnimateIn>
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                    <div className="flex-1 min-w-0 space-y-4">
                        <AnimatePresence>
                            {items.map(item => (
                                <motion.div key={item.id} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40, height: 0, marginBottom: 0, padding: 0 }} transition={{ duration: 0.3 }}
                                    className="bg-white rounded-2xl p-4 md:p-5 shadow-soft border border-brand-gray/30"
                                >
                                    <div className="flex gap-4">
                                        <Link to={`/product/${item.id}`} className="shrink-0">
                                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-brand-cream">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                                            </div>
                                        </Link>
                                        <div className="flex-1 min-w-0 flex flex-col">
                                            <div className="flex justify-between gap-2 mb-2">
                                                <Link to={`/product/${item.id}`} className="font-semibold text-brand-dark text-sm md:text-base truncate hover:text-brand-green transition-colors">{item.name}</Link>
                                                <span className="font-bold text-brand-dark shrink-0">₹{item.totalPrice.toFixed(2)}</span>
                                            </div>
                                            <p className="text-xs text-brand-dark/50 mb-3">₹{item.price} {tx(t.cart.each, lang)}</p>
                                            <div className="flex items-center justify-between mt-auto gap-3">
                                                <div className="flex items-center bg-brand-cream rounded-full border border-brand-gray">
                                                    <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} className="w-9 h-9 flex items-center justify-center text-brand-dark hover:text-brand-green transition-colors"><FiMinus size={14} /></button>
                                                    <span className="w-7 text-center font-semibold text-sm">{item.quantity}</span>
                                                    <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} className="w-9 h-9 flex items-center justify-center text-brand-dark hover:text-brand-green transition-colors"><FiPlus size={14} /></button>
                                                </div>
                                                <motion.button whileTap={{ scale: 0.9 }} onClick={() => handleRemove(item.id)}
                                                    className="p-2 text-brand-dark/40 hover:text-red-500 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                                                ><FiTrash2 size={18} /></motion.button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    <div className="w-full lg:w-80 shrink-0">
                        <div className="lg:hidden bg-white rounded-2xl border border-brand-gray/50 overflow-hidden shadow-soft">
                            <button type="button" onClick={() => setIsSummaryOpen(!isSummaryOpen)} className="w-full flex items-center justify-between px-5 py-4 min-h-[52px]">
                                <span className="font-display font-semibold text-brand-dark">{tx(t.cart.orderSummary, lang)}</span>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-brand-dark text-sm">₹{finalTotal.toFixed(2)}</span>
                                    <motion.span animate={{ rotate: isSummaryOpen ? 180 : 0 }} transition={{ duration: 0.2 }}><FiChevronDown className="text-brand-green" size={18} /></motion.span>
                                </div>
                            </button>
                            <AnimatePresence initial={false}>
                                {isSummaryOpen && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                                        <div className="px-5 pb-4 pt-1 border-t border-brand-gray/50">
                                            <SummaryContent />
                                            <div className="flex justify-between font-bold text-brand-dark text-base pt-3 mt-3 border-t border-brand-gray"><span>{tx(t.cart.total, lang)}</span><span>₹{finalTotal.toFixed(2)}</span></div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <div className="hidden lg:block bg-brand-gray/20 rounded-3xl p-6 border border-brand-gray/50 sticky top-[80px]">
                            <h3 className="font-display font-semibold text-lg mb-5">{tx(t.cart.orderSummary, lang)}</h3>
                            <SummaryContent />
                            <div className="flex justify-between font-bold text-brand-dark text-lg pt-4 mt-4 border-t border-brand-gray"><span>{tx(t.cart.total, lang)}</span><span>₹{finalTotal.toFixed(2)}</span></div>
                        </div>
                        <div className="mt-5 space-y-3">
                            <Button onClick={() => navigate('/checkout')} fullWidth size="lg">{tx(t.cart.checkout, lang)} <FiArrowRight className="ml-2" /></Button>
                            <Button onClick={() => navigate('/catalog')} variant="ghost" fullWidth>{tx(t.cart.continueShopping, lang)}</Button>
                        </div>
                        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-brand-dark/40"><FiShield size={14} /> {tx(t.cart.secureCheckout, lang)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
