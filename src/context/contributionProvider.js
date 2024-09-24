import { useState } from "react";
import { createContext } from "react";

const ContributionContext = createContext({})

export const ContributionProvider =({children})=>{

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFailure, setIsFailure] = useState(false);
    const [campaigns, setCampaigns] = useState([
        {
          id: "campaign1",
          title: "Tech Innovation Project",
          tokenName:"TeckInov",
          description:
            "A project to develop innovative tech solutions for small businesses.",
          goal: 10000,
          raised: 0,
          tokenPerContribution: 1, // 10 tokens per 1 hbar
        },
        {
          id: "campaign2",
          title: "Eco-Friendly Initiative",
          tokenName:"EchoFr",
          description:
            "Supporting eco-friendly solutions to fight climate change.",
          goal: 15000,
          raised: 0,
          tokenPerContribution: 1, // 8 tokens per 1 hbar
        },
      ]);
    // const [contribution, setContribution] = useState({});
    return(
        <ContributionContext.Provider value={{isLoading, setIsLoading, isSuccess, setIsSuccess, isFailure, setIsFailure, campaigns, setCampaigns}}>
            {children}
        </ContributionContext.Provider>
    )
}
export default ContributionContext