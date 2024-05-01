import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { AppBar } from "../components/appBar";
import SubmitReviewForm from "../components/submitReviewForm";

export default function Home() {
  return (
    <main className="bg-gray-500 h-screen ">
      <AppBar />
      <div className="grid justify-center">
        <SubmitReviewForm />
      </div>
    </main>
  );
}
