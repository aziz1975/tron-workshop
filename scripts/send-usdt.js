require("dotenv").config();
const { TronWeb } = require("tronweb");

async function main() {
  const tronWeb = new TronWeb({
    fullHost: process.env.NILE_FULL_HOST,
    privateKey: process.env.NILE_PRIVATE_KEY_A,
  });

  const contractAddress = process.env.USDT_CONTRACT;
  const to = process.env.ADDRESS_B;

  if (!contractAddress) {
    throw new Error("Missing USDT_CONTRACT in .env");
  }
  if (!to) {
    throw new Error("Missing ADDRESS_B in .env");
  }

  const usdt = await tronWeb.contract().at(contractAddress);

  const decimals = Number(await usdt.decimals().call());
  const amount = 1 * 10 ** decimals; // 1 USDT

  const txid = await usdt.transfer(to, amount).send({
    feeLimit: 100_000_000,
  });

  console.log("USDT transfer txid:", txid);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});