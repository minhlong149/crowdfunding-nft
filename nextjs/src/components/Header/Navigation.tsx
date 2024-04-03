"use client";

import Link from "next/link";
import { useAccount } from "wagmi";

import WalletOptions from "./WalletOptions";

export default function Navigation() {
  const { address, isConnected } = useAccount();
  return (
    <nav>
      <ul>
        <li>{address}</li>
      </ul>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {isConnected ? (
          <>
            <li>
              <Link href="/contributed">Contribution</Link>
            </li>
            <li>
              <Link href="/announced">Your project</Link>
            </li>
          </>
        ) : (
          <></>
        )}
        <li>
          <WalletOptions />
        </li>
      </ul>
    </nav>
  );
}
