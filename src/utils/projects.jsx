import Flag from "react-flagkit";
import { getLanguageCode } from "./languages";

// Define the projects options used by the <Select /> "react-select" component
export const getProjectOptions = (myProjects) => {
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
};
