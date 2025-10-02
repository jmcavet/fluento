import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import { useEffect, useState } from "react";

import tw from "tailwind-styled-components";
import LanguagesSingleSelection from "../languageSelection/LanguagesSingleSelection";

import RestartAltIcon from "@mui/icons-material/RestartAlt";

import { useProject } from "../projects/useProject";
import { useVocabularyPerUser } from "../vocabularies/useVocabulary";
import { useGameContext } from "../../contexts/GameContext";
import { useVocaFilterContext } from "../../contexts/VocaFilterContext";
import { useCategoriesPerUser } from "../category/useCategory";
import WordsFilter from "../../ui/WordsFilter";
import { useLanguage } from "../languageSelection/useLanguages";

const MainContainer = tw.div`sticky top-0 w-full bg-primary-500 dark:bg-neutral-900 px-4 flex flex-col gap-4 rounded-b-[2rem] dark:rounded-none`;
const LanguageAndFilterContainer = tw.div`flex items-center justify-between`;
const LanguageSelectionContainer = tw.div`flex items-center justify-center px-4 mx-auto mt-2 mb-3 rounded-xl w-fit`;

const ProjectSelectionContainer = tw.div`flex items-center justify-center gap-8 md:gap-12 rounded-xl px-4 py-2`;
const ListSingleProjects = tw.div`absolute bg-neutral-100 text-neutral-800 border border-neutral-200 dark:bg-neutral-900 dark:text-neutral-0 dark:border-neutral-500 rounded-xl overflow-auto shadow z-10 min-w-[10rem]`;
const LinkReset = tw.div`flex items-center justify-between gap-4 w-fit text-neutral-0 dark:text-primary-500 text-4xl`;
const AnyProjectContainer = tw.a`relative inline-block mr-4`;

export default function GameHeader({ languageNames }) {
  const { categories } = useCategoriesPerUser();

  const [singleProjectBtnClicked, setSingleProjectBtnClicked] = useState(false);

  const { state: stateVocaFilter, dispatch: dispatchVocaFilter } =
    useVocaFilterContext();
  const {
    projectType,
    singleProjectId,
    wordsIdsFilteredOut,
    categoriesFiltered,
  } = stateVocaFilter;

  const styleProjectSelected =
    "bg-primary-900 text-neutral-0 dark:bg-primary-500 dark:text-neutral-0";
  const styleProjectNotSelected =
    "text-neutral-100 border border-neutral-100 dark:text-neutral-200 dark:border-neutral-200";
  const styleProjectContainer =
    "bg-primary-500 text-neutral-0 border-neutral-0 dark:bg-neutral-900 dark:text-neutral-0";

  const AllProjectsButton = tw.button`${(props) =>
    projectType === "allProjects"
      ? styleProjectSelected
      : styleProjectNotSelected}
      cursor-pointer px-4 py-2 rounded-3xl`;

  const AllProjectsCountContainer = tw.span`${(props) =>
    projectType === "allProjects"
      ? styleProjectSelected
      : styleProjectContainer}
      absolute -top-5 -right-9 rounded-full border border-[1px] text-sm md:text-base p-2 flex items-center justify-center`;

  const SingleProjectButton = tw.button`${(props) =>
    projectType === "singleProject"
      ? styleProjectSelected
      : styleProjectNotSelected}
      cursor-pointer px-4 py-2 rounded-3xl`;

  const SingleProjectCountContainer = tw.span`${(props) =>
    projectType === "singleProject"
      ? styleProjectSelected
      : styleProjectContainer}
      absolute -top-5 -right-9 rounded-full border border-[1px] text-sm md:text-base p-2 flex items-center justify-center`;

  const QuickiesButton = tw.button`${(props) =>
    projectType === "quickies" ? styleProjectSelected : styleProjectNotSelected}
    flex items-center justify-between gap-4 px-4 py-2 rounded-3xl cursor-pointer`;

  const QuickiesCountContainer = tw.span`${(props) =>
    projectType === "quickies" ? styleProjectSelected : styleProjectContainer}
    absolute -top-5 -right-6 rounded-full border border-[1px] text-sm md:text-base w-10 h-10 p-2 flex items-center justify-center`;

  const { projects } = useProject();
  const { vocabulary } = useVocabularyPerUser();
  const language = useLanguage();

  const { dispatch: dispatchGame } = useGameContext();

  // Define all projects belonging to the language selected
  const projectsPerLanguage = projects?.filter(
    (project) => project.learningLanguage === language,
  );

  // Define the list of words (project assigned or not (quickies)) for the language selected
  const wordsPerLanguage = vocabulary?.filter(
    (obj) => obj.learningLanguage === language,
  );

  // Get the number of words for all Projects, depending on the options filtered (word types, categories, favorites, etc.)
  const nbWordsAllProjects = wordsPerLanguage?.filter(
    (obj) => obj.project_id && !wordsIdsFilteredOut.includes(obj.id),
  ).length;

  // Get the number of words for Quickies, depending on the options filtered (word types, categories, favorites, etc.)
  const nbWordsQuickies = wordsPerLanguage?.filter(
    (obj) => !obj.project_id && !wordsIdsFilteredOut.includes(obj.id),
  ).length;

  // At first page render, no project is defined ('singleProjectId = null'). Select the first one from the 'projectsPerLanguage' array
  // Otherwise, find the one corresponding to the 'singleProjectId' id
  const singleProjectSelected = singleProjectId
    ? projects.filter((project) => project.id === singleProjectId)[0]
    : projectsPerLanguage[0];

  // Get all words from the selected single project selected
  const wordsSingleProject =
    singleProjectSelected &&
    wordsPerLanguage?.filter(
      (obj) => obj.project_id === singleProjectSelected.id,
    );

  // Get the number of those words, depending on the options filtered (word types, categories, favorites, etc.)
  const nbWordsSingleProjectFiltered = wordsSingleProject?.filter(
    (word) => !wordsIdsFilteredOut.includes(word.id),
  ).length;

  // Define the html elements corresponding to each single project
  const listSingleProjects = projectsPerLanguage?.map((project, index) => (
    <div
      key={index}
      className={`p-4 w-full hover:bg-neutral-300 cursor-pointer text-neutral-0 ${
        (singleProjectId === project.id) & (projectType === "singleProject")
          ? "bg-neutral-900 dark:bg-primary-500"
          : "bg-primary-500 dark:bg-neutral-900"
      }`}
      onClick={() => {
        handleSelectSingleProject(project.id);

        dispatchVocaFilter({ type: "filter/reset" });
      }}
    >
      {project.name}
    </div>
  ));

  // Define the whole set of words belonging to the specific project type selected ("All Projects", "Quickies", etc.)
  let wordsByProjectType;
  if (projectType === "allProjects")
    wordsByProjectType = wordsPerLanguage?.filter((obj) => obj.project_id);
  else if (projectType === "quickies")
    wordsByProjectType = wordsPerLanguage?.filter((obj) => !obj.project_id);
  else wordsByProjectType = wordsSingleProject;

  const arrCategoriesIds = wordsByProjectType?.map((obj) => obj.category_ids);
  const newArr = [];
  arrCategoriesIds?.forEach((arr) => {
    arr.forEach((el) => newArr.push(el));
  });
  const uniqueCategoryIds = [...new Set(newArr)];

  const categoriesFilteredByIds = categories?.filter((cat) =>
    uniqueCategoryIds.includes(cat.id),
  );
  categoriesFilteredByIds?.forEach((obj) => (obj.selected = true));

  const getCategoriesFileredByIds = (myArray) => {
    const arrCategoriesIds = myArray?.map((obj) => obj.category_ids);
    const newArr = [];
    arrCategoriesIds?.forEach((arr) => {
      arr.forEach((el) => newArr.push(el));
    });
    const uniqueCategoryIds = [...new Set(newArr)];

    const categoriesFilteredByIds = categories?.filter((cat) =>
      uniqueCategoryIds.includes(cat.id),
    );
    categoriesFilteredByIds?.forEach((obj) => (obj.selected = true));

    return categoriesFilteredByIds;
  };

  useEffect(() => {
    // If the categoriesFiltered state has not been yet defined, do it now!
    if (!categoriesFiltered && wordsPerLanguage) {
      handleSelectAllProjects();
    }
  }, [wordsPerLanguage]);

  // User clicks on the Flag to toggle it from learning to mother language, and vice versa
  const handleClickFlag = (index) => {
    const languageClicked = languageNames[index];
    dispatchVocaFilter({ type: "language/selected", payload: languageClicked });
  };

  // Option 1: user clicks on the "All projects" button
  const handleSelectAllProjects = () => {
    const categoriesFilteredByIds = getCategoriesFileredByIds(
      wordsPerLanguage?.filter((obj) => obj.project_id),
    );

    dispatchVocaFilter({
      type: "btnAllProjects/selected",
      payload: categoriesFilteredByIds,
    });

    dispatchVocaFilter({ type: "filter/reset" });
  };

  // Option 2a: user clicks on the single project Button
  const handleSelectSingleProjectBtn = () => {
    setSingleProjectBtnClicked((prev) => !prev);
  };

  // Option 2b: user clicks on a single project from the dropdown list
  const handleSelectSingleProject = (projectId) => {
    const myWordsUpdated = vocabulary?.filter(
      (voca) => voca.project_id === projectId,
    );
    const categoriesFilteredByIds = getCategoriesFileredByIds(myWordsUpdated);

    dispatchVocaFilter({
      type: "btnSingleProject/selected",
      payload: categoriesFilteredByIds,
    });

    // Store the ID of the single project selected
    dispatchVocaFilter({
      type: "singleProjectId/selected",
      payload: projectId,
    });

    // Close the menu listing all single projects
    handleSelectSingleProjectBtn();
  };

  // Option 3: User clicks on the "Quickies" button
  const handleSelectQuickies = () => {
    dispatchVocaFilter({
      type: "btnQuickies/selected",
    });

    dispatchVocaFilter({ type: "filter/reset" });
  };

  const handleReset = () => dispatchGame({ type: "game/reset" });

  return (
    wordsPerLanguage &&
    language && (
      <MainContainer>
        <LanguageAndFilterContainer>
          <LinkReset onClick={handleReset}>
            <RestartAltIcon sx={{ fontSize: 32 }} />
          </LinkReset>
          <LanguageSelectionContainer>
            <LanguagesSingleSelection
              languageNames={languageNames}
              languageSelected={language}
              onHandleClickFlag={handleClickFlag}
            />
          </LanguageSelectionContainer>
          {projectType !== "quickies" ? (
            <WordsFilter myVoca={wordsByProjectType} />
          ) : null}
        </LanguageAndFilterContainer>

        <ProjectSelectionContainer>
          <AnyProjectContainer>
            <AllProjectsButton onClick={handleSelectAllProjects}>
              All
            </AllProjectsButton>
            <AllProjectsCountContainer>
              {nbWordsAllProjects}
            </AllProjectsCountContainer>
          </AnyProjectContainer>

          <AnyProjectContainer>
            <div className="relative inline-block">
              <SingleProjectButton onClick={handleSelectSingleProjectBtn}>
                {singleProjectSelected.name}
              </SingleProjectButton>
              {singleProjectBtnClicked && (
                <ListSingleProjects>{listSingleProjects}</ListSingleProjects>
              )}
            </div>
            <SingleProjectCountContainer>
              {nbWordsSingleProjectFiltered}
            </SingleProjectCountContainer>
          </AnyProjectContainer>

          <AnyProjectContainer>
            <QuickiesButton onClick={handleSelectQuickies}>
              <ElectricBoltIcon />
              <p>Quickies</p>
            </QuickiesButton>
            <QuickiesCountContainer>{nbWordsQuickies}</QuickiesCountContainer>
          </AnyProjectContainer>
        </ProjectSelectionContainer>
      </MainContainer>
    )
  );
}
