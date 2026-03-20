"use client";

import { useEffect, useState } from "react";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_SIMPLE_STORAGE_ADDRESS || "";
const SIMPLE_STORAGE_ABI = JSON.parse(
  process.env.NEXT_PUBLIC_SIMPLE_STORAGE_ABI || "[]"
);

function normalizeValue(result) {
  if (result === null || result === undefined) {
    return "";
  }

  if (typeof result === "object" && typeof result.toString === "function") {
    return result.toString();
  }

  return String(result);
}

function getConnectedWalletAddress() {
  if (typeof window === "undefined") {
    return "";
  }

  return window.tronWeb?.defaultAddress?.base58 || "";
}

export default function HomePage() {
  const [inputValue, setInputValue] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [status, setStatus] = useState(
    "Connect TronLink on Nile, then use the buttons below."
  );
  const [txId, setTxId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReading, setIsReading] = useState(false);

  useEffect(() => {
    const syncWalletAddress = () => {
      const address = getConnectedWalletAddress();

      if (!address) {
        return;
      }

      setWalletAddress(address);
      setStatus((currentStatus) =>
        currentStatus === "Connect TronLink on Nile, then use the buttons below."
          ? "Wallet detected. You can now read or update the contract."
          : currentStatus
      );
    };

    syncWalletAddress();

    const intervalId = window.setInterval(syncWalletAddress, 500);

    return () => window.clearInterval(intervalId);
  }, []);

  async function ensureWallet() {
    if (typeof window === "undefined") {
      throw new Error("This page must run in the browser.");
    }

    if (!CONTRACT_ADDRESS) {
      throw new Error(
        "Missing SIMPLE_STORAGE_ADDRESS in the root .env file."
      );
    }

    if (!window.tronLink?.request) {
      throw new Error("TronLink was not found. Install the extension first.");
    }

    if (!window.tronWeb?.defaultAddress?.base58) {
      await window.tronLink.request({ method: "tron_requestAccounts" });
    }

    const tronWeb = window.tronWeb;
    const address = getConnectedWalletAddress();

    if (!tronWeb || !address) {
      throw new Error("TronLink is not unlocked or connected yet.");
    }

    setWalletAddress(address);
    return tronWeb;
  }

  async function getContract() {
    const tronWeb = await ensureWallet();

    try {
      return await tronWeb.contract(SIMPLE_STORAGE_ABI, CONTRACT_ADDRESS);
    } catch {
      return tronWeb.contract().at(CONTRACT_ADDRESS);
    }
  }

  async function handleGetValue() {
    setIsReading(true);
    setStatus("Reading the current value...");
    setTxId("");

    try {
      const contract = await getContract();
      const value = await contract.getValue().call();
      setCurrentValue(normalizeValue(value));
      setStatus("Value loaded successfully.");
    } catch (error) {
      setStatus(error.message || "Failed to read the current value.");
    } finally {
      setIsReading(false);
    }
  }

  async function handleSetValue(event) {
    event.preventDefault();

    if (!/^\d+$/.test(inputValue.trim())) {
      setStatus("Enter a whole number before submitting.");
      return;
    }

    setIsSubmitting(true);
    setStatus("Waiting for TronLink signature...");
    setTxId("");

    try {
      const contract = await getContract();
      const transactionId = await contract.setValue(inputValue.trim()).send();

      setTxId(transactionId);
      setStatus("Transaction sent. Refreshing the contract value...");

      const value = await contract.getValue().call();
      setCurrentValue(normalizeValue(value));
      setStatus("Value updated successfully.");
      setInputValue("");
    } catch (error) {
      setStatus(error.message || "Failed to update the value.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="page">
      <section className="card">
        <p className="eyebrow">TRON Workshop Demo</p>
        <h1>Simple Storage dApp</h1>
        <p className="intro">
          This frontend talks to the deployed <code>SimpleStorage</code>{" "}
          contract using TronLink.
        </p>

        <div className="details">
          <div>
            <span>Contract</span>
            <code>{CONTRACT_ADDRESS || "Missing root .env value"}</code>
          </div>
          <div>
            <span>Wallet</span>
            <code>{walletAddress || "Not connected yet"}</code>
          </div>
          <div>
            <span>Current Value</span>
            <strong>{currentValue || "-"}</strong>
          </div>
        </div>

        <form className="form" onSubmit={handleSetValue}>
          <label htmlFor="value">New Value</label>
          <input
            id="value"
            type="number"
            min="0"
            step="1"
            inputMode="numeric"
            placeholder="Enter a number"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />

          <div className="actions">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Set Value"}
            </button>
            <button
              type="button"
              className="secondary"
              onClick={handleGetValue}
              disabled={isReading}
            >
              {isReading ? "Loading..." : "Get Value"}
            </button>
          </div>
        </form>

        <p className="status">{status}</p>

        {txId ? (
          <p className="tx">
            Last transaction:{" "}
            <a
              href={`https://nile.tronscan.org/#/transaction/${txId}`}
              target="_blank"
              rel="noreferrer"
            >
              {txId}
            </a>
          </p>
        ) : null}
      </section>
    </main>
  );
}
