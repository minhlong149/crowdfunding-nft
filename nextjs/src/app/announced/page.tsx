import ProjectAnnouncementForm from "@/components/Announced/NewProjectForm";
import AnnouncedProjects from "@/components/Announced/Projects";

export default function AnnouncePage() {
  return (
    <div>
      <ProjectAnnouncementForm />
      <AnnouncedProjects />
    </div>
  );
}
