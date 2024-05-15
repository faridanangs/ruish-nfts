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
    const [history, setHistory] = useState([])

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
        await getLogs();
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
        setLoading(false)
        setNotification("Buy NFT Successfully")
        router.push(`/nft-collection/${tokenID}`);
        await getLogs();
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

            await getLogs();
            return dataNft
        } catch (error) {
            console.log(error)
        }
    }

    const getAllTransactionHistory = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);

        const filter = {
            address: address,
            fromBlock: 0,
            toBlock: "latest"
        }

        try {
            const logs = await provider.getLogs(filter);
            console.log(logs, "logs")
            const transaction = logs.map(async log => {
                const tx = await provider.getTransaction(log.transactionHash);
                return {
                    hash: tx.hash,
                    blockNumber: tx.blockNumber,
                    data: tx.data,
                    from: tx.from,
                    to: tx.to,
                    value: ethers.formatEther(tx.value),
                    gasLimit: Number(tx.gasLimit),
                    gasPrice: ethers.formatEther(Number(tx.gasPrice)),
                    chainId: Number(tx.chainId),
                    nonce: Number(tx.nonce),
                    maxFeePerGas: Number(tx.maxFeePerGas),
                    maxPriorityFeePerGas: Number(tx.maxPriorityFeePerGas),
                    type: tx.type,
                }

            })
            const result = await Promise.all(transaction);
            setHistory(result);
        } catch (error) {
            console.log(error)
        }
    }


    const getLogs = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);

        let abi = ["event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"]
        let iface = new ethers.Interface(abi);

        const filter = {
            address: address,
            fromBlock: 0,
            toBlock: "latest"
        }

        var callPromise = provider.getLogs(filter);
        callPromise.then(function (events) {
            events.map((log) => {
                const result = iface.parseLog(log);
                console.log(result)
                setHistory(
                    {
                        from: result.args[0],
                        to: result.args[1],
                        tokenId: Number(result.args[2])
                    }
                )
            });
        }).catch(function (err) {
            console.log(err);
        });
    }

    useEffect(() => {
        checkIfAccountExist();
        // getAllTransactionHistory()
        getLogs()
    }, [address]);

    console.log(history)

    return (
        <StateContext.Provider value={{
            address, connectWallet, loading, buyNft, history, getNFTByID, getAllNFT, createNFT, setLoading, setNotification, notification
        }}>{children}</StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)