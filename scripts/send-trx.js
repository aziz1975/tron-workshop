require("dotenv").config();
const { TronWeb } = require("tronweb");

async function main() {
  const tronWeb = new TronWeb({
    fullHost: process.env.NILE_FULL_HOST,
    privateKey: process.env.NILE_PRIVATE_KEY_A,
  });

  const to = process.env.ADDRESS_B;
  if (!to) {
    throw new Error("Missing ADDRESS_B in .env");
  }

  const amountInTrx = 1;
  const amountInSun = tronWeb.toSun(amountInTrx);

  const result = await tronWeb.trx.sendTransaction(to, amountInSun);
  console.log("TRX transfer result:", result);
  console.log("TRX txid:", result.txid || result.transaction?.txID);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});