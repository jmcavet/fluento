import { useProjectContext } from "../contexts/ProjectContext";
import WorkflowHeader from "../features/languageSelection/WorkflowHeader";
import ProjectDefinitionHeader from "../features/projects/ProjectDefinitionHeader";
import ProjectInputs from "../features/projects/ProjectInputs";
import Heading from "../ui/Heading";

const ProjectDefinition = () => {
  const { state } = useProjectContext();
  const learningLanguage = state.learningLanguage;

  return (
    <div className="px-6 py-4">
      <ProjectDefinitionHeader
        title={"Define your project"}
        learningLanguage={learningLanguage}
      />
      <ProjectInputs />
    </div>
  );
};

export default ProjectDefinition;
