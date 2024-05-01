"use client";
import { FC } from "react";
import styles from "../styles/Home.module.css";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Image from "next/image";

export const AppBar: FC = () => {
  return (
    <div
      className={`flex justify-between items-center flex-wrap px-20 bg-black text-white py-2`}
    >
      <Image alt="" src="/solanaLogo.png" height={30} width={200} />
      <span className="text-4xl font-sans font-bold ">
        Solana Movie Reviews
      </span>

      <span className="bg-blue-700 p-4 rounded-lg flex">
        <WalletMultiButton />
      </span>
    </div>
  );
};
