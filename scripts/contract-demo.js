require("dotenv").config();
const { TronWeb } = require("tronweb");

async function main() {
  const tronWeb = new TronWeb({
    fullHost: process.env.NILE_FULL_HOST,
    privateKey: process.env.NILE_PRIVATE_KEY_A,
  });

  const contractAddress = process.env.SIMPLE_STORAGE_ADDRESS;
  if (!contractAddress) {
    throw new Error("Missing SIMPLE_STORAGE_ADDRESS in .env");
  }

  const contract = await tronWeb.contract().at(contractAddress);

  const beforeValue = await contract.getValue().call();
  console.log("Value before:", beforeValue.toString());

  const txid = await contract.setValue(99).send({
    feeLimit: 100_000_000,
  });
  console.log("setValue txid:", txid);

  const afterValue = await contract.getValue().call();
  console.log("Value after:", afterValue.toString());
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});