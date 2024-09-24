import { useState } from "react";
import { createContext } from "react";
import { HashConnect } from "hashconnect";

const WalletContext = createContext({})

export const WalletProvider =({children})=>{
    const [pairing, setPairing] = useState({});
    const [hashConnect, setHashConnect] = useState(new HashConnect());
    const [contribution, setContribution] = useState({});
    return(
        <WalletContext.Provider value={{pairing, setPairing, hashConnect, setHashConnect, contribution, setContribution}}>
            {children}
        </WalletContext.Provider>
    )
}
export default WalletContext