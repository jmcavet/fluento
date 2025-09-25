import Flag from "react-flagkit";
import { getLanguageCode } from "../utils/languages";

export default function ProjectsOptions({ myProjects }) {
  // Define the projects options used by the <Select /> "react-select" component
  const projectOptions = myProjects?.map((project) => ({
    value: project.id,
    projectName: project.name,
    label: (
      <div className="flex items-center justify-between pt-4 pb-2">
        <Flag country={getLanguageCode(project.learningLanguage)} />
        <div className="text-2xl text-center relative">{project.name}</div>
      </div>
    ),
  }));

  return projectOptions;
}
