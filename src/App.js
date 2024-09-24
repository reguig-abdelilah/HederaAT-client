import { useContext, useEffect, useState } from 'react';
import './App.css';
import axios from './api/axios';
import WalletConnectButton from './components/walletconnectbutton';
import { init_setup } from './logic/walletconnectlogic';
import useWallet from './hooks/usewallet';
import useContribution from './hooks/useContribution'

function App() {
  const {pairing, setPairing, hashConnect, setHashConnect, contribution, setContribution} = useWallet()
  const {campaigns, setCampaigns, isLoading, setIsLoading, isSuccess, setIsSuccess, isFailure, setIsFailure} = useContribution()
  
  const handleContributionChange = (event, campaign) => {
    const value = event.target.value;
    setContribution({ ...contribution, [campaign]: value });
  };
  // useEffect(()=>{
  //   console.log('contribution', contribution)
  // },[contribution])
  // const campaigns = [
  //   {
  //     id: "campaign1",
  //     title: "Tech Innovation Project",
  //     description:
  //       "A project to develop innovative tech solutions for small businesses.",
  //     goal: 10000,
  //     raised: 0,
  //     tokenPerContribution: 1, // 10 tokens per 1 hbar
  //   },
  //   {
  //     id: "campaign2",
  //     title: "Eco-Friendly Initiative",
  //     description:
  //       "Supporting eco-friendly solutions to fight climate change.",
  //     goal: 15000,
  //     raised: 0,
  //     tokenPerContribution: 1, // 8 tokens per 1 hbar
  //   },
  // ];
  const submitContributtion = async (id) => {
    // console.log(contribution[id])
    localStorage.setItem(id, contribution[id])
    try {
      const response = await axios.get('/contribute')
      console.log(response.data)
      
    } catch (error) {
      console.log(error)
    }
  }
  const getRaisedFunds = async (campaign) => {
    try {
      const response = await axios.get('/tokendata',
        {
          params:{
            // 'tokenname':'EchoFr'
            'tokenname': campaign.tokenName
          }
        }
      )
      if(response.status === 200)
        campaign.raised = response.data
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(()=>{
    init_setup(setPairing, hashConnect, setHashConnect)

    campaigns.forEach( campaign => {
      getRaisedFunds(campaign)
    });
    
  },[])

  // useEffect(()=>{
  //   console.log('New pairing data *****>: '+JSON.stringify(pairing))
  // },[pairing])

  // useEffect(()=>{
  //   console.log('New hashConnect *****>: ', hashConnect)
  // },[hashConnect])
  
  return (
    <div className="campaigns-container">
      {/* Loading Popup */}
      {isLoading && (
        <div className="overlay">
          <div className="popup">
            <p>Loading...</p>
          </div>
        </div>
      )}
      {/* Success Popup */}
      {isSuccess && (
        <div className="overlay">
          <div className="popup success">
            <p>Contribution Successful!</p>
            <button onClick={() => setIsSuccess(false)}>Close</button>
          </div>
        </div>
      )}
      {/* Failure Popup */}
      {isFailure && (
        <div className="overlay">
          <div className="popup failure">
            <p>Contribution Failed!</p>
            <button onClick={() => setIsFailure(false)}>Close</button>
          </div>
        </div>
      )}

      {campaigns.map((campaign) => (
        <div key={campaign.id} className="campaign-card">
          <h2>{campaign.title}</h2>
          <p>{campaign.description}</p>
          <p>
            <strong>Funding Goal:</strong> {campaign.goal} hbars
          </p>
          <p>
            <strong>Funds Raised:</strong> {campaign.raised} hbars
          </p>
          <p>
            <strong>Token Allocation:</strong> {campaign.tokenPerContribution}{" "}
            tokens per hbar
          </p>

          <div className="contribution-section">
            <input
              type="number"
              placeholder="Enter contribution"
              value={contribution[campaign.id]}
              onChange={(e) => handleContributionChange(e, campaign.id) }
            />
            <WalletConnectButton campaignId={campaign.id} />
            
            {contribution[campaign.id] && (
              <p>
                You will receive{" "}
                {contribution[campaign.id] * campaign.tokenPerContribution}{" "}
                tokens.
              </p>
            )}
          </div>

          <div className="progress-bar">
            <div
              className="progress"
              style={{
                width: `${(campaign.raised / campaign.goal) * 100}%`,
              }}
            ></div>
          </div>
          <p>
            <strong>Progress:</strong>{" "}
            {((campaign.raised / campaign.goal) * 100).toFixed(2)}%
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;
