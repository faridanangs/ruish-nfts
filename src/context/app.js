'use client';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; // Import usePathname
import { StateContextProvider } from './nfts';
import Footer from '@/components/Footer';

const ContextRoot = ({ children }) => {
    const initialPathname = usePathname(); // Access initial pathname
    const [pathname, setPathname] = useState();

    // Update pathname when it changes
    useEffect(() => {
        setPathname(initialPathname);
    }, [initialPathname]);

    // Determine if current URL is '/'
    const showFooter = pathname !== '/';

    return (
        <StateContextProvider>
            {children}
            {showFooter && <Footer />}
        </StateContextProvider>
    );
};

export default ContextRoot;
