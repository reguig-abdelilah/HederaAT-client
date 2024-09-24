import { TransferTransaction } from "@hashgraph/sdk";
import useContribution from "../hooks/useContribution";
import axios from "../api/axios";
import useWallet from '../hooks/usewallet'
import { startPairing } from '../logic/walletconnectlogic';
const appWallet = '0.0.4893156'



const WalletConnectButton = ({campaignId}) => {
  const {setIsLoading, setIsSuccess, setIsFailure, campaigns, setCampaigns} = useContribution()
  const {pairing, hashConnect, contribution} = useWallet()
  const walletConnected = false
  const handlePairing = () => {
    startPairing(hashConnect)
  }
  const handleExecuteTransaction = () =>{
    const contributionAmount = contribution[campaignId] 
    if(contributionAmount !== undefined && contributionAmount != 0)
      executeTransaction(contributionAmount)
  }
  const executeTransaction = async (amount) => {
    
    // await mintOnServer(pairing.accountIds[0], amount)
    // return
    try
    {
        
        let signer = hashConnect.getSigner(pairing.accountIds[0]);
        let trans = await new TransferTransaction()
            .addHbarTransfer(pairing.accountIds[0], -amount)
            .addHbarTransfer( appWallet , amount)
            .freezeWithSigner(signer);

        let response = await trans.executeWithSigner(signer);
      await mintOnServer(pairing.accountIds[0], amount)

    }catch (error) {
        console.log(error)
        
    }
}
const mintOnServer = async (address, contributionAmount) => {

    try {
      setIsLoading(true)
        const result = await axios.post(`token/${campaignId}/`,
            {
                'address': address,
                'contribution' : contributionAmount
            }
        )
        if(result.status==200){
          // console.log('----- ',typeof result.data)
          campaigns.forEach(campaign => {
            if(campaign.id === campaignId){
              campaign.raised = result.data
            }
          });
          // contribution[campaignId].raised = Number(result.data) 
          setIsLoading(false)
          setIsSuccess(true)
        }
        else{
          setIsLoading(false)
          setIsFailure(true)
        }
        
    } catch (error) {
        console.error(error.message)
        setIsLoading(false)
          setIsFailure(true)
    }
}
  return (
    <div>
      {!pairing?.accountIds ? (
        <button onClick={handlePairing} >Connect Wallet</button>
      ) : (
        // <button onClick={handleSignMessage} >Sign Message</button>
        <button onClick={handleExecuteTransaction}>Contribute</button>
          )}
    </div>
  );
};

export default WalletConnectButton;
