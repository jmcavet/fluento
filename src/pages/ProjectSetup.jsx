import { useState } from "react";
import { useProjectContext } from "../contexts/ProjectContext";
import LanguageSelectionHeader from "../features/languageSelection/LanguageSelectionHeader";
import WorkflowHeader from "../features/languageSelection/WorkflowHeader";
import LanguageSelection from "./LanguageSelection";
import ProjectDefinition from "./ProjectDefinition";
import { useGeneralSettingsContext } from "../contexts/GeneralSettingsContext";
import { useEffect } from "react";
import { useProject } from "../features/projects/useProject";

const ProjectSetup = () => {
  const { state, dispatch: dispatchProject } = useProjectContext();
  const { projects } = useProject();
  const currentStep = state.currentStep;
  const totalSteps = state.totalSteps;
  const { state: stateGeneralSettings, dispatch: dispatchGeneralSettings } =
    useGeneralSettingsContext();
  const motherLanguage = stateGeneralSettings.motherLanguage;

  useEffect(() => {
    if (motherLanguage) {
      dispatchProject({
        type: "projectTotalSteps/redefined",
        payload: { totalSteps: 2, motherLanguage },
      });
    } else {
      if (projects.length > 0) {
        // At least 1 project has been already created. Take the first one and select the mother language
        dispatchProject({
          type: "projectTotalSteps/redefined",
          payload: {
            totalSteps: 2,
            motherLanguage: projects[0].motherLanguage,
          },
        });
      }
    }
  }, [projects, motherLanguage, dispatchProject]);

  const [searchLanguage, setSearchLanguage] = useState("");
  const [languageSelected, setLanguageSelected] = useState("");

  let title;
  if (totalSteps === 3) {
    if (currentStep === 1) title = "Select your mother language";
    if (currentStep === 2) title = "Select the language you want to learn";
  }
  if (totalSteps === 2) {
    if (currentStep === 1) title = "Select the language you want to learn";
  }

  return (
    <div className="h-screen grid grid-rows-[auto_auto_1fr] px-6 py-4 text-neutral-800 dark:text-neutral-200">
      <>
        <WorkflowHeader />

        {title && (
          <LanguageSelectionHeader
            title={title}
            searchLanguage={searchLanguage}
            setSearchLanguage={setSearchLanguage}
          />
        )}
      </>

      <div
        className={`${title ? "flex flex-col items-center max-w-3xl mx-auto w-full" : ""}`}
      >
        {totalSteps === 3 && (currentStep === 1 || currentStep === 2) && (
          <LanguageSelection
            title={title}
            searchLanguage={searchLanguage}
            setSearchLanguage={setSearchLanguage}
            languageSelected={languageSelected}
            setLanguageSelected={setLanguageSelected}
          />
        )}
        {totalSteps === 3 && currentStep === 3 && <ProjectDefinition />}

        {totalSteps === 2 && currentStep === 1 && (
          <LanguageSelection
            title={title}
            searchLanguage={searchLanguage}
            setSearchLanguage={setSearchLanguage}
            languageSelected={languageSelected}
            setLanguageSelected={setLanguageSelected}
          />
        )}
        {totalSteps === 2 && currentStep === 2 && <ProjectDefinition />}
      </div>
    </div>
  );
};

export default ProjectSetup;
