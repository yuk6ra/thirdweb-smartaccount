import {
    ConnectWallet,
    Web3Button,
    useContract,
    useContractRead,
    useContractWrite,
    useAddress,
    ThirdwebSDK
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

const Home: NextPage = () => {

    const [ isSuccess, setIsSuccess ] = useState<boolean>(false);
    const [ txnHash, setTxnHash ] = useState<string>("");

    const address = useAddress();
    const walletAddress = 
    console.log("address", address)

    const { contract } = useContract("0xDA4dc54472573B0193394d6214DCD767Bd295241");
    const { mutateAsync: mintTo, isLoading } = useContractWrite(contract, "mintTo")

    // const { contract } = useContract("0x640b17bD959c3528aF1dB7a1E70233e8E7E5327F");
    // const { data, isLoading } = useContractRead(contract, "getAddress", [address])

    const call = async () => {
        try {
            const data = await mintTo({ args: [address, "_uri"] });
            console.info("contract call successs", data);
            setTxnHash(data.receipt.transactionHash);
            setIsSuccess(true);
        } catch (err) {
            console.error("contract call failure", err);
            setIsSuccess(false)
        }
    }

    return (
        <div className={styles.container}>
            <main className={styles.main}>

                <h1 className={styles.title}>
                    AA Wallet
                </h1>

                <h2 className={styles.subtitle}>
                    Step 1. Confirm your Smart Account
                </h2>

                <text className={styles.text}>
                    {address && (
                        <a href={`https://mumbai.polygonscan.com/address/${address}`}>
                            {address}
                       </a> 
                    )}
                    {!address && <ConnectWallet />}
                </text>

                <a href="" ></a>

                <h2 className={styles.subtitle}>
                    Step 2. Claim your AA Tokens
                </h2>
                        
                {address && (
                    <Web3Button
                        contractAddress={"0xDA4dc54472573B0193394d6214DCD767Bd295241"}
                        action={() => call()}
                    >
                        Get AA Tokens
                    </Web3Button>
                )}
                <text
                    className={styles.text}
                >
                    {isSuccess && txnHash}
                </text>

                <h2 className={styles.subtitle}>
                    Step 3. Check Transaction
                </h2>
                
                {isSuccess && (
                    <button 
                        className={styles.button}
                        onClick={()=> window.open(`https://mumbai.polygonscan.com/tx/${txnHash}`)}
                    >
                            Check Transaction            
                    </button>
                )}

                {!isSuccess && <text className={styles.text}>Please claim your AA Tokens</text>}
            </main>
        </div>
    );
};

export default Home;
