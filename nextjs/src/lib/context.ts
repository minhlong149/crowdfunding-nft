import { ProjectDetails } from "@/lib/types";
import { createContext } from "react";

export interface ProjectContextType {
  project: ProjectDetails;
}

export const ProjectContext = createContext<ProjectContextType>(
  {} as ProjectContextType,
);
