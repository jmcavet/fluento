import { useEffect, useState } from "react";
import VocaForm from "../features/vocabularies/VocaForm";
import Categories from "../features/category/Categories";
import { useProjectContext } from "../contexts/ProjectContext";
import {
  useCreateVocabulary,
  useVocabulary,
} from "../features/vocabularies/useVocabulary";
import { useProject } from "../features/projects/useProject";

import {
  useCategoriesFilteredByProject,
  useCategoriesPerUser,
} from "../features/category/useCategory";
import tw from "tailwind-styled-components";
import Spinner from "../ui/Spinner";
import { useVocaContext } from "../contexts/VocaContext";
import CategoryTags from "../features/category/CategoryTags";
import { useLanguage } from "../features/languageSelection/useLanguages";
import ProjectSelection from "../features/projects/ProjectSelection";
import LanguagesSingleSelection from "../features/languageSelection/LanguagesSingleSelection";
import SumItems from "../features/dictionary/SumItems";
import { useUser } from "../features/authentification/useUser";
import { useVocaFilterContext } from "../contexts/VocaFilterContext";
import NoProject from "../ui/NoProject";

const MainContainer = tw.div`h-full flex flex-col items-align justify-between p-6`;
const LanguageFilterContainer = tw.div`flex items-center justify-center`;
const Content = tw.div`flex flex-col items-align justify-between gap-6`;

const Voca = () => {
  const { user } = useUser();

  const { projects, isLoading: projectIsLoading } = useProject();
  const { vocabulary, isLoading: vocabularyIsLoading } = useVocabulary();
  const { isLoading: categoryIsLoading } = useCategoriesPerUser();

  const { state, dispatch: dispatchProject } = useProjectContext();
  const projectSelected = state.projectSelected;

  const { state: stateVoca, dispatch: dispatchVoca } = useVocaContext();
  const { state: stateVocaFilter, dispatch: dispatchVocaFilter } =
    useVocaFilterContext();
  const { wordType } = stateVocaFilter;
  const categoriesByProject = useCategoriesFilteredByProject(projectSelected);

  const processType = stateVoca.processType;

  const { createVocabulary, isPending } = useCreateVocabulary();

  const language = useLanguage();
  const languageNamesAll = projects?.map((project) => project.learningLanguage);
  const languageNames = [...new Set(languageNamesAll)];

  // Define projects filtered by a specific language
  const projectsByLanguages = projects?.filter(
    (project) => project.learningLanguage === language
  );

  // Calculate the number of words per project selected
  const nbWords = vocabulary?.filter(
    (item) => item.project_id === projectSelected?.id
  ).length;

  useEffect(() => {
    if (!projectSelected && projects) {
      const myProject = projects[0];
      dispatchProject({
        type: "project/selected",
        payload: myProject,
      });
    }
  }, [projectSelected, projects, dispatchProject]);

  // Handler when user clicks on a specific country flag
  const onHandleClickFlag = (index) => {
    const languageClicked = languageNames[index];
    dispatchVocaFilter({ type: "language/selected", payload: languageClicked });

    if (projectSelected.learningLanguage !== languageClicked) {
      const projectsByLanguages = projects?.filter(
        (project) => project.learningLanguage === languageClicked
      );
      dispatchProject({
        type: "project/selected",
        payload: projectsByLanguages[0],
      });
    }
  };

  const handleAddVoca = () => {
    // Initialize variable in case "quicky" is used
    let category_ids = [];
    let project_id = null;
    let type = "none";

    // Modify those variables in case "standard" is used
    if (processType === "standard") {
      category_ids = categoriesByProject
        .filter((item, index) => stateVoca.tags[index])
        .map((item) => item.id);

      project_id = projectSelected.id;
      type = wordType;
    }

    const vocabularyObj = {
      word: stateVoca.word,
      word_translation: stateVoca.wordTranslation,
      context: stateVoca.context,
      context_translation: stateVoca.contextTranslation,
      type,
      project_id,
      category_ids,
      user_id: user.id,
      learningLanguage: projectSelected.learningLanguage,
    };

    if (
      stateVoca.word ||
      stateVoca.wordTranslation ||
      stateVoca.context ||
      stateVoca.contextTranslation
    ) {
      createVocabulary(vocabularyObj);

      // Reset all inputs
      dispatchVoca({ type: "form/reset" });
    }
  };

  const noEntryProvided =
    stateVoca.word === "" &&
    stateVoca.wordTranslation === "" &&
    stateVoca.context === "" &&
    stateVoca.contextTranslation === "";

  const styleBtn = `${
    noEntryProvided
      ? "bg-transparent dark:bg-transparent text-neutral-400 dark:text-neutral-600 border-[1px] border-neutral-400 dark:border-neutral-600"
      : "bg-primary-500 text-neutral-0"
  } px-8 py-4 rounded-2xl text-3xl h-20`;

  // If no projects are yet defined, return a warning
  if (projects?.length === 0) return <NoProject />;

  if (
    categoryIsLoading ||
    vocabularyIsLoading ||
    projectIsLoading ||
    !projectSelected ||
    !projectsByLanguages ||
    !CategoryTags
  )
    return <Spinner />;

  return (
    <MainContainer>
      <LanguageFilterContainer>
        <LanguagesSingleSelection
          languageNames={languageNames}
          languageSelected={language}
          onHandleClickFlag={onHandleClickFlag}
        />
      </LanguageFilterContainer>

      <Content>
        {processType === "standard" ? (
          <div className="flex items-center justify-between gap-8">
            <ProjectSelection projects={projectsByLanguages} />
            <SumItems nbItems={nbWords} />
          </div>
        ) : null}

        <VocaForm />

        {processType === "standard" ? (
          <Categories>
            <CategoryTags categories={categoriesByProject} />
          </Categories>
        ) : null}
      </Content>

      <button
        className={styleBtn}
        onClick={handleAddVoca}
        disabled={noEntryProvided}
      >
        Add
      </button>
    </MainContainer>
  );
};

export default Voca;
