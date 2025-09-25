import Flag from "react-flagkit";
import { Select } from "../../ui/Select";
import { useProjectContext } from "../../contexts/ProjectContext";
import { useEffect, useState } from "react";

export default function ProjectSelection({ projects }) {
  const { state: stateProject, dispatch: dispatchProject } =
    useProjectContext();

  const projectSelected = stateProject.projectSelected;
  const [optionSelected, setOptionSelected] = useState(null);

  // Define the list of options for the <select> html tag
  const options = projects?.map((project, index) => {
    return { value: index + 1, label: project.name };
  });
  // Add the "All" item at the beginning of the list of project names
  options.unshift({ value: 0, label: "All" });

  useEffect(() => {
    const getOptionSelected = (projectSelected) => {
      // In case there are more than 1 project selected (meaning the "All" option has been selected).
      // Return the first option available ("All", which corresponds to value = 0)
      if (projectSelected.length > 0) return 0;

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

    let projectSelected;

    if (optionSelected.label === "All") {
      projectSelected = projects;
    } else {
      projectSelected = projects.filter(
        (project) => project.name === optionSelected.label
      )[0];
    }

    setOptionSelected(e.target.value);

    dispatchProject({ type: "project/selected", payload: projectSelected });
  };

  // Careful, 'optionSelected' can be equal to 0. Hence, do not use '!optionSelected'
  if (!options || optionSelected === null) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-4">
        <Select
          options={options}
          value={optionSelected}
          onChange={handleSelectProject}
        />
      </div>
    </div>
  );
}
