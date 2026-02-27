import React from 'react';
import AnimateIn from '../components/ui/AnimateIn';
import Button from '../components/ui/Button';
import { FiAward, FiHeart, FiGlobe, FiThermometer } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import t, { tx } from '../data/translations';

const TEAM = [
    { name: { en: 'Priya Sharma', mr: 'प्रिया शर्मा' }, role: { en: 'Founder & CEO', mr: 'संस्थापक आणि CEO' }, image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop' },
    { name: { en: 'Rajesh Patil', mr: 'राजेश पाटील' }, role: { en: 'Head of Quality', mr: 'गुणवत्ता प्रमुख' }, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop' },
    { name: { en: 'Sneha Kulkarni', mr: 'स्नेहा कुलकर्णी' }, role: { en: 'Artisan Relations', mr: 'कारागीर संबंध' }, image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&auto=format&fit=crop' },
];

const VALUE_ICONS = [<FiAward size={24} />, <FiHeart size={24} />, <FiGlobe size={24} />, <FiThermometer size={24} />];

const About = () => {
    const { lang } = useLang();

    return (
        <div className="bg-brand-cream overflow-x-hidden">
            <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center overflow-hidden">
                <div className="absolute inset-0">
                    <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2000&auto=format&fit=crop" alt="Fresh food" className="w-full h-full object-cover" loading="eager" />
                    <div className="absolute inset-0 bg-brand-dark/70" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16">
                    <motion.div className="max-w-2xl" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}>
                        <h1 className="font-display font-bold text-white leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>{tx(t.about.heroTitle, lang)}</h1>
                        <p className="text-white/85 text-base md:text-lg leading-relaxed max-w-lg">{tx(t.about.heroDesc, lang)}</p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                        <AnimateIn preset="slideRight">
                            <div className="space-y-5">
                                <h2 className="font-display font-bold text-brand-dark" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>{tx(t.about.missionTitle, lang)}</h2>
                                <p className="text-brand-dark/80 leading-relaxed text-base">{tx(t.about.missionP1, lang)}</p>
                                <p className="text-brand-dark/80 leading-relaxed text-base">{tx(t.about.missionP2, lang)}</p>
                                <div className="grid grid-cols-3 gap-4 pt-4">
                                    {[{ value: '50+', label: tx(t.about.partners, lang) }, { value: '10K+', label: tx(t.about.customers, lang) }, { value: '100%', label: tx(t.about.pure, lang) }].map((stat, i) => (
                                        <AnimateIn key={i} preset="fadeUp" delay={i * 0.1}>
                                            <div className="text-center md:text-left">
                                                <div className="text-2xl md:text-3xl font-display font-bold text-brand-green">{stat.value}</div>
                                                <div className="text-xs md:text-sm text-brand-dark/60 mt-1">{stat.label}</div>
                                            </div>
                                        </AnimateIn>
                                    ))}
                                </div>
                            </div>
                        </AnimateIn>
                        <AnimateIn preset="slideLeft">
                            <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-premium aspect-[4/3]">
                                <img src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1200&auto=format&fit=crop" alt="Organic farm" className="w-full h-full object-cover" loading="lazy" />
                            </div>
                        </AnimateIn>
                    </div>
                </div>
            </section>

            <section className="py-14 md:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimateIn preset="fadeUp" className="text-center mb-10 md:mb-14">
                        <h2 className="font-display font-bold text-brand-dark mb-3" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>{tx(t.about.valuesTitle, lang)}</h2>
                        <p className="text-brand-dark/70 max-w-2xl mx-auto text-base">{tx(t.about.valuesDesc, lang)}</p>
                    </AnimateIn>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {t.values.map((value, idx) => (
                            <AnimateIn key={idx} preset="fadeUp" delay={idx * 0.08}>
                                <div className="bg-brand-cream rounded-2xl p-6 text-center group hover:bg-brand-green transition-colors duration-300 h-full">
                                    <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green mx-auto mb-4 group-hover:bg-white/20 group-hover:text-white transition-colors">{VALUE_ICONS[idx]}</div>
                                    <h3 className="font-display font-semibold text-brand-dark mb-2 group-hover:text-white transition-colors text-base">{tx(value.title, lang)}</h3>
                                    <p className="text-brand-dark/70 text-sm leading-relaxed group-hover:text-white/80 transition-colors">{tx(value.desc, lang)}</p>
                                </div>
                            </AnimateIn>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-14 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimateIn preset="fadeUp" className="text-center mb-10 md:mb-14">
                        <h2 className="font-display font-bold text-brand-dark mb-3" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>{tx(t.about.teamTitle, lang)}</h2>
                        <p className="text-brand-dark/70 max-w-2xl mx-auto text-base">{tx(t.about.teamDesc, lang)}</p>
                    </AnimateIn>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-3xl mx-auto">
                        {TEAM.map((person, idx) => (
                            <AnimateIn key={idx} preset="fadeUp" delay={idx * 0.1}>
                                <div className="group text-center">
                                    <div className="w-28 h-28 md:w-32 md:h-32 rounded-full mx-auto mb-4 overflow-hidden border-3 border-brand-green/20 group-hover:border-brand-green transition-colors shadow-soft">
                                        <img src={person.image} alt={person.name[lang] || person.name.en} className="w-full h-full object-cover" loading="lazy" />
                                    </div>
                                    <h3 className="font-semibold text-brand-dark text-base">{person.name[lang] || person.name.en}</h3>
                                    <p className="text-brand-dark/60 text-sm">{person.role[lang] || person.role.en}</p>
                                </div>
                            </AnimateIn>
                        ))}
                    </div>
                </div>
            </section>

            <AnimateIn preset="scaleIn">
                <section className="py-14 md:py-20 bg-brand-green mx-3 sm:mx-6 lg:mx-8 mb-6 md:mb-8 rounded-2xl md:rounded-3xl">
                    <div className="max-w-3xl mx-auto px-5 md:px-8 text-center space-y-6">
                        <h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>{tx(t.about.ctaTitle, lang)}</h2>
                        <p className="text-white/80 text-base max-w-xl mx-auto">{tx(t.about.ctaDesc, lang)}</p>
                        <Link to="/catalog" className="block sm:inline-block">
                            <Button variant="secondary" size="lg" className="w-full sm:w-auto px-10 mt-2">{tx(t.home.shopNow, lang)}</Button>
                        </Link>
                    </div>
                </section>
            </AnimateIn>
        </div>
    );
};

export default About;
