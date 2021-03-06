import { verifyNonce } from "../../utils/validators"
import { biggestNumber } from "../../utils/converter"
//import BLOCKCHAIN_INFO from "../../../../env"

export const sendEtherFromAccount = (
  id, ethereum, account, sourceToken, sourceAmount,
  destAddress, nonce, gas, gasPrice, keystring, accountType,
  password, networkId) => {

  const txParams = {
    from: account,
    nonce: nonce,
    gasPrice: gasPrice,
    gasLimit: gas,
    to: destAddress,
    value: sourceAmount,
    // EIP 155 chainId - mainnet: 1, ropsten: 3
    chainId: networkId
  }
  return new Promise((resolve, reject) => {
    resolve({ txParams, keystring, password })
  })
}

export const sendTokenFromAccount = (
  id, ethereum, account, sourceToken, sourceAmount,
  destAddress, nonce, gas, gasPrice, keystring, accountType,
  password, networkId) => {

  return new Promise((resolve, reject) => {
    ethereum.call("sendTokenData", sourceToken, sourceAmount, destAddress).then(result => {
      const txParams = {
        from: account,
        nonce: nonce,
        gasPrice: gasPrice,
        gasLimit: gas,
        to: sourceToken,
        value: '0x0',
        data: result,
        // EIP 155 chainId - mainnet: 1, ropsten: 3
        chainId: networkId
      }
      resolve({ txParams, keystring, password })
    })
  })
}

export const etherToOthersFromAccount = (
  id, ethereum, account, sourceToken, sourceAmount, destToken,
  destAddress, maxDestAmount, minConversionRate,
  throwOnFailure, nonce, gas, gasPrice, keystring, accountType,
  password, networkId, kyberNetwork) => {
   // var throwOnFailure = "0x0000000000000000000000000000000000000000"
  return new Promise((resolve, reject) => {
    ethereum.call("exchangeData",
      sourceToken, sourceAmount, destToken, destAddress,
      maxDestAmount, minConversionRate, throwOnFailure).then(result => {
        const txParams = {
          from: account,
          nonce: nonce,
          gasPrice: gasPrice,
          gasLimit: gas,
          to: kyberNetwork,
          value: sourceAmount,
          data: result,
          // EIP 155 chainId - mainnet: 1, ropsten: 3
          chainId: networkId
        }
        resolve({ txParams, keystring, password })
      })
  })
}

export const getAppoveToken = (ethereum, sourceToken, sourceAmount, nonce, gas, gasPrice,
  keystring, password, accountType, account, networkId) => {
  //const approvalData = ethereum.approveTokenData(sourceToken, sourceAmount)  
  return new Promise((resolve, reject) => {
    ethereum.call("approveTokenData", sourceToken, biggestNumber()).then(result => {
      const txParams = {
        from: account,
        nonce: nonce,
        gasPrice: gasPrice,
        gasLimit: gas,
        to: sourceToken,
        value: '0x0',
        data: result,
        // EIP 155 chainId - mainnet: 1, ropsten: 3
        chainId: networkId
      }
      resolve({ txParams, keystring, password })
    })
  })
}

export const tokenToOthersFromAccount = (
  id, ethereum, account, sourceToken, sourceAmount, destToken,
  destAddress, maxDestAmount, minConversionRate,
  throwOnFailure, nonce, gas, gasPrice, keystring, accountType,
  password, networkId, kyberNetwork) => {
  return new Promise((resolve, reject) => {
    ethereum.call("exchangeData",
      sourceToken, sourceAmount, destToken, destAddress,
      maxDestAmount, minConversionRate, throwOnFailure).then(result => {
        const txParams = {
          from: account,
          nonce: nonce,
          gasPrice: gasPrice,
          gasLimit: gas,
          to: kyberNetwork,
          value: '0x0',
          data: result,
          // EIP 155 chainId - mainnet: 1, ropsten: 3
          chainId: networkId
        }
        resolve({ txParams, keystring, password })
      })
  })
}

