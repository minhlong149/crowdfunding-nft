import { http, createConfig } from "wagmi";
import { hardhat, localhost, sepolia } from "wagmi/chains";

export default createConfig({
  chains: [localhost, sepolia, hardhat],
  transports: {
    [localhost.id]: http(),
    [sepolia.id]: http(),
    [hardhat.id]: http(),
  },
  ssr: true,
});
