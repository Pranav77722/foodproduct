import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from '../ui/ScrollToTop';

const MainLayout = () => {
    const location = useLocation();

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <ScrollToTop />
            <Navbar />
            {/* pt: top bar + category strip. pb: mobile bottom tab bar */}
            <main className="flex-grow pt-[84px] md:pt-[96px] pb-[60px] md:pb-0">
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                    <Outlet />
                </motion.div>
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
