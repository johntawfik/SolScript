const cron = require("node-cron");
const MonitorEth = require("./Monitor");

//web3 init and enable
import Web3 from 'web3';
const web3 = new Web3(window.ethereum);
await window.ethereum.enable();

//http provider and "to" address init to search blockchain for minting transaction to this address
const httpProvider =
  "MY INFURA ROPSTEN KEY";
const to = "MY METAMASK ADDRESS";

//Creates instance of minting contract
const mint = new web3.eth.Contract(mint.abi, mint.address); //Declare above
mint.methods.mint(to, 10).send(); //Sends transaction to wallet address

//Creates instance of marketmaking contract
const marketContract = new web3.eth.Contract(marketContract.abi, marketContract.address); //Declare both above


async function marketMake() {
  try {
    const monitor = new MonitorEth(httpProvider);
    await monitor.initializeLastSyncedBlock();
    console.log('Looking for transactions...')

    cron.schedule("*/1 * * * *", async () => {
      console.log('Cron job started.')
      await monitor.searchTransaction(to);
      console.log('Cron job finished.')
      
      //Transaction found, now marketmaking assuming token is minted
      marketContract.methods.addLiquidity(params).send();
      console.log("liquidity inputted");
      marketContract.methods.removeLiquidity(params).send();
      console.log("liquidity removed"); //for front-end applications we can separate the input and removal of liquidity based off buttons and show/hide button rendering using ternary operators
    });
  } catch (error) {
    console.log(error);
    console.log("");
    console.log("Transaction not found due to error or other factor, see above for reference");
  }
}

marketMake();
