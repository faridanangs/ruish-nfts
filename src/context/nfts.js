'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers"
import { contractAbi, contractAddress } from "./contract-abi";

const StateContext = createContext()

export const StateContextProvider = ({ children }) => {
    const [address, setAddress] = useState()
    const [signer, setSigner] = useState()
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState();
    const [contract, setContract] = useState()

    useEffect(() => {
        let timer;
        if (notification) {
            timer = setTimeout(() => {
                setNotification("");
            }, 5000)
        }
        return () => clearTimeout(timer)
    }, [notification])

    const connectWallet = async () => {
        try {
            if (!window.ethereum) return setNotification("You don't have metamask!");
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractAbi, signer);
            const address = await signer.getAddress();
            setAddress(address);
            setSigner(signer);
            setContract(contract)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <StateContext.Provider value={{
            address, contract, connectWallet, signer, loading, setLoading, setNotification, notification
        }}>{children}</StateContext.Provider>
    )

}

export const useStateContext = () => useContext(StateContext)