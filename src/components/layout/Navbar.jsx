import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiSearch, FiHome, FiGrid, FiInfo, FiMail, FiChevronDown, FiHeart, FiPackage } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../../context/LanguageContext';
import t, { tx } from '../../data/translations';

/* ── Sub-nav categories ── */
const CATEGORIES = (isMarathi) => [
    { label: isMarathi ? 'सर्व उत्पादने' : 'All Products', path: '/catalog' },
    { label: isMarathi ? 'मिठाई' : 'Sweets', path: '/catalog?cat=sweets' },
    { label: isMarathi ? 'फराळ' : 'Snacks', path: '/catalog?cat=snacks' },
    { label: isMarathi ? 'मसाले' : 'Spices', path: '/catalog?cat=spices' },
    { label: isMarathi ? 'पेये' : 'Drinks', path: '/catalog?cat=drinks' },
    { label: isMarathi ? 'दिवाळी विशेष' : 'Diwali Special', path: '/catalog' },
    { label: isMarathi ? 'नवीन आगमन' : 'New Arrivals', path: '/catalog' },
    { label: isMarathi ? 'सर्वोत्तम विक्री' : 'Best Sellers', path: '/catalog' },
];

/* ── Animated cart icon ── */
const CartIcon = ({ count, size = 18 }) => {
    const prevCount = useRef(count);
    const [bump, setBump] = useState(false);
    useEffect(() => {
        if (count > prevCount.current) { setBump(true); const t = setTimeout(() => setBump(false), 300); prevCount.current = count; return () => clearTimeout(t); }
        prevCount.current = count;
    }, [count]);
    return (
        <motion.span animate={bump ? { scale: [1, 1.3, 1], rotate: [0, -12, 12, 0] } : {}} transition={{ duration: 0.3 }} className="inline-flex">
            <FiShoppingCart size={size} />
        </motion.span>
    );
};

/* ── Desktop nav link with animated indicator ── */
const DesktopNavLink = ({ link, isActive }) => {
    return (
        <Link
            to={link.path}
            className={`relative px-3 xl:px-3.5 py-2 text-[13px] font-semibold rounded-md whitespace-nowrap transition-colors duration-200 ${isActive ? 'text-white bg-white/15' : 'text-white/75 hover:text-white hover:bg-white/8'
                }`}
        >
            {link.name}
            {isActive && (
                <motion.span
                    layoutId="desktop-nav-dot"
                    className="absolute -bottom-1 left-1/2 w-1 h-1 bg-brand-orange rounded-full"
                    style={{ translateX: '-50%' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
            )}
        </Link>
    );
};

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const [accountDropdown, setAccountDropdown] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);
    const location = useLocation();
    const totalQuantity = useSelector((state) => state.cart?.totalQuantity || 0);
    const { lang, toggleLang, isMarathi } = useLang();
    const dropdownRef = useRef(null);

    const NAV_LINKS = [
        { name: tx(t.nav.home, lang), path: '/', icon: <FiHome size={20} /> },
        { name: tx(t.nav.shop, lang), path: '/catalog', icon: <FiGrid size={20} /> },
        { name: tx(t.nav.about, lang), path: '/about', icon: <FiInfo size={20} /> },
        { name: tx(t.nav.contact, lang), path: '/contact', icon: <FiMail size={20} /> },
    ];

    // Bottom bar tabs for mobile
    const BOTTOM_TABS = [
        { name: tx(t.nav.home, lang), path: '/', icon: <FiHome size={20} /> },
        { name: tx(t.nav.shop, lang), path: '/catalog', icon: <FiGrid size={20} /> },
        { name: tx(t.nav.cart, lang), path: '/cart', icon: <CartIcon count={totalQuantity} size={20} />, badge: totalQuantity },
        { name: tx(t.nav.account, lang), path: '/account', icon: <FiUser size={20} /> },
    ];

    useEffect(() => { setDrawerOpen(false); setMobileSearchOpen(false); }, [location.pathname]);

    useEffect(() => {
        document.body.style.overflow = drawerOpen ? 'hidden' : '';
        document.body.style.touchAction = drawerOpen ? 'none' : '';
        return () => { document.body.style.overflow = ''; document.body.style.touchAction = ''; };
    }, [drawerOpen]);

    useEffect(() => {
        if (!accountDropdown) return;
        const onClick = (e) => { if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setAccountDropdown(false); };
        document.addEventListener('mousedown', onClick);
        return () => document.removeEventListener('mousedown', onClick);
    }, [accountDropdown]);

    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') { setDrawerOpen(false); setAccountDropdown(false); setMobileSearchOpen(false); } };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    const closeDrawer = useCallback(() => setDrawerOpen(false), []);
    const isActive = (path) => location.pathname === path;

    return (
        <>
            {/* ━━━━━ TOP NAVBAR ━━━━━ */}
            <motion.nav
                className="fixed top-0 left-0 right-0 z-50 bg-brand-green shadow-md"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 25, delay: 0.1 }}
            >
                {/* ── Top Row ── */}
                <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-5 h-[52px] sm:h-14 md:h-[60px]">

                        {/* Logo */}
                        <Link to="/" className="flex flex-col items-start shrink-0 group">
                            <motion.span
                                className="font-display font-bold text-white text-base sm:text-lg md:text-xl tracking-tight leading-none"
                                whileHover={{ scale: 1.04 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                            >
                                Natura<motion.span
                                    className="text-brand-orange inline-block"
                                    animate={{ scale: [1, 1.3, 1] }}
                                    transition={{ repeat: Infinity, repeatDelay: 5, duration: 0.4 }}
                                >.</motion.span>
                            </motion.span>
                            <span className="text-[8px] sm:text-[9px] text-white/50 italic leading-none mt-0.5 hidden sm:block">
                                {isMarathi ? 'महाराष्ट्रीय चव' : 'Taste of Maharashtra'}
                            </span>
                        </Link>

                        {/* ── Search Bar (all sizes) ── */}
                        <div className="flex-1 min-w-0">
                            {/* Mobile: inline compact search */}
                            <div className="md:hidden relative">
                                <input
                                    type="text"
                                    placeholder={isMarathi ? 'शोधा...' : 'Search...'}
                                    className="w-full h-9 pl-3 pr-9 rounded-lg bg-white/95 text-brand-dark text-[13px] placeholder-brand-dark/40 focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
                                    onFocus={() => setSearchFocused(true)}
                                    onBlur={() => setSearchFocused(false)}
                                />
                                <button className="absolute right-0 top-0 h-9 w-9 flex items-center justify-center text-brand-orange" aria-label="Search">
                                    <FiSearch size={16} />
                                </button>
                            </div>

                            {/* Desktop: full search bar */}
                            <motion.div
                                className="hidden md:block relative"
                                animate={{ maxWidth: searchFocused ? '36rem' : '32rem' }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                            >
                                <div className={`relative w-full rounded-lg transition-shadow duration-300 ${searchFocused ? 'shadow-lg shadow-black/10 ring-2 ring-brand-orange/30' : 'shadow-sm'}`}>
                                    <input
                                        type="text"
                                        placeholder={isMarathi ? 'उत्पादने शोधा...' : 'Search for products, sweets, snacks...'}
                                        className="w-full h-10 pl-4 pr-12 rounded-lg bg-white text-brand-dark text-sm placeholder-brand-dark/40 focus:outline-none"
                                        onFocus={() => setSearchFocused(true)}
                                        onBlur={() => setSearchFocused(false)}
                                    />
                                    <motion.button
                                        className="absolute right-0 top-0 h-10 w-11 flex items-center justify-center bg-brand-orange rounded-r-lg text-white"
                                        whileHover={{ backgroundColor: '#dd8930' }}
                                        whileTap={{ scale: 0.92 }}
                                        aria-label="Search"
                                    >
                                        <FiSearch size={18} />
                                    </motion.button>
                                </div>
                            </motion.div>
                        </div>

                        {/* ── Desktop Nav Links ── */}
                        <div className="hidden lg:flex items-center gap-0.5">
                            {NAV_LINKS.map((link) => (
                                <DesktopNavLink key={link.path} link={link} isActive={isActive(link.path)} />
                            ))}
                        </div>

                        {/* ── Desktop Right Actions ── */}
                        <div className="hidden md:flex items-center gap-0.5">
                            {/* Language */}
                            <motion.button
                                onClick={toggleLang}
                                className="h-8 px-2.5 rounded-md text-[12px] font-bold text-white/90 hover:text-white border border-white/20 hover:border-white/40 transition-colors"
                                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.12)' }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Toggle language"
                            >
                                {isMarathi ? 'EN' : 'मराठी'}
                            </motion.button>

                            {/* Account Dropdown */}
                            <div className="relative" ref={dropdownRef}>
                                <motion.button
                                    onClick={() => setAccountDropdown(!accountDropdown)}
                                    className="flex items-center gap-1 px-2.5 py-2 text-white/90 hover:text-white rounded-md transition-colors"
                                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    <FiUser size={18} />
                                    <span className="text-[13px] font-semibold hidden xl:inline">{tx(t.nav.account, lang)}</span>
                                    <motion.span animate={{ rotate: accountDropdown ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                        <FiChevronDown size={12} />
                                    </motion.span>
                                </motion.button>
                                <AnimatePresence>
                                    {accountDropdown && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -8, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -8, scale: 0.95 }}
                                            transition={{ duration: 0.15, ease: 'easeOut' }}
                                            className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-premium border border-brand-gray/30 py-1 z-20 overflow-hidden"
                                        >
                                            {[
                                                { icon: <FiUser size={15} />, label: isMarathi ? 'माझे खाते' : 'My Account', path: '/account' },
                                                { icon: <FiPackage size={15} />, label: tx(t.account.orders, lang), path: '/account' },
                                                { icon: <FiHeart size={15} />, label: tx(t.account.wishlist, lang), path: '/account' },
                                            ].map((item, idx) => (
                                                <Link key={idx} to={item.path} onClick={() => setAccountDropdown(false)}
                                                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-brand-dark/70 hover:bg-brand-cream hover:text-brand-green transition-all duration-150 group"
                                                >
                                                    <span className="text-brand-dark/40 group-hover:text-brand-green transition-colors">{item.icon}</span>
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Cart */}
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link to="/cart" className="flex items-center gap-1.5 px-2.5 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-colors relative" aria-label="Cart">
                                    <CartIcon count={totalQuantity} />
                                    <span className="text-[13px] font-semibold hidden xl:inline">{tx(t.nav.cart, lang)}</span>
                                    <AnimatePresence>
                                        {totalQuantity > 0 && (
                                            <motion.span key="bd" initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 180 }} transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                                                className="absolute -top-0.5 left-[18px] bg-brand-orange text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1 shadow-sm pointer-events-none border border-brand-green"
                                            >
                                                {totalQuantity > 99 ? '99+' : totalQuantity}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </Link>
                            </motion.div>
                        </div>

                        {/* ── Mobile Right Actions (only lang toggle + hamburger) ── */}
                        <div className="md:hidden flex items-center gap-0 shrink-0">
                            <motion.button onClick={toggleLang} whileTap={{ scale: 0.9 }} className="w-8 h-8 flex items-center justify-center text-white/80 text-[10px] font-bold rounded" aria-label="Toggle language">
                                {isMarathi ? 'EN' : 'मरा'}
                            </motion.button>
                            <motion.button
                                onClick={() => setDrawerOpen(true)}
                                className="w-9 h-9 flex items-center justify-center text-white"
                                whileTap={{ scale: 0.9 }}
                                aria-label="Menu"
                                aria-expanded={drawerOpen}
                            >
                                <FiMenu size={20} />
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* ── Desktop Sub-nav (Category strip) ── */}
                <div className="hidden md:block bg-white/8 border-t border-white/10">
                    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
                        <motion.div
                            className="flex items-center gap-0 h-9 overflow-x-auto scrollbar-hide"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.4 }}
                        >
                            {CATEGORIES(isMarathi).map((item, idx) => (
                                <motion.div key={item.label} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 + idx * 0.04, duration: 0.25 }}>
                                    <Link to={item.path} className="group inline-flex items-center px-3 py-1.5 text-[12px] font-medium text-white/65 hover:text-white rounded transition-all duration-200 whitespace-nowrap relative">
                                        {item.label}
                                        <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-brand-orange rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* ── Mobile Category Scroll Strip ── */}
                <div className="md:hidden bg-white/8 border-t border-white/10 overflow-hidden">
                    <div className="flex items-center gap-0 h-8 overflow-x-auto scrollbar-hide px-1">
                        {CATEGORIES(isMarathi).map((item) => (
                            <Link key={item.label} to={item.path}
                                className="inline-flex items-center px-2.5 py-1 text-[10px] font-medium text-white/65 hover:text-white whitespace-nowrap transition-colors duration-200"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </motion.nav>

            {/* ━━━━━ MOBILE BOTTOM TAB BAR ━━━━━ */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-brand-gray/40 shadow-[0_-2px_12px_rgba(0,0,0,0.06)]"
                style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
            >
                <div className="flex items-stretch h-14 max-w-md mx-auto">
                    {BOTTOM_TABS.map((tab) => {
                        const active = isActive(tab.path);
                        return (
                            <Link
                                key={tab.path}
                                to={tab.path}
                                className={`flex-1 flex flex-col items-center justify-center gap-0.5 relative transition-colors duration-200 min-h-[52px] ${active ? 'text-brand-green' : 'text-brand-dark/45'
                                    }`}
                            >
                                {/* Active indicator line */}
                                {active && (
                                    <motion.span
                                        layoutId="bottom-tab-active"
                                        className="absolute top-0 left-4 right-4 h-[2.5px] bg-brand-green rounded-b-full"
                                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                    />
                                )}
                                <span className="relative">
                                    {tab.icon}
                                    {/* Badge */}
                                    {tab.badge > 0 && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute -top-1.5 -right-2.5 bg-brand-orange text-white text-[8px] font-bold min-w-[15px] h-[15px] rounded-full flex items-center justify-center px-0.5 shadow-sm pointer-events-none"
                                        >
                                            {tab.badge > 99 ? '99+' : tab.badge}
                                        </motion.span>
                                    )}
                                </span>
                                <span className={`text-[10px] font-medium leading-none ${active ? 'font-semibold' : ''}`}>
                                    {tab.name}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* ━━━━━ MOBILE DRAWER OVERLAY ━━━━━ */}
            <AnimatePresence>
                {drawerOpen && (
                    <motion.div key="overlay" className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px] md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={closeDrawer} aria-hidden="true" />
                )}
            </AnimatePresence>

            {/* ━━━━━ MOBILE DRAWER PANEL ━━━━━ */}
            <AnimatePresence>
                {drawerOpen && (
                    <motion.aside
                        key="drawer"
                        className="fixed top-0 right-0 bottom-0 w-[82vw] max-w-[320px] bg-white z-[70] flex flex-col shadow-2xl md:hidden will-change-transform"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 26, stiffness: 260, mass: 0.9 }}
                        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
                        role="dialog"
                        aria-modal="true"
                    >
                        {/* Drawer Header */}
                        <div className="flex items-center justify-between px-4 h-[52px] bg-brand-green shrink-0">
                            <Link to="/" onClick={closeDrawer} className="flex items-center gap-2">
                                <span className="font-display font-bold text-base text-white">
                                    Natura<span className="text-brand-orange">.</span>
                                </span>
                            </Link>
                            <motion.button
                                onClick={closeDrawer}
                                className="w-9 h-9 flex items-center justify-center text-white/80 hover:text-white rounded-lg transition-colors"
                                whileHover={{ rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label="Close"
                            >
                                <FiX size={20} />
                            </motion.button>
                        </div>

                        {/* Account section */}
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, duration: 0.25 }}>
                            <Link to="/account" onClick={closeDrawer} className="flex items-center gap-3 px-4 py-3.5 bg-brand-cream border-b border-brand-gray/40 hover:bg-brand-cream/80 transition-colors">
                                <div className="w-9 h-9 rounded-full bg-brand-green flex items-center justify-center text-white shadow-sm"><FiUser size={16} /></div>
                                <div className="min-w-0">
                                    <p className="font-semibold text-brand-dark text-sm truncate">{isMarathi ? 'माझे खाते' : 'My Account'}</p>
                                    <p className="text-[11px] text-brand-dark/45 truncate">{tx(t.account.subtext, lang)}</p>
                                </div>
                            </Link>
                        </motion.div>

                        {/* Nav Links */}
                        <nav className="flex-1 overflow-y-auto overscroll-contain px-3 py-3">
                            <ul className="space-y-0.5">
                                {NAV_LINKS.map((link, i) => (
                                    <motion.li
                                        key={link.path}
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.08 + 0.06 * i, duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                                    >
                                        <Link to={link.path} onClick={closeDrawer}
                                            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 min-h-[44px] ${isActive(link.path) ? 'bg-brand-green text-white shadow-sm' : 'text-brand-dark/70 hover:bg-brand-cream active:bg-brand-green/10'
                                                }`}
                                        >
                                            <span className={`transition-colors ${isActive(link.path) ? 'opacity-90' : 'opacity-40'}`}>{link.icon}</span>
                                            {link.name}
                                            {isActive(link.path) && (
                                                <motion.span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} />
                                            )}
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>

                            {/* Categories */}
                            <motion.div className="mt-4 pt-3 border-t border-brand-gray/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.3 }}>
                                <p className="px-3.5 text-[10px] font-bold text-brand-dark/35 uppercase tracking-wider mb-1.5">
                                    {isMarathi ? 'वर्गवारी' : 'Categories'}
                                </p>
                                <div className="grid grid-cols-2 gap-1">
                                    {CATEGORIES(isMarathi).slice(1, 7).map((cat, i) => (
                                        <motion.div key={cat.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.04, duration: 0.2 }}>
                                            <Link to={cat.path} onClick={closeDrawer}
                                                className="flex items-center px-3 py-2 text-[13px] text-brand-dark/55 hover:text-brand-green hover:bg-brand-cream rounded-lg transition-all duration-200"
                                            >
                                                {cat.label}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </nav>

                        {/* Drawer Footer */}
                        <motion.div className="px-3 py-2.5 border-t border-brand-gray/40 shrink-0 bg-brand-cream/50 space-y-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.25 }}>
                            <motion.button
                                onClick={() => { toggleLang(); closeDrawer(); }}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold bg-brand-green text-white hover:bg-brand-dark transition-colors min-h-[44px]"
                                whileTap={{ scale: 0.97 }}
                            >
                                {isMarathi ? '🇬🇧 Switch to English' : '🇮🇳 मराठी मध्ये बदला'}
                            </motion.button>
                        </motion.div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
