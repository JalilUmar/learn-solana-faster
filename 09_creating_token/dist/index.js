// Create a solana Tokens With The Token Program
console.log(`Create a solana Tokens With The Token Program`);
import { initializeKeypair } from "@solana-developers/helpers";
import * as token from "@solana/spl-token";
import * as web3 from "@solana/web3.js";
async function createNewMint(connection, payer, mintAuthority, freezeAuthority, decimal) {
    const tokenMint = await token.createMint(connection, payer, mintAuthority, freezeAuthority, decimal);
    console.log(`Token Mint: https://explorer.solana.com/address/${tokenMint}?cluster=devnet`);
    return tokenMint;
}
async function createTokenAccount(connection, payer, mint, owner) {
    const tokenAccount = await token.getOrCreateAssociatedTokenAccount(connection, payer, mint, owner);
    console.log(`Token Account: https://explorer.solana.com/address/${tokenAccount.address}?cluster=devnet`);
    return tokenAccount;
}
async function mintTokens(connection, payer, mint, destination, authority, amount) {
    const transactionSignature = await token.mintTo(connection, payer, mint, destination, authority, amount);
    console.log(`Mint Token Transaction: https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`);
}
async function transferTokens(connection, payer, source, destination, owner, amount) {
    const transactionSignature = await token.transfer(connection, payer, source, destination, owner, amount);
    console.log(`Transfer Transaction: https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`);
}
async function approveDelegate(connection, payer, account, delegate, owner, amount) {
    const transactionSignature = await token.approve(connection, payer, account, delegate, owner, amount);
    console.log(`Approve Delegate Transaction: https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`);
}
async function revokeDelegate(connection, payer, account, owner) {
    const transactionSignature = await token.revoke(connection, payer, account, owner);
    console.log(`Revote Delegate Transaction: https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`);
}
async function burnTokens(connection, payer, account, mint, owner, amount) {
    const transactionSignature = await token.burn(connection, payer, account, mint, owner, amount);
    console.log(`Burn Transaction: https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`);
}
async function main() {
    const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
    const user = await initializeKeypair(connection);
    const mint = await createNewMint(connection, user, user.publicKey, user.publicKey, 2);
    const mintInfo = await token.getMint(connection, mint);
    const tokenAccount = await createTokenAccount(connection, user, mint, user.publicKey);
    await mintTokens(connection, user, mint, tokenAccount.address, user, 100 * 10 ** mintInfo.decimals);
    const receiver = web3.Keypair.generate().publicKey;
    const receiverTokenAccount = await createTokenAccount(connection, user, mint, receiver);
    const delegate = web3.Keypair.generate();
    await approveDelegate(connection, user, tokenAccount.address, delegate.publicKey, user.publicKey, 50 * 10 ** mintInfo.decimals);
    await transferTokens(connection, user, tokenAccount.address, receiverTokenAccount.address, delegate, 50 * 10 ** mintInfo.decimals);
    await revokeDelegate(connection, user, tokenAccount.address, user.publicKey);
    await burnTokens(connection, user, tokenAccount.address, mint, user, 25 * 10 ** mintInfo.decimals);
}
main();
