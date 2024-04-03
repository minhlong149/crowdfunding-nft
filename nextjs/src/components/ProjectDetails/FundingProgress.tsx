import { ProjectContext } from "@/lib/context";
import { useContext } from "react";

export default function FundingProgress() {
  const { project } = useContext(ProjectContext);
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
