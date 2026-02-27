import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import AnimateIn from '../components/ui/AnimateIn';
import { FiCheckCircle, FiShield, FiChevronDown } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import t, { tx } from '../data/translations';

const inputClass = 'w-full px-4 py-3.5 rounded-xl border border-brand-gray bg-brand-offWhite focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/50 transition-colors text-brand-dark placeholder-brand-dark/40 text-base';
const labelClass = 'block text-sm font-medium text-brand-dark/70 mb-1.5';
const stepVariants = { enter: (d) => ({ x: d > 0 ? 60 : -60, opacity: 0 }), center: { x: 0, opacity: 1 }, exit: (d) => ({ x: d > 0 ? -60 : 60, opacity: 0 }) };

const Checkout = () => {
    const { items, totalAmount } = useSelector(state => state.cart);
    const navigate = useNavigate();
    const { lang } = useLang();
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isSummaryOpen, setIsSummaryOpen] = useState(false);

    const tax = totalAmount * 0.05;
    const shipping = totalAmount > 500 ? 0 : 49;
    const finalTotal = totalAmount + tax + (totalAmount > 0 ? shipping : 0);

    const handleCheckout = (e) => {
        e.preventDefault();
        if (step === 1) { setDirection(1); setStep(2); window.scrollTo({ top: 0, behavior: 'smooth' }); }
        else { setIsLoading(true); setTimeout(() => { setIsLoading(false); setIsSuccess(true); }, 2000); }
    };
    const goBack = () => { setDirection(-1); setStep(1); };

    if (isSuccess) {
        return (
            <motion.div className="bg-brand-cream min-h-[80vh] flex flex-col items-center justify-center p-6 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <motion.div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}>
                    <FiCheckCircle size={40} />
                </motion.div>
                <motion.h1 className="font-display font-bold text-brand-dark mb-4" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    {tx(t.checkout.successTitle, lang)}
                </motion.h1>
                <motion.p className="text-brand-dark/70 text-base md:text-lg mb-8 max-w-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    {tx(t.checkout.successDesc, lang)}
                </motion.p>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                    <Button onClick={() => navigate('/')} size="lg" className="w-full sm:w-auto">{tx(t.checkout.returnHome, lang)}</Button>
                </motion.div>
            </motion.div>
        );
    }

    const SummaryRows = () => (
        <div className="space-y-2.5 text-sm">
            <div className="flex justify-between text-brand-dark/70"><span>{tx(t.cart.subtotal, lang)}</span><span className="font-medium text-brand-dark">₹{totalAmount.toFixed(2)}</span></div>
            <div className="flex justify-between text-brand-dark/70"><span>{tx(t.cart.tax, lang)}</span><span>₹{tax.toFixed(2)}</span></div>
            <div className="flex justify-between text-brand-dark/70"><span>{tx(t.cart.shipping, lang)}</span><span>{shipping === 0 ? <span className="text-brand-green font-medium">{tx(t.cart.free, lang)}</span> : `₹${shipping}`}</span></div>
        </div>
    );

    return (
        <div className="bg-brand-cream min-h-screen py-8 md:py-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimateIn preset="fadeIn">
                    <div className="flex items-center justify-center gap-3 mb-8 md:mb-12">
                        {[{ num: 1, label: tx(t.checkout.shipping, lang) }, { num: 2, label: tx(t.checkout.payment, lang) }].map((s, idx) => (
                            <React.Fragment key={s.num}>
                                <div className={`flex items-center gap-2 ${step >= s.num ? 'text-brand-green' : 'text-brand-dark/40'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= s.num ? 'bg-brand-green text-white' : 'bg-brand-gray text-brand-dark/40'}`}>{s.num}</div>
                                    <span className="font-semibold text-sm md:text-base">{s.label}</span>
                                </div>
                                {idx === 0 && <div className="h-px w-10 md:w-16 bg-brand-gray overflow-hidden rounded-full"><motion.div className="h-full bg-brand-green" animate={{ width: step > 1 ? '100%' : '0%' }} transition={{ duration: 0.4 }} /></div>}
                            </React.Fragment>
                        ))}
                    </div>
                </AnimateIn>
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                    <div className="flex-1 min-w-0">
                        <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-soft border border-brand-gray/30">
                            <form onSubmit={handleCheckout}>
                                <AnimatePresence mode="wait" custom={direction}>
                                    {step === 1 && (
                                        <motion.div key="s1" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }} className="space-y-5">
                                            <h2 className="font-display font-semibold text-xl md:text-2xl mb-5">{tx(t.checkout.deliveryInfo, lang)}</h2>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div><label className={labelClass}>{tx(t.checkout.firstName, lang)}</label><input required type="text" autoComplete="given-name" className={inputClass} /></div>
                                                <div><label className={labelClass}>{tx(t.checkout.lastName, lang)}</label><input required type="text" autoComplete="family-name" className={inputClass} /></div>
                                                <div className="sm:col-span-2"><label className={labelClass}>{tx(t.checkout.email, lang)}</label><input required type="email" autoComplete="email" inputMode="email" className={inputClass} /></div>
                                                <div className="sm:col-span-2"><label className={labelClass}>{tx(t.checkout.phone, lang)}</label><input type="tel" autoComplete="tel" inputMode="tel" className={inputClass} /></div>
                                                <div className="sm:col-span-2"><label className={labelClass}>{tx(t.checkout.address, lang)}</label><input required type="text" autoComplete="street-address" className={inputClass} /></div>
                                                <div><label className={labelClass}>{tx(t.checkout.city, lang)}</label><input required type="text" autoComplete="address-level2" className={inputClass} /></div>
                                                <div><label className={labelClass}>{tx(t.checkout.postalCode, lang)}</label><input required type="text" autoComplete="postal-code" inputMode="numeric" className={inputClass} /></div>
                                            </div>
                                        </motion.div>
                                    )}
                                    {step === 2 && (
                                        <motion.div key="s2" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }} className="space-y-5">
                                            <div className="flex flex-wrap justify-between items-center gap-3 mb-5">
                                                <h2 className="font-display font-semibold text-xl md:text-2xl">{tx(t.checkout.paymentDetails, lang)}</h2>
                                                <span className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg border border-blue-200 font-bold tracking-wide">RAZORPAY</span>
                                            </div>
                                            <div className="border border-brand-gray rounded-2xl p-5 bg-brand-offWhite/50 relative overflow-hidden">
                                                <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none"><FiShield size={80} /></div>
                                                <div className="relative z-10 space-y-4">
                                                    <p className="text-sm text-brand-dark/70">{tx(t.checkout.razorpayNote, lang)}</p>
                                                    <div className="p-4 bg-white rounded-xl border border-brand-gray shadow-sm">
                                                        <div className="flex justify-between items-center">
                                                            <span className="font-medium text-brand-dark">{tx(t.checkout.amountToPay, lang)}</span>
                                                            <span className="font-bold font-display text-xl text-brand-green">₹{finalTotal.toFixed(2)}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-brand-dark/50"><FiShield size={12} /><span>{tx(t.checkout.secureNote, lang)}</span></div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                <div className="mt-6 pt-5 border-t border-brand-gray flex gap-3">
                                    {step === 2 && <Button variant="outline" type="button" onClick={goBack}>{tx(t.checkout.back, lang)}</Button>}
                                    <Button type="submit" className={step === 1 ? 'w-full' : 'flex-1'} size="lg" isLoading={isLoading} disabled={isLoading}>
                                        {isLoading ? tx(t.checkout.processing, lang) : step === 1 ? tx(t.checkout.continueToPay, lang) : `${tx(t.checkout.pay, lang)} ₹${finalTotal.toFixed(2)}`}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="w-full lg:w-80 shrink-0">
                        <div className="lg:hidden bg-white rounded-2xl border border-brand-gray/50 overflow-hidden shadow-soft">
                            <button type="button" onClick={() => setIsSummaryOpen(!isSummaryOpen)} className="w-full flex items-center justify-between px-5 py-4 min-h-[52px]">
                                <span className="font-display font-semibold text-brand-dark">{tx(t.cart.orderSummary, lang)}</span>
                                <div className="flex items-center gap-2"><span className="font-bold text-brand-dark text-sm">₹{finalTotal.toFixed(2)}</span><motion.span animate={{ rotate: isSummaryOpen ? 180 : 0 }}><FiChevronDown className="text-brand-green" size={18} /></motion.span></div>
                            </button>
                            <AnimatePresence initial={false}>
                                {isSummaryOpen && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                                        <div className="px-5 pb-4 pt-1 border-t border-brand-gray/50">
                                            <SummaryRows />
                                            <div className="flex justify-between font-bold text-brand-dark text-base pt-3 mt-3 border-t border-brand-gray"><span>{tx(t.cart.total, lang)}</span><span>₹{finalTotal.toFixed(2)}</span></div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <div className="hidden lg:block bg-brand-gray/20 rounded-3xl p-6 border border-brand-gray/50 sticky top-[80px]">
                            <h3 className="font-display font-semibold text-lg mb-5">{tx(t.cart.orderSummary, lang)}</h3>
                            <SummaryRows />
                            <div className="flex justify-between font-bold text-brand-dark text-lg pt-4 mt-4 border-t border-brand-gray"><span>{tx(t.cart.total, lang)}</span><span>₹{finalTotal.toFixed(2)}</span></div>
                            {items.length > 0 && (
                                <div className="mt-5 pt-4 border-t border-brand-gray space-y-3">
                                    {items.map(item => (
                                        <div key={item.id} className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-brand-cream shrink-0"><img src={item.image} alt={item.name} className="w-full h-full object-cover" /></div>
                                            <div className="flex-1 min-w-0"><p className="text-sm font-medium text-brand-dark leading-snug line-clamp-2">{item.name}</p><p className="text-xs text-brand-dark/50 mt-0.5">Qty: {item.quantity}</p></div>
                                            <span className="text-sm font-semibold text-brand-dark shrink-0">₹{item.totalPrice.toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
