import ProjectDetails from "@/components/ProjectDetails/ProjectDetails";

export default function Page({ params }: { params: { id: bigint } }) {
  return <ProjectDetails id={params.id} />;
}
