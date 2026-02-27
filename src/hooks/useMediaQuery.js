import { useState, useEffect } from 'react';

const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.matchMedia(query).matches;
        }
        return false;
    });

    useEffect(() => {
        const mql = window.matchMedia(query);
        const handler = (e) => setMatches(e.matches);
        mql.addEventListener('change', handler);
        setMatches(mql.matches);
        return () => mql.removeEventListener('change', handler);
    }, [query]);

    return matches;
};

// Convenience hooks
export const useMobile = () => !useMediaQuery('(min-width: 768px)');
export const useTablet = () => useMediaQuery('(min-width: 768px)') && !useMediaQuery('(min-width: 1024px)');
export const useDesktop = () => useMediaQuery('(min-width: 1024px)');

export default useMediaQuery;
