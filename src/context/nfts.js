'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers"
import { contractAbi, contractAddress } from "./contract-abi";
import { useRouter } from "next/navigation";

const StateContext = createContext()

export const StateContextProvider = ({ children }) => {
    const [address, setAddress] = useState(null)
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState("");

    const router = useRouter();

    useEffect(() => {
        let timer;
        if (notification) {
            timer = setTimeout(() => {
                setNotification("");
            }, 8000)
        }
        return () => clearTimeout(timer)
    }, [notification])

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
            const provider = new ethers.BrowserProvider(window.ethereum);
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
                    price: ethers.formatEther(nft[4]),
                    createdAt: formattedDate
                };
            });

            return nftsArray;
        } catch (error) {
            console.log(error)
        }
    }

    const createNFT = async (ownerAddress, tokenUri) => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractAbi, signer);
        const tx = await contract.createNFT(ownerAddress, tokenUri)
        await tx.wait();
        setNotification("Create NFT Successful")
        router.push("/nft-collection");
    }

    const buyNft = async (tokenID, value) => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractAbi, signer);

        const valueWei = ethers.parseEther(value.toString());

        const tx = await contract.buyNft(tokenID, {
            value: valueWei,
        })

        await tx.wait();
        window.location.reload();
        setLoading(false)
        setNotification("Buy NFT Successfully")

    }

    const getNFTByID = async (id) => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractAbi, signer);
            const nft = await contract.getNFT(id);

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
            const dataNft = {
                owner: nft[0],
                tokenUri: nft[1],
                id: Number(nft[2]),
                price: ethers.formatEther(nft[4]),
                createdAt: formattedDate
            };

            return dataNft
        } catch (error) {
            console.log(error)
        }
    }

    const getHistoryID = async (id)=> {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractAbi, signer);
            const history = await contract.getHistoryTransactionID(id);
            const result = history.map(his=> {

                const createdAt = new Date(Number(his[5]) * 1000); // Konversi timestamp ke milidetik

                // Ambil bagian-bagian tanggal
                const day = createdAt.getDate();
                const month = createdAt.getMonth() + 1; // Perhatikan bahwa bulan dimulai dari 0
                const year = createdAt.getFullYear();
                const hours = createdAt.getHours();
                const minutes = createdAt.getMinutes();
                const seconds = createdAt.getSeconds();

                // Buat string dalam format yang diinginkan
                const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
                return (
                    {
                        index: Number(his[0]),
                        from: his[1].slice(0,20)+"...",
                        to: his[2].slice(0,20)+"...",
                        id: Number(his[3]),
                        amount: ethers.formatEther(his[4]).toString()+" ETH",
                        time: formattedDate
                    }
                )
            })

            return result
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        checkIfAccountExist();
    }, [address]);

    return (
        <StateContext.Provider value={{
            address, loading, buyNft, getNFTByID, getHistoryID ,getAllNFT, createNFT, setLoading, setNotification, notification
        }}>{children}</StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)