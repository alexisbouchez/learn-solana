import { useState } from "react";
import "./App.css";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";

function App() {
  const [publicAddress, setPublicAddress] = useState<string>("");
  const [balance, setBalance] = useState<number>(0);
  const [error, setError] = useState<string>("");

  async function getBalanceUsingWeb3(address: PublicKey): Promise<number> {
    const connection = new Connection(clusterApiUrl("devnet"));
    return connection.getBalance(address);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const publicKey = new PublicKey(publicAddress);
      const balance = await getBalanceUsingWeb3(publicKey);
      setBalance(balance / LAMPORTS_PER_SOL);
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <h1>Solana Balance Checker</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="publicAddress">Public Address</label>
          <br />
          <input
            name="publicAddress"
            id="publicAddress"
            type="text"
            value={publicAddress}
            onChange={(e) => setPublicAddress(e.target.value)}
          />
        </div>

        <button type="submit">Check SOL Balance</button>
      </form>

      <div>
        <h2>Balance: {balance} SOL</h2>
      </div>

      {error && <p>{error}</p>}
    </div>
  );
}

export default App;
