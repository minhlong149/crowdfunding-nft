"use client";

import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { usePublicClient } from "wagmi";

import { ProjectContext } from "@/lib/context";
import { crowdfundingNftAbi, crowdfundingNftAddress } from "@/lib/contracts";

export default function TransactionHistory() {
  const { project } = useContext(ProjectContext);

  const publicClient = usePublicClient();
  const { data, isPending, refetch } = useQuery({
    queryKey: ["contributionLogs"],
    queryFn: () =>
      publicClient?.getContractEvents({
        abi: crowdfundingNftAbi,
        address: crowdfundingNftAddress,
        eventName: "ContributionLog",
        fromBlock: "earliest",
        toBlock: "latest",
      }),
  });

  useEffect(() => {
    refetch();
  }, [project]);

  if (isPending) {
    return <p>Loading transaction history...</p>;
  }

  if (data === undefined) {
    return <></>;
  }

  const transactions = data
    .filter(({ args }) => args.projectId === project.id)
    .reverse();

  if (transactions.length === 0) {
    return <p>No transactions yet</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Contributor</th>
          <th scope="col">Amount</th>
          <th scope="col">Transaction Hash</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.transactionHash}>
            <td>{transaction.args.contributor}</td>
            <td>{transaction.args.amount?.toLocaleString()} ETH</td>
            <td>{transaction.transactionHash}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
