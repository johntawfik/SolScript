const cron = require("node-cron");
const MonitorEth = require("./Monitor");

const httpProvider =
  "MY INFURA ROPSTEN KEY";
const to = "MY METAMASK ADDRESS";

async function marketMake() {
  try {
    const monitor = new MonitorEth(httpProvider);
    await monitor.initializeLastSyncedBlock();
    console.log('Looking for transactions...')

    cron.schedule("*/1 * * * *", async () => {
      console.log('Cron started.')
      await monitor.searchTransaction(to);
      console.log('Cron finished.')
      
      //Transaction found, now marketmaking assuming token is minted
    });
  } catch (error) {
    console.log(error);
  }
}

marketMake();
