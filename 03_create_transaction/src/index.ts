// Creating Transactions on solana blockchain network:
console.log("Creating Transactions on Solana Blockchain Network");

import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import {
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});

// Destination public address:

const createTransaction = async (recieverKey: string, amountToSend: number) => {
  try {
    const recieverPublicKey = new PublicKey(recieverKey);

    // Handling invalid wallet addresses:
    if (!recieverPublicKey) {
      console.log("Invalid wallet address");
    }

    const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");

    const connection = new Connection(
      "https://api.devnet.solana.com",
      "confirmed"
    );

    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash();
    const transaction = new Transaction({ blockhash, lastValidBlockHeight });

    const sendSolInstruction = SystemProgram.transfer({
      fromPubkey: recieverPublicKey,
      toPubkey: senderKeypair.publicKey,
      lamports: amountToSend * LAMPORTS_PER_SOL,
    });

    transaction.add(sendSolInstruction);

    transaction.partialSign(senderKeypair);

    const signature = await sendAndConfirmTransaction(connection, transaction, [
      senderKeypair,
    ]);

    console.log(
      `💸 Finished! Sent ${amountToSend} to the address ${recieverKey}. `
    );
    console.log(`Transaction signature is ${signature}!`);
  } catch (error) {
    console.log("Ooops! Something went wrong.\n", error);
  }
};

createTransaction("31ZdXAvhRQyzLC2L97PC6Lnf2yWgHhQUKKYoUo9MLQF5", 5000);
