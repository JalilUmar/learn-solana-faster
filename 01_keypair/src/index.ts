import { Keypair } from "@solana/web3.js";
import dotenv from "dotenv";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

dotenv.config({
  path: ".env",
});

// Generate a Keypair
// const keypair = Keypair.generate();
// console.log("Keypair Generated!");
// console.log("The publis key is:\n", keypair.publicKey.toBase58());
// console.log("The secret key is:\n", keypair.secretKey);
// console.log("Finished!");

// Loading an existing keypair from an .env file

const existingKeypair = getKeypairFromEnvironment("SECRET_KEY");

console.log("Existing pair:\n", existingKeypair, "\n");
console.log(
  `✅ Finished! We've loaded our secret key securely, using an env file!`
);
