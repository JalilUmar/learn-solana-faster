"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const helpers_1 = require("@solana-developers/helpers");
dotenv_1.default.config({
    path: ".env",
});
// Generate a Keypair
// const keypair = Keypair.generate();
// console.log("Keypair Generated!");
// console.log("The publis key is:\n", keypair.publicKey.toBase58());
// console.log("The secret key is:\n", keypair.secretKey);
// console.log("Finished!");
// Loading an existing keypair from an .env file
const existingKeypair = (0, helpers_1.getKeypairFromEnvironment)("SECRET_KEY");
console.log("Existing pair:\n", existingKeypair, "\n");
console.log(`✅ Finished! We've loaded our secret key securely, using an env file!`);
