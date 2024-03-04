"use client";

import Account from "@/components/ConnectWallet/Account";
import WalletOptions from "@/components/ConnectWallet/WalletOptions";
import Navigation from "@/components/Header/Navigation";
import { useAccount } from "wagmi";

export default function Header() {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return <WalletOptions />;
  }

  return (
    <>
      <Account />
      <Navigation />
    </>
  );
}
