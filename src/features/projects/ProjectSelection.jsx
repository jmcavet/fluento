import Flag from "react-flagkit";
import { Select } from "../../ui/Select";
import { useProjectContext } from "../../contexts/ProjectContext";
import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";

const MainContainer = tw.div`flex items-center justify-center gap-4 w-full text-3xl dark:bg-neutral-800`;

export default function ProjectSelection({ projects }) {
  const { state: stateProject, dispatch: dispatchProject } =
    useProjectContext();

  const projectSelected = stateProject.projectSelected;
  const [optionSelected, setOptionSelected] = useState(null);

  // Define the list of options for the <select> html tag
  const options = projects?.map((project, index) => {
    return { value: index, label: project.name };
  });

  useEffect(() => {
    const getOptionSelected = (projectSelected) => {
      const titi = options?.filter(
        (option, index) => option.label === projectSelected.name
      );

      return titi.length > 0 ? titi[0].value : "All";
    };

    setOptionSelected(getOptionSelected(projectSelected));
  }, [projectSelected, options]);

  const handleSelectProject = (e) => {
    const optionSelected = options.filter(
      (option) => option.value === parseInt(e.target.value)
    )[0];

    const projectSelected = projects.filter(
      (project) => project.name === optionSelected.label
    )[0];

    setOptionSelected(e.target.value);

    dispatchProject({ type: "project/selected", payload: projectSelected });
  };

  // Careful, 'optionSelected' can be equal to 0. Hence, do not use '!optionSelected'
  if (!options || optionSelected === null) return <div>Loading...</div>;

  return (
    <MainContainer>
      <Select
        options={options}
        value={optionSelected}
        onChange={handleSelectProject}
      />
    </MainContainer>
  );
}
