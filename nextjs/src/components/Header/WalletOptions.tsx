"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function WalletOptions() {
  const { isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return <button onClick={() => disconnect()}>Disconnect</button>;
  }

  return (
    <details className="dropdown">
      <summary role="button">Connect Wallet</summary>
      <ul>
        {connectors.map((connector) => (
          <li key={connector.uid} onClick={() => connect({ connector })}>
            <a href="#">{connector.name}</a>
          </li>
        ))}
      </ul>
    </details>
  );
}
