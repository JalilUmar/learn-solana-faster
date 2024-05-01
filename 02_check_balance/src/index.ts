// Checking balance of a specific account on solana:

import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import dotenv from "dotenv";
dotenv.config();

const publicKey = new PublicKey(process.env.PUBLIC_KEY as string);

// Friend's account public key:
// const publicKey = new PublicKey("31ZdXAvhRQyzLC2L97PC6Lnf2yWgHhQUKKYoUo9MLQF5");

// Handling invalid wallet addresses:
if (!publicKey) {
  console.log("Invalid wallet address");
}

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const balanceInLamports = await connection.getBalance(publicKey);

const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL;

console.log("💰 Finished!");
console.log("Balance in Lamports: ", balanceInLamports);
console.log("Balance in Sol: ", balanceInSol);
