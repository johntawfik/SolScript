//Init, consts, and contract inits
import Web3 from 'web3';
const web3 = new Web3(window.ethereum);
const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const mintTokenAddress = "";
await window.ethereum.enable();
const to = "0xca41B719C420AC12b14c4a4F9dCa84922F2ca3BE";
const marketContract = new web3.eth.Contract(marketContract.abi, marketContract.address); //Declare both above


async function removeLiquidity(){
  try{
    marketContract.methods.removeLiquidity(mintTokenAddress, WETH).send(); //Check remove.js file, only purpose is to remove liquidity which allows liquidity to be removed upon user request and not automatically
    console.log("liquidity removed"); 
  }
  catch(error){
    console.log(error)
    console.log('could not remove liquidity, see above for error')
  }
}
