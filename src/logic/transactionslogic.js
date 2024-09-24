

export const signMessage = async (hashConnect, pairing) => {
    
    try {
        
        let signature = await hashConnect.signMessages(pairing.accountIds[0], 'Please Sign This message');
        // console.log(signature)
    } catch (error) {
        console.log(error)
        
    }
}

// export const executeTransaction = async (hashconnect, pairing, amount) => {
    
//     await mintOnServer(pairing.accountIds[0], amount)
//     return
//     try
//     {
        
//         let signer = hashconnect.getSigner(pairing.accountIds[0]);
//         let trans = await new TransferTransaction()
//             .addHbarTransfer(pairing.accountIds[0], -amount)
//             .addHbarTransfer( appWallet , amount)
//             .freezeWithSigner(signer);

//         let response = await trans.executeWithSigner(signer);
//     }catch (error) {
//         console.log(error)
        
//     }
// }
// export const mintOnServer = async (address, contribution) => {
  
//     try {
//         const result = await axios.post('token/tech/',
//             {
//                 'address': address,
//                 'contribution' : contribution
//             }
//         )
//         if(result.status==200)
//             console.log('Showing success UI')
//         else
//             console.log('unkown result')
        
//     } catch (error) {
//         console.error(error.message)
//     }
// }