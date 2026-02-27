import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiYoutube, FiSend, FiFacebook } from 'react-icons/fi';
import AnimateIn from '../ui/AnimateIn';
import { useLang } from '../../context/LanguageContext';
import t, { tx } from '../../data/translations';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { lang } = useLang();

    const handleNewsletter = (e) => {
        e.preventDefault();
        if (email) { setIsSubmitted(true); setEmail(''); setTimeout(() => setIsSubmitted(false), 3000); }
    };

    const exploreLinks = [
        { label: tx(t.nav.home, lang), path: '/' },
        { label: tx(t.nav.shop, lang), path: '/catalog' },
        { label: tx(t.nav.about, lang), path: '/about' },
        { label: tx(t.nav.contact, lang), path: '/contact' },
    ];

    const supportLinks = [
        { label: 'FAQ', path: '/contact' },
        { label: tx(t.cart.shipping, lang), path: '/contact' },
        { label: tx(t.footer.privacy, lang), path: '#' },
        { label: tx(t.footer.terms, lang), path: '#' },
    ];

    const socials = [
        { icon: <FiInstagram size={16} />, label: 'Instagram', url: '#' },
        { icon: <FiFacebook size={16} />, label: 'Facebook', url: '#' },
        { icon: <FiTwitter size={16} />, label: 'Twitter', url: '#' },
        { icon: <FiYoutube size={16} />, label: 'YouTube', url: '#' },
    ];

    return (
        <AnimateIn preset="fadeIn">
            <footer className="bg-brand-dark text-white/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

                        {/* Brand */}
                        <div className="sm:col-span-2 lg:col-span-1">
                            <Link to="/" className="inline-flex items-center gap-2.5 mb-4 group">
                                <div className="w-9 h-9 rounded-xl bg-brand-green flex items-center justify-center text-white font-display font-bold text-lg shadow-sm group-hover:bg-brand-orange transition-colors duration-300">N</div>
                                <span className="font-display font-bold text-xl text-white">Natura<span className="text-brand-green group-hover:text-brand-orange transition-colors duration-300">.</span></span>
                            </Link>
                            <p className="text-white/50 text-sm leading-relaxed max-w-xs">{tx(t.footer.brandDesc, lang)}</p>
                            <div className="flex gap-2.5 mt-5">
                                {socials.map(s => (
                                    <a key={s.label} href={s.url} className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center text-white/60 hover:bg-brand-green hover:text-white transition-all duration-200 hover:scale-110 hover:-translate-y-0.5" aria-label={s.label}>
                                        {s.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Explore */}
                        <div>
                            <h4 className="font-display font-semibold text-white text-sm mb-4 uppercase tracking-wider">{tx(t.footer.explore, lang)}</h4>
                            <ul className="space-y-2">
                                {exploreLinks.map(link => (
                                    <li key={link.path + link.label}>
                                        <Link to={link.path} className="text-sm text-white/50 hover:text-brand-green hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1">
                                            <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-brand-green transition-colors" />
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <h4 className="font-display font-semibold text-white text-sm mb-4 uppercase tracking-wider">{tx(t.footer.support, lang)}</h4>
                            <ul className="space-y-2">
                                {supportLinks.map(link => (
                                    <li key={link.label}>
                                        <Link to={link.path} className="text-sm text-white/50 hover:text-brand-green hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h4 className="font-display font-semibold text-white text-sm mb-4 uppercase tracking-wider">{tx(t.footer.stayUpdated, lang)}</h4>
                            <form onSubmit={handleNewsletter} className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={tx(t.footer.yourEmail, lang)}
                                    className="w-full bg-white/8 px-4 py-3 pr-12 rounded-xl text-sm text-white placeholder-white/30 border border-white/10 focus:outline-none focus:border-brand-green/50 focus:bg-white/12 transition-all duration-200"
                                    required
                                />
                                <button type="submit" className="absolute right-1.5 top-1.5 w-9 h-9 bg-brand-green hover:bg-brand-orange rounded-lg flex items-center justify-center text-white transition-all duration-200 hover:scale-105" aria-label={tx(t.footer.join, lang)}>
                                    <FiSend size={14} />
                                </button>
                            </form>
                            {isSubmitted && (
                                <p className="text-brand-green text-xs mt-2 animate-pulse">{lang === 'mr' ? '✓ सामील झालात!' : '✓ Subscribed!'}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/35">
                        <span>© {new Date().getFullYear()} Natura. {tx(t.footer.rights, lang)}</span>
                        <div className="flex gap-4">
                            <Link to="#" className="hover:text-white transition-colors duration-200">{tx(t.footer.privacy, lang)}</Link>
                            <Link to="#" className="hover:text-white transition-colors duration-200">{tx(t.footer.terms, lang)}</Link>
                        </div>
                    </div>
                </div>
                <div style={{ height: 'env(safe-area-inset-bottom)' }} />
            </footer>
        </AnimateIn>
    );
};

export default Footer;
