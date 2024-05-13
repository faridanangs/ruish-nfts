'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers"
import { contractAbi, contractAddress } from "./contract-abi";
import { redirect } from "next/navigation";

const StateContext = createContext()

export const StateContextProvider = ({ children }) => {
    const [address, setAddress] = useState()
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState();

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
            const address = await signer.getAddress();
            setAddress(address);

        } catch (error) {
            console.log(error)
        }
    }

    const checkIfAccountExist = async () => {
        try {
            if (!window.ethereum) return setNotification("You don't have metamask!");

            const accounts = await window.ethereum.request({ method: "eth_accounts" });
            if (accounts.length) {
                setAddress(accounts[0])
            }

        } catch (error) {
            console.log(error)
        }
    }


    const getAllNFT = async () => {
        try {
            const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractAbi, signer);
            const nfts = await contract.getAllNFTs();

            const nftsArray = nfts.map(nft => {
                const createdAt = new Date(Number(nft[3]) * 1000); // Konversi timestamp ke milidetik

                // Ambil bagian-bagian tanggal
                const day = createdAt.getDate();
                const month = createdAt.getMonth() + 1; // Perhatikan bahwa bulan dimulai dari 0
                const year = createdAt.getFullYear();
                const hours = createdAt.getHours();
                const minutes = createdAt.getMinutes();
                const seconds = createdAt.getSeconds();

                // Buat string dalam format yang diinginkan
                const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
                return {
                    owner: nft[0],
                    id: Number(nft[1]),
                    tokenUri: nft[2],
                    createdAt: formattedDate
                };
            });
            return nftsArray;
        } catch (error) {
            console.log(error)
        }
    }

    const createNFT = async (ownerAddress, tokenUri) => {
        const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractAbi, signer);
        const tx = await contract.createNFT(ownerAddress, tokenUri)
        await tx.wait();
        setNotification("Create NFT Successful")
    }



    useEffect(() => {
        checkIfAccountExist();
    }, [address]);

    return (
        <StateContext.Provider value={{
            address, connectWallet, loading, getAllNFT, createNFT, setLoading, setNotification, notification
        }}>{children}</StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)