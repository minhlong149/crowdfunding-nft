"use client";

export default function ProjectContributionForm(props: { projectId: bigint }) {
  function addContribution() {
    // TODO: Allow user to contribute to a project
  }

  return (
    <form onSubmit={addContribution}>
      <input type="number" />
      <button type="submit">Contribute</button>
    </form>
  );
}
