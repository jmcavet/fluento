import React, { useCallback, useEffect, useMemo, useState } from "react";
import FormRow from "../../ui/FormRow";
import FilterListIcon from "@mui/icons-material/FilterList";
import Flag from "react-flagkit";
import Select from "react-select";
import { getLanguageCode } from "../../utils/languages";
import { useProjectContext } from "../../contexts/ProjectContext";
import SumItems from "../dictionary/SumItems";
import tw from "tailwind-styled-components";
import { useVocaContext } from "../../contexts/VocaContext";

const MainContainer = tw.div`flex items-center justify-between gap-4`;

export default function VocaFilter({ vocabulary = null, projectsByLanguages }) {
  const [projectOptionSelected, setProjectOptionSelected] = useState(null);
  const { state, dispatch } = useProjectContext();
  const projectSelected = state.projectSelected;
  const { state: stateVoca, dispatch: dispatchVoca } = useVocaContext();

  // Define the projects options used by the <Select /> "react-select" component
  const getProjectOptions = (myProjects) => {
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

  const projectsOptions = getProjectOptions(projectsByLanguages);

  const getProjectSelected = useCallback(
    (projectOption) => {
      return projectsByLanguages.filter(
        (project) => project.id === projectOption.value
      )[0];
    },
    [projectsByLanguages]
  );

  useEffect(() => {
    const projectPerLanguageOptions = getProjectOptions(projectsByLanguages);

    // Check whether the project selected and displayed on the select/dropdown menu is part of the
    // projects filtered by the languages selected
    const isSelectedProjectInProjectsPerLanguages =
      projectPerLanguageOptions.filter(
        (item) => item.value === projectSelected.id
      ).length > 0;
    if (!isSelectedProjectInProjectsPerLanguages) {
      const projectOption = getProjectOptions(projectsByLanguages)[0];
      setProjectOptionSelected(projectOption);

      // Save the first project available (for the languages selected) as the selected project
      dispatch({
        type: "project/selected",
        payload: getProjectSelected(projectOption),
      });
    } else {
      setProjectOptionSelected(getProjectOptions([projectSelected]));
    }
  }, [
    projectsByLanguages,
    projectSelected,
    dispatch,
    getProjectSelected,
    projectSelected.id,
  ]);

  // Calculate the number of words per project selected
  const nbVocaPerProject = vocabulary?.filter(
    (item) => item.project_id === projectOptionSelected?.value
  ).length;

  const handleSelectProject = (projectOption) => {
    setProjectOptionSelected(projectOption);

    dispatch({
      type: "project/selected",
      payload: getProjectSelected(projectOption),
    });

    // const learningLanguage = getProjectSelected(projectOption).learningLanguage;

    // const learningLanguagesOption = {
    //   value: learningLanguage,
    //   label: (
    //     <div className="flex items-center justify-between pt-4 pb-2">
    //       <Flag country={getLanguageCode(learningLanguage)} />
    //     </div>
    //   ),
    // };

    // dispatchVoca({
    //   type: "learningLanguage/selected",
    //   payload: learningLanguagesOption,
    // });
  };

  return (
    projectSelected && (
      <MainContainer>
        <FormRow label={null} error="">
          <Select
            className="text-2xl font-semibold"
            // defaultValue={projectsOptions[0]}
            name="projects"
            options={projectsOptions}
            value={projectOptionSelected}
            onChange={handleSelectProject}
            blurInputOnSelect={false}
          />
        </FormRow>
        {nbVocaPerProject && <SumItems nbItems={nbVocaPerProject} />}
        {vocabulary && <FilterListIcon fontSize="large" />}
      </MainContainer>
    )
  );
}
