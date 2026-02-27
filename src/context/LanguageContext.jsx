import React, { createContext, useContext, useState, useCallback } from 'react';

const LanguageContext = createContext();

export const LANGUAGES = { EN: 'en', MR: 'mr' };

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState(LANGUAGES.EN);

    const toggleLang = useCallback(() => {
        setLang((prev) => (prev === LANGUAGES.EN ? LANGUAGES.MR : LANGUAGES.EN));
    }, []);

    const isMarathi = lang === LANGUAGES.MR;

    return (
        <LanguageContext.Provider value={{ lang, setLang, toggleLang, isMarathi }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLang = () => {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error('useLang must be used within LanguageProvider');
    return ctx;
};

export default LanguageContext;
