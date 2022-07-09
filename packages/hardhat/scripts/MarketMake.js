const cron = require("node-cron");
const MonitorEth = require("./Monitor");

//web3 init and enable
import Web3 from 'web3';
const web3 = new Web3(window.ethereum);
const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const mintTokenAddress = "";
await window.ethereum.enable();

//http provider and "to" address init to search blockchain for minting transaction to this address
const httpProvider =
  "https://ropsten.infura.io/v3/de9ff15fada948f98e2396e64a2ccc5e";
const to = "0xca41B719C420AC12b14c4a4F9dCa84922F2ca3BE";

//Creates instance of minting contract
const mint = new web3.eth.Contract(mint.abi, mint.address); //Declare above
mint.methods.mint(to, 10).send(); //Sends transaction to wallet address

//Creates instance of marketmaking contract
const marketContract = new web3.eth.Contract(marketContract.abi, marketContract.address); //Declare both above


async function marketMake() {
  try {
    const monitor = new MonitorEth(httpProvider);
    await monitor.initializeLastSyncedBlock();
    console.log('Looking for transaction')

    cron.schedule("*/1 * * * *", async () => {
      console.log('Cron job started.')
      await monitor.searchTransaction(to);
      console.log('Cron job finished.')
      
      //Transaction found, now marketmaking assuming token is minted
      marketContract.methods.addLiquidity(mintTokenAddress, WETH , 1, 1).send();
      console.log('liquidity inputted');
      marketContract.methods.removeLiquidity(mintTokenAddress, WETH).send(); //Check remove.js file, only purpose is to remove liquidity which allows liquidity to be removed upon user request and not automatically
      console.log('liquidity removed'); 
    });
  } catch (error) {
    console.log(error);
    console.log("");
    console.log("Transaction not found due to error or other factor, see above for reference");
  }
}

marketMake();
