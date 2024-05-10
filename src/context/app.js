'use client'
import React from 'react'
import { StateContextProvider } from './nfts'

const ContextRoot = ({ children }) => {
    return (
        <StateContextProvider>
            {children}
        </StateContextProvider>
    )
}

export default ContextRoot