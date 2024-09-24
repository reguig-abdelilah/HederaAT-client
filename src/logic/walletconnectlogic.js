import { HashConnect, HashConnectConnectionState } from 'hashconnect';
import { LedgerId } from '@hashgraph/sdk';
import useWallet from '../hooks/usewallet';

const appMetadata = {
    name: "HashGraph Prototype",
    description: "This is a prototype for using HashGraph",
    url: "https://95a0-105-71-133-109.ngrok-free.app/",
    icons: ["https://www.fiat.com/content/dam/fiat2023/master/Logo-100x76.png"]
}

let state = HashConnectConnectionState.Disconnected
const setUpHashConnectEvents = (setPairing, hashconnect)=> {
    console.log('setUpHashConnectEvents')

    hashconnect.pairingEvent.on((newPairing) => {
        setPairing({accountIds: newPairing.accountIds, network: newPairing.network}) 
    })
    
    hashconnect.disconnectionEvent.on((data) => {
        // setPairing({}) 
        
    });
    
    hashconnect.connectionStatusChangeEvent.on((connectionStatus) => {
        state = connectionStatus;
    })
}
export const init_setup = async (setPairing, hashconnect, setHashConnect) => {
    hashconnect = new HashConnect(LedgerId.TESTNET, "2f8a3e8b132ed2af0e1a940be6d3632e", appMetadata, false);
    try {
        setUpHashConnectEvents(setPairing, hashconnect)
        // console.log('initData')
        let initData = await hashconnect.init();
        console.log(initData)
        setHashConnect(hashconnect)
    } catch (error) {
        console.error('Error initing:', error);
    }
}
export const startPairing = async(hashconnect)=>{
    // if(!hashconnect)
    try {
    // if(hashconnect.connectedAccountIds.length === 0)
        hashconnect.openPairingModal()
    } catch (error) {
    console.error('Error peering wallet:', error);
    }
}

export function Testing(){
    console.log('Just Testing')
}