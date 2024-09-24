import { useContext } from "react";
import WalletContext from "../context/walletprovider";
const useWallet = ()=>{
    return useContext(WalletContext)
}
export default useWallet