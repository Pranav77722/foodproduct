import React, { useState } from 'react';
import AnimateIn from '../components/ui/AnimateIn';
import Button from '../components/ui/Button';
import { FiMail, FiPhone, FiMapPin, FiClock, FiChevronDown, FiSend } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { useLang } from '../context/LanguageContext';
import t, { tx } from '../data/translations';

const inputClass = 'w-full px-4 py-3.5 rounded-xl border border-brand-gray bg-brand-offWhite focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/50 transition-colors text-brand-dark placeholder-brand-dark/40 text-base';

const Contact = () => {
    const [openFaq, setOpenFaq] = useState(null);
    const [errors, setErrors] = useState({});
    const { lang } = useLang();

    const CONTACT_INFO = [
        { icon: <FiMail size={20} />, label: tx(t.contact.emailUs, lang), value: 'hello@natura.com', link: 'mailto:hello@natura.com' },
        { icon: <FiPhone size={20} />, label: tx(t.contact.callUs, lang), value: '+91 98765 43210', link: 'tel:+919876543210' },
        { icon: <FiMapPin size={20} />, label: tx(t.contact.visitUs, lang), value: lang === 'mr' ? 'पुणे, महाराष्ट्र, भारत' : 'Pune, Maharashtra, India', link: '#' },
        { icon: <FiClock size={20} />, label: tx(t.contact.hours, lang), value: tx(t.contact.hoursValue, lang), link: null },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const data = Object.fromEntries(form);
        const newErrors = {};
        if (!data.name?.trim()) newErrors.name = tx(t.contact.nameRequired, lang);
        if (!data.email?.trim()) newErrors.email = tx(t.contact.emailRequired, lang);
        else if (!/\S+@\S+\.\S+/.test(data.email)) newErrors.email = tx(t.contact.validEmail, lang);
        if (!data.message?.trim()) newErrors.message = tx(t.contact.messageRequired, lang);
        if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
        setErrors({});
        toast.success(tx(t.contact.messageSent, lang), { position: 'bottom-right', autoClose: 3000, hideProgressBar: true });
        e.target.reset();
    };

    return (
        <div className="bg-brand-cream min-h-screen overflow-x-hidden">
            <section className="relative py-14 md:py-20 overflow-hidden bg-brand-green">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <h1 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>{tx(t.contact.heroTitle, lang)}</h1>
                        <p className="text-white/85 max-w-xl text-base md:text-lg leading-relaxed">{tx(t.contact.heroDesc, lang)}</p>
                    </motion.div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10 mb-12 md:mb-16">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    {CONTACT_INFO.map((info, idx) => (
                        <AnimateIn key={idx} preset="fadeUp" delay={idx * 0.06}>
                            <div className="bg-white rounded-2xl p-4 md:p-5 shadow-soft border border-brand-gray/30 text-center group hover:shadow-premium transition-shadow h-full flex flex-col items-center">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-cream flex items-center justify-center text-brand-green mb-3 group-hover:bg-brand-green group-hover:text-white transition-colors">{info.icon}</div>
                                <h3 className="font-semibold text-brand-dark text-xs md:text-sm">{info.label}</h3>
                                {info.link ? <a href={info.link} className="text-brand-dark/70 text-xs md:text-sm hover:text-brand-green transition-colors mt-1 break-all">{info.value}</a> : <span className="text-brand-dark/70 text-xs md:text-sm mt-1">{info.value}</span>}
                            </div>
                        </AnimateIn>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                <AnimateIn preset="slideRight">
                    <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-soft border border-brand-gray/30">
                        <h2 className="font-display font-bold text-brand-dark mb-1.5" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)' }}>{tx(t.contact.formTitle, lang)}</h2>
                        <p className="text-brand-dark/60 text-sm mb-6">{tx(t.contact.formDesc, lang)}</p>
                        <form onSubmit={handleSubmit} noValidate className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-brand-dark/70 mb-1.5">{tx(t.contact.fullName, lang)}</label>
                                    <input name="name" type="text" autoComplete="name" className={`${inputClass} ${errors.name ? '!border-red-400 ring-1 ring-red-300' : ''}`} />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-brand-dark/70 mb-1.5">{tx(t.contact.emailLabel, lang)}</label>
                                    <input name="email" type="email" autoComplete="email" inputMode="email" className={`${inputClass} ${errors.email ? '!border-red-400 ring-1 ring-red-300' : ''}`} />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-brand-dark/70 mb-1.5">{tx(t.contact.subject, lang)}</label>
                                <input name="subject" type="text" className={inputClass} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-brand-dark/70 mb-1.5">{tx(t.contact.message, lang)}</label>
                                <textarea name="message" rows={5} className={`${inputClass} resize-none ${errors.message ? '!border-red-400 ring-1 ring-red-300' : ''}`} />
                                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                            </div>
                            <Button type="submit" size="lg" className="w-full mt-2">{tx(t.contact.send, lang)}</Button>
                        </form>
                    </div>
                </AnimateIn>

                <AnimateIn preset="slideLeft">
                    <div>
                        <h2 className="font-display font-bold text-brand-dark mb-1.5" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)' }}>{tx(t.contact.faqTitle, lang)}</h2>
                        <p className="text-brand-dark/60 text-sm mb-6">{tx(t.contact.faqDesc, lang)}</p>
                        <div className="space-y-3">
                            {t.faqs.map((faq, idx) => (
                                <div key={idx} className="bg-white rounded-xl shadow-soft border border-brand-gray/30 overflow-hidden">
                                    <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full flex items-center justify-between px-5 py-4 text-left min-h-[52px] group">
                                        <span className={`font-semibold text-sm md:text-base pr-3 transition-colors ${openFaq === idx ? 'text-brand-green' : 'text-brand-dark group-hover:text-brand-green'}`}>
                                            {tx(faq.q, lang)}
                                        </span>
                                        <motion.span className="shrink-0" animate={{ rotate: openFaq === idx ? 180 : 0 }} transition={{ duration: 0.2 }}><FiChevronDown className="text-brand-green" size={18} /></motion.span>
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {openFaq === idx && (
                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                                                <div className="px-5 pb-4 text-brand-dark/70 text-sm leading-relaxed border-t border-brand-gray/50 pt-3">{tx(faq.a, lang)}</div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimateIn>
            </div>
        </div>
    );
};

export default Contact;
