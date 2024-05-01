"use client";

import { useState } from "react";
import * as web3 from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Movie } from "@/utils/Movie";

export default function SubmitReviewForm() {
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const handleTransactionSubmit = async (event: any) => {
    if (!publicKey) {
      alert("Please connect your wallet first!");
      return;
    }
    event.preventDefault();
    console.log("Processing transaction ...");

    const movie = new Movie(title, rating, review);
    const buffer = movie.serialize();
    const transaction = new web3.Transaction();

    const [pda] = await web3.PublicKey.findProgramAddressSync(
      [publicKey.toBuffer(), new TextEncoder().encode(movie.title)],
      new web3.PublicKey("CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN")
    );
    const instruction = new web3.TransactionInstruction({
      keys: [
        {
          pubkey: publicKey,
          isSigner: true,
          isWritable: false,
        },
        {
          pubkey: pda,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: web3.SystemProgram.programId,
          isSigner: false,
          isWritable: false,
        },
      ],
      programId: new web3.PublicKey(
        "CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN"
      ),
      data: buffer,
    });
    transaction.add(instruction);

    try {
      let txid = await sendTransaction(transaction, connection);
      console.log(
        `Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`
      );
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };
  return (
    <form
      onSubmit={() => console.log("Hello")}
      className="grid justify-center items-center mt-[120px] gap-y-2 font-sans w-[600px] py-[20px] border rounded "
    >
      <h1 className="text-white text-center text-3xl font-sans font-bold">
        Submit Review
      </h1>
      <span>
        <p className="text-white">Movie Title</p>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter movie title"
          className="w-[500px] text-lg py-1 px-2 rounded"
        />
      </span>
      <span>
        <p className="text-white">Add your review</p>
        <textarea
          placeholder="Review"
          value={review}
          required
          onChange={(e) => setReview(e.target.value)}
          rows={6}
          className="w-[500px] text-lg py-1 px-2 rounded"
        />
      </span>

      <span>
        <p className="text-white">Rating</p>
        <input
          type="number"
          placeholder="Rating"
          value={rating}
          required
          onChange={(e) => setRating(parseInt(e.target.value))}
          min={0}
          max={10}
          className="w-[500px] text-lg py-1 px-2 rounded"
        />
      </span>
      <button
        className="bg-blue-700 p-4 rounded-lg text-white hover:bg-blue-900 transition-all active:scale-95"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
