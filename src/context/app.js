'use client';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; // Import usePathname
import { StateContextProvider } from './nfts';
import Footer from '@/components/Footer';
import { WProviders } from '@/app/provider';

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
        <WProviders>
            <StateContextProvider>
                {children}
                {showFooter && <Footer />}
            </StateContextProvider>
        </WProviders>
    );
};

export default ContextRoot;
