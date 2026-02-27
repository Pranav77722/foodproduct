import React, { useState } from 'react';
import AnimateIn from '../components/ui/AnimateIn';
import Button from '../components/ui/Button';
import { FiPackage, FiMapPin, FiHeart, FiUser, FiShoppingBag, FiChevronRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import t, { tx } from '../data/translations';

const MOCK_ORDERS = [
    { id: 'ORD-1024', date: '25 Feb, 2026', total: 798, status: 'delivered', items: 3 },
    { id: 'ORD-1018', date: '10 Feb, 2026', total: 449, status: 'shipped', items: 2 },
    { id: 'ORD-1002', date: '22 Jan, 2026', total: 1247, status: 'delivered', items: 5 },
];
const MOCK_ADDRESSES = [
    { id: 1, label: { en: 'Home', mr: 'घर' }, address: { en: '123 Organic Lane, Pune, Maharashtra 411001', mr: '१२३ ऑर्गनिक लेन, पुणे, महाराष्ट्र ४११००१' }, isDefault: true },
    { id: 2, label: { en: 'Office', mr: 'कार्यालय' }, address: { en: '456 Business Park, Hinjewadi, Pune 411057', mr: '४५६ बिझनेस पार्क, हिंजवडी, पुणे ४११०५७' }, isDefault: false },
];

const TABS_CONFIG = (lang) => [
    { id: 'orders', label: tx(t.account.orders, lang), icon: <FiPackage size={18} /> },
    { id: 'addresses', label: tx(t.account.addresses, lang), icon: <FiMapPin size={18} /> },
    { id: 'wishlist', label: tx(t.account.wishlist, lang), icon: <FiHeart size={18} /> },
];

const Account = () => {
    const [activeTab, setActiveTab] = useState('orders');
    const { lang } = useLang();
    const TABS = TABS_CONFIG(lang);

    const OrdersContent = () => (
        <div className="space-y-3 md:space-y-4">
            {MOCK_ORDERS.map((order, idx) => (
                <AnimateIn key={order.id} preset="fadeUp" delay={idx * 0.06}>
                    <div className="bg-white rounded-2xl p-4 md:p-5 shadow-soft border border-brand-gray/30 hover:shadow-premium transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center shrink-0"><FiShoppingBag size={18} className="text-brand-green" /></div>
                                <div>
                                    <h4 className="font-semibold text-brand-dark text-sm md:text-base">{order.id}</h4>
                                    <p className="text-xs text-brand-dark/50">{order.date} · {order.items} {lang === 'mr' ? 'वस्तू' : 'items'}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 pl-[52px] sm:pl-0">
                                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${order.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                    {order.status === 'delivered' ? tx(t.account.delivered, lang) : tx(t.account.shipped, lang)}
                                </span>
                                <span className="font-bold text-brand-dark">₹{order.total}</span>
                                <FiChevronRight className="text-brand-dark/30 hidden sm:block" />
                            </div>
                        </div>
                    </div>
                </AnimateIn>
            ))}
        </div>
    );

    const AddressesContent = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MOCK_ADDRESSES.map((addr, idx) => (
                <AnimateIn key={addr.id} preset="fadeUp" delay={idx * 0.06}>
                    <div className={`bg-white rounded-2xl p-5 shadow-soft border-2 ${addr.isDefault ? 'border-brand-green' : 'border-brand-gray/30'}`}>
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <FiMapPin size={16} className={addr.isDefault ? 'text-brand-green' : 'text-brand-dark/40'} />
                                <h4 className="font-bold text-brand-dark text-sm">{addr.label[lang] || addr.label.en}</h4>
                            </div>
                            {addr.isDefault && <span className="text-xs font-bold text-brand-green bg-brand-green/10 px-2 py-0.5 rounded-full">Default</span>}
                        </div>
                        <p className="text-sm text-brand-dark/70 leading-relaxed">{addr.address[lang] || addr.address.en}</p>
                    </div>
                </AnimateIn>
            ))}
            <AnimateIn preset="fadeUp" delay={0.15}>
                <Button variant="outline" fullWidth className="h-full min-h-[120px] rounded-2xl border-dashed">{tx(t.account.addAddress, lang)}</Button>
            </AnimateIn>
        </div>
    );

    const WishlistContent = () => (
        <motion.div className="text-center py-14 md:py-20 bg-white rounded-2xl shadow-soft border border-brand-gray/30" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <FiHeart size={48} className="text-brand-dark/15 mx-auto mb-4" />
            <h3 className="font-display font-semibold text-xl text-brand-dark mb-2">{tx(t.account.noWishlist, lang)}</h3>
            <p className="text-brand-dark/60 text-sm max-w-sm mx-auto">{tx(t.account.noWishlistDesc, lang)}</p>
        </motion.div>
    );

    const CONTENT = { orders: <OrdersContent />, addresses: <AddressesContent />, wishlist: <WishlistContent /> };

    return (
        <div className="bg-brand-cream min-h-screen py-8 md:py-10">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimateIn preset="fadeUp" className="mb-8 md:mb-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-brand-green flex items-center justify-center text-white shadow-premium shrink-0"><FiUser size={28} /></div>
                    <div>
                        <h1 className="font-display font-bold text-brand-dark" style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>{tx(t.account.welcome, lang)}</h1>
                        <p className="text-brand-dark/60 text-sm md:text-base mt-1">{tx(t.account.subtext, lang)}</p>
                    </div>
                </AnimateIn>
                <div className="flex gap-1 bg-brand-gray/40 p-1 rounded-xl mb-8 overflow-x-auto scrollbar-hide">
                    {TABS.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                            className={`relative flex items-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-colors whitespace-nowrap flex-1 justify-center min-h-[44px] ${activeTab === tab.id ? 'text-brand-dark' : 'text-brand-dark/50 hover:text-brand-dark/80'}`}
                        >
                            {activeTab === tab.id && <motion.div layoutId="account-tab-bg" className="absolute inset-0 bg-white rounded-lg shadow-sm" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
                            <span className="relative z-10 flex items-center gap-2">{tab.icon} {tab.label}</span>
                        </button>
                    ))}
                </div>
                <AnimatePresence mode="wait">
                    <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                        {CONTENT[activeTab]}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Account;
