"use client";

import { useConnect } from "wagmi";

export default function WalletOptions() {
  const { connectors, connect } = useConnect();
  return (
    <div>
      <h2>Connect Wallet</h2>
      {connectors.map((connector) => (
        <button key={connector.uid} onClick={() => connect({ connector })}>
          {connector.name}
        </button>
      ))}
    </div>
  );
}
