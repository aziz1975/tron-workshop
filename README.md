# TRON UPenn Workshop Starter

A GitHub-ready starter project for a TRON workshop. It gives participants one clean path to:

1. connect to **Nile testnet**
2. compile and deploy a simple Solidity contract with **TronBox**
3. interact with the deployed contract using **TronWeb**
4. send **TRX** from Address A to Address B
5. send **USDT / TRC-20** from Address A to Address B

This is designed as a **starting point** for hackathon teams. They can clone it, get it running, and then extend it into Payments, Infrastructure, or AI projects.

## What this repo includes

- `SimpleStorage.sol` — a tiny contract for compile + deploy + contract call demo
- `tronbox.js` — Nile deployment config
- `scripts/contract-demo.js` — reads and updates contract state
- `scripts/send-trx.js` — sends 1 TRX from A to B
- `scripts/send-usdt.js` — sends 1 token from A to B

---

## What students will learn

- how to use **Nile** for testing
- how to fund a test wallet with **TRX** and **USDT**
- the difference between **TRX transfers** and **TRC-20 transfers**
- why **Energy** and **Bandwidth** matter
- how to deploy a contract and verify the transaction in the explorer
- how to use one project as the starting point for a dApp

TRON’s official docs say Nile is the supported testnet path for development, and they list the Nile endpoint and test token process.  
Sources: [Connect to the TRON network](https://developers.tron.network/docs/connect-to-the-tron-network), [Getting testnet tokens on TRON](https://developers.tron.network/docs/getting-testnet-tokens-on-tron)

---

## Prerequisites

Install:

- **Node.js 22+ LTS**
- **npm**
- a TRON wallet such as **TronLink**

Use **two fresh Nile test wallets only**.

Do **not** import a real mainnet wallet or seed phrase into this workshop project. TRON’s latest testnet-token guide explicitly recommends a dedicated wallet for testing.  
Source: [Getting testnet tokens on TRON](https://developers.tron.network/docs/getting-testnet-tokens-on-tron)

---

## Step 1 — Create two Nile test wallets

Create two addresses:

- **Address A** — sender / deployer
- **Address B** — receiver

You will use:

- `PRIVATE_KEY_A`
- `ADDRESS_A`
- `ADDRESS_B`

You can create test wallets with TronLink and switch to Nile.  
Source: [Getting testnet tokens on TRON](https://developers.tron.network/docs/getting-testnet-tokens-on-tron)

---

## Step 2 — Fund the wallets

Use the official Nile faucet page:

- Nile faucet: `https://nileex.io/join/getJoinPage`

Or use the official community bot commands:

- `!nile <your_address>` for Nile TRX
- `!nile_usdt <your_address>` for Nile USDT

Official docs also recommend verifying results in the Nile explorer:

- Nile explorer: `https://nile.tronscan.org`

Source: [Getting testnet tokens on TRON](https://developers.tron.network/docs/getting-testnet-tokens-on-tron)

### Recommended workshop setup

Before the live workshop:

- fund **Address A** with Nile TRX and Nile USDT
- fund **Address B** with some Nile TRX too

This makes the demo smoother because:

- **TRX transfer** uses Bandwidth
- **contract deployment** uses smart contract execution resources
- **TRC-20 transfer** also uses smart contract execution resources

If resources are insufficient, TRX can be burned to cover the cost.  
Source: [Resource Model](https://developers.tron.network/docs/resource-model)

---

## Step 3 — Install dependencies

```bash
npm install
```

TronBox is the official smart contract development and deployment tool for TRON, and its configuration docs show Nile with `https://nile.trongrid.io` and `network_id: "3"`.  
Sources: [TronBox docs](https://tronbox.io/docs/reference/configuration), [TRON TronBox overview](https://developers.tron.network/v4.4.2/docs/tronbox)

---

## Step 4 — Configure environment variables

Copy the example file:

```bash
cp .env.example .env
```

Then fill in:

```env
NILE_FULL_HOST=https://nile.trongrid.io

NILE_PRIVATE_KEY_A=<Your Private Key>

ADDRESS_A=<Your Address A>
ADDRESS_B=<Your Address B>

USDT_CONTRACT=TXYZopYRdj2D9XRtbG411XZZ3kM5VkAeBf
SIMPLE_STORAGE_ADDRESS=<After deploying the contract put it here>

```

### Notes

- `USDT_CONTRACT` is for the **official Nile USDT contract** if you want to use faucet USDT.
- `SIMPLE_STORAGE_ADDRESS` is filled after deployment.

TRON’s current network docs list Nile with `https://nile.trongrid.io`.  
Source: [Connect to the TRON network](https://developers.tron.network/docs/connect-to-the-tron-network)

---

## Step 5 — Compile the contracts

```bash
npm run compile
```

This compiles:

- `SimpleStorage.sol`

---

## Step 6 — Deploy to Nile

```bash
npm run deploy:nile
```

This deploys:

- `SimpleStorage`

### After deployment

Copy the deployed contract addresses into `.env`:

- `SIMPLE_STORAGE_ADDRESS=<deployed SimpleStorage address>`

If you want to use **official Nile USDT**, set:

- `USDT_CONTRACT=<official Nile USDT contract address>`


TronBox’s config reference shows the standard Nile deployment setup with `fullHost: 'https://nile.trongrid.io'` and `network_id: '3'`.  
Source: [TronBox configuration](https://tronbox.io/docs/reference/configuration)

---

## Step 7 — Interact with the deployed contract

Run:

```bash
npm run demo:contract
```

What this does:

- reads the current stored value
- sends a transaction to update the value to `99`
- reads the value again
- prints the transaction id and Nile explorer link

This teaches the two most important TronWeb contract patterns:

- `.call()` for read-only calls
- `.send()` for state-changing transactions

TronWeb is TRON’s JavaScript SDK for building dApps and interacting with full-node APIs.  
Source: [TronWeb intro](https://developers.tron.network/v4.0/docs/tron-web-intro)

---

## Step 8 — Send a simple TRX transfer

Run:

```bash
npm run send:trx
```

What this does:

- sends `1 TRX` from **Address A** to **Address B**
- prints the tx id
- prints the Nile explorer link

TronWeb’s current API docs still document `tronWeb.trx.sendTransaction(toAddress, amount)` for native TRX transfers.  
Source: [TronWeb sendTransaction](https://tronweb.network/docu/docs/API%20List/trx/sendTransaction/)

---

## Step 9 — Send a simple USDT / TRC-20 transfer

Run:

```bash
npm run send:usdt
```

What this does:

- uses `USDT_CONTRACT` if provided
- sends `1` token from **Address A** to **Address B**
- prints the tx id
- prints the Nile explorer link

### Why this matters

A TRC-20 transfer is a **smart contract call**, so it uses **Energy**.  
A native TRX transfer is a normal transfer and primarily uses **Bandwidth**.

Source: [Resource Model](https://developers.tron.network/docs/resource-model)

---

---

## How to verify transactions in the explorer

For every transaction:

1. copy the printed tx id
2. open `https://nile.tronscan.org`
3. paste the tx id into the search box
4. inspect:
   - status
   - from / to
   - token or TRX amount
   - contract interaction details

The official testnet-token guide explicitly points developers to the Nile explorer for transaction verification.  
Source: [Getting testnet tokens on TRON](https://developers.tron.network/docs/getting-testnet-tokens-on-tron)

---

## Workshop demo order

Use this live sequence:

1. show Address A and Address B on Nile
2. show that Address A has Nile TRX and Nile USDT
3. run `npm run compile`
4. run `npm run deploy:nile`
5. update `.env` with deployed addresses
6. run `npm run demo:contract`
7. verify the tx in Nile explorer
8. run `npm run send:trx`
9. verify the TRX tx in Nile explorer
10. run `npm run send:usdt`
11. verify the token tx in Nile explorer

That gives students one complete end-to-end example of:

- deploy contract
- call contract
- send native TRX
- send a token
- verify everything on-chain

---


### Recommended approach

- **Preferred path:** use official **Nile USDT** from the faucet / bot

This way, students still learn the same TRC-20 interaction flow even if the faucet is delayed.

---

## Resource model in simple language

Use this explanation with students:

- **Bandwidth** is used for ordinary transactions like TRX transfers
- **Energy** is used for smart contract execution, such as deploying contracts and calling TRC-20 token contracts
- if your account does not have enough Bandwidth or Energy, TRX can be burned to pay for the missing resources

Source: [Resource Model](https://developers.tron.network/docs/resource-model)

---

## Important security note

This starter repo uses private keys in `.env` because it is meant for a **controlled workshop demo** and **local scripts**.

Do **not** put private keys in frontend code or public repos.

For real dApps, use a wallet-based flow such as:

- TronLink
- WalletConnect-TRON

TRON’s deployment docs and dApp docs recommend wallet-connected flows for production-style applications.  
Source: [Deploying](https://developers.tron.network/docs/deploying)

---

## Common issues

### 1) Contract deploy fails

Most common causes:

- not enough Nile TRX
- not enough resources
- wrong private key
- wrong network

### 2) TRX transfer fails

Most common causes:

- invalid receiver address
- sender has no Nile TRX
- wrong network

### 3) USDT transfer fails

Most common causes:

- `USDT_CONTRACT` is empty or wrong
- sender does not hold Nile USDT
- sender has not enough TRX / Energy for the contract call
- wrong network

### 4) Explorer shows nothing

Most common causes:

- transaction id copied incorrectly
- searching on the wrong explorer
- transaction still propagating

---

## Suggested extensions for hackathon teams

Once students get this starter working, they can extend it into:

### Payments

- invoice creation
- merchant checkout
- payroll flows
- recurring or scheduled payouts
- B2B payment dashboard

### Infrastructure

- transaction preflight checker
- developer CLI
- better error reporting
- framework plugin
- SDK wrapper

### AI

- agentic commerce flow
- x402-style payment gate
- trust and discovery layer
- safe signing / OPSEC tooling

---

## Quick command summary

```bash
npm install
cp .env.example .env

npm run compile
npm run deploy:nile

# update .env with SIMPLE_STORAGE_ADDRESS

npm run demo:contract
npm run send:trx
npm run send:usdt
```

---

## Official references

- [Connect to the TRON network](https://developers.tron.network/docs/connect-to-the-tron-network)
- [Getting testnet tokens on TRON](https://developers.tron.network/docs/getting-testnet-tokens-on-tron)
- [Resource Model](https://developers.tron.network/docs/resource-model)
- [Deploying](https://developers.tron.network/docs/deploying)
- [TronBox configuration](https://tronbox.io/docs/reference/configuration)
- [TronWeb sendTransaction](https://tronweb.network/docu/docs/API%20List/trx/sendTransaction/)
- [TronWeb intro](https://developers.tron.network/v4.0/docs/tron-web-intro)
