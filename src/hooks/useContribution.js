import { useContext } from "react";
import ContributionContext from "../context/contributionProvider";
const useContribution = ()=>{
    return useContext(ContributionContext)
}
export default useContribution