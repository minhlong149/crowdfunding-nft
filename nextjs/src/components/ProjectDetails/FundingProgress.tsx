export default function FundingProgress(project: { fund: bigint; goal: bigint }) {
  const fund = Number(project.fund);
  const goal = Number(project.goal);
  const percentage = ((fund / goal) * 100).toFixed(2);
  return (
    <div>
      <progress value={fund} max={goal}>
        {percentage}%
      </progress>
      <p>
        {fund}/{goal} ETH
      </p>
    </div>
  );
}
