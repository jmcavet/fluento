import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import { useEffect, useState } from "react";
import { useDictionaryContext } from "../../contexts/DictionaryContext";
import Flag from "react-flagkit";
import SearchBar from "./SearchBar";
import EditDeleteIcons from "./EditDeleteIcons";
import CloseIcon from "@mui/icons-material/Close";
import TuneIcon from "@mui/icons-material/Tune";

import tw from "tailwind-styled-components";
import LanguagesSingleSelection from "../languageSelection/LanguagesSingleSelection";
import { getLanguageCode } from "../../utils/languages";
import { useProject } from "../projects/useProject";
import { useCategoriesPerUser } from "../category/useCategory";
import { useVocaFilterContext } from "../../contexts/VocaFilterContext";
import { useVocabularyPerUser } from "../vocabularies/useVocabulary";
import WordsFilter from "../../ui/WordsFilter";

const MainContainer = tw.div`sticky top-0 w-full bg-primary-500 dark:bg-neutral-900 px-4 flex flex-col gap-3 rounded-b-[2rem] dark:rounded-none`;
const LanguageAndFilterContainer = tw.div`flex items-center justify-between`;
const LanguageSelectionContainer = tw.div`flex items-center justify-center px-4 mx-auto mt-2 mb-3 rounded-xl w-fit`;
const ProjectSelectionContainer = tw.div`flex items-center justify-between rounded-xl px-4 py-2`;
const SearchFilterContainer = tw.div`flex items-center justify-between gap-4 mb-2`;
const ButtonFilter = tw.button`px-4 py-2 rounded-2xl border-solid border-text-neutral-0 border-[1px]`;
const Row = tw.div`flex items-center justify-between text-neutral-0 mb-4`;
const ListSingleProjects = tw.div`absolute bg-neutral-100 text-neutral-800 border border-neutral-200 dark:bg-neutral-900 dark:text-neutral-0 dark:border-neutral-500 rounded-xl overflow-auto shadow z-10 min-w-[10rem]`;
const FlagButton = tw.button`flex items-center gap-4 border-solid p-[1px] border-white border-[1px]`;
const SettingsButton = tw.button`text-neutral-0 dark:text-primary-500`;
const WordEditContainer = tw.div`flex items-center justify-between gap-4`;
const NbWordsFiltered = tw.div`text-lg md:text-xl text-neutral-0`;
const AnyProjectContainer = tw.a`relative inline-block mr-4`;

export default function DictionaryHeader({ languageNames }) {
  const [selectAll, setSelectAll] = useState(true);

  const { categories } = useCategoriesPerUser();

  const [singleProjectBtnClicked, setSingleProjectBtnClicked] = useState(false);

  const { state: stateVocaFilter, dispatch: dispatchVocaFilter } =
    useVocaFilterContext();
  const {
    language,
    projectType,
    singleProjectId,
    wordsIdsFilteredOut,
    categoriesFiltered,
    isLearningLanguage,
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

  let myVocaFiltered;
  if (projectType === "allProjects") {
    myVocaFiltered = wordsPerLanguage?.filter(
      (obj) => obj.project_id && !wordsIdsFilteredOut.includes(obj.id),
    );
  } else if (projectType === "singleProject") {
    myVocaFiltered = wordsPerLanguage?.filter(
      (obj) =>
        obj.project_id &&
        obj.project_id === singleProjectId &&
        !wordsIdsFilteredOut.includes(obj.id),
    );
  } else {
    // Quickies
    myVocaFiltered = wordsPerLanguage?.filter(
      (obj) => !obj.project_id && !wordsIdsFilteredOut.includes(obj.id),
    );
  }

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
      className={`p-4 w-full hover:bg-gray-300 cursor-pointer text-neutral-0 ${
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

  const [isFocused, setIsFocused] = useState(false);

  const { state, dispatch: dispatchDictionary } = useDictionaryContext();
  const { dateIsDescending, itemsChecked, wordSearched } = state;

  // Toggle between Select all words and deselect them all
  const handleToggleSelectDeselectAll = () => {
    const itemsCheckedNew = new Array(itemsChecked?.length).fill(selectAll);

    dispatchDictionary({ type: "items/checked", payload: itemsCheckedNew });

    setSelectAll((prev) => !prev);
  };

  const words = myVocaFiltered?.filter((obj) => {
    const word = isLearningLanguage ? obj.word : obj.word_translation;
    const context = isLearningLanguage ? obj.context : obj.context_translation;

    return (
      word?.toLowerCase().includes(wordSearched?.toLowerCase()) ||
      context?.toLowerCase().includes(wordSearched?.toLowerCase())
    );
  });

  const wordsChecked = words?.filter((_, index) => itemsChecked?.[index]);

  const nbItemsChecked = itemsChecked?.filter((state) => state === true).length;

  const { toggleUpdateIsOn, wordContextOptions, wordContextIndex } = state;

  const onToggleEdit = () =>
    dispatchDictionary({ type: "toggleUpdate/selected" });

  const handleSwitchLanguage = () => {
    dispatchVocaFilter({ type: "isLearningLanguage/toggled" });
  };

  const handleSortDate = () =>
    dispatchDictionary({ type: "dateSorting/toggled" });

  // Toggle between Word & Context, Word only, Context only
  const handleToggleWordContext = () =>
    dispatchDictionary({ type: "wordContextTag/selected" });

  return (
    projects.length > 0 &&
    words && (
      <MainContainer>
        <LanguageAndFilterContainer>
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
                {singleProjectSelected?.name}
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

        <SearchFilterContainer>
          <FlagButton onClick={handleSwitchLanguage}>
            <Flag
              country={getLanguageCode(
                isLearningLanguage ? language : projects[0]["motherLanguage"],
              )}
              size={48}
            />
          </FlagButton>

          <SearchBar
            isFocused={isFocused}
            setIsFocused={setIsFocused}
            wordSearched={wordSearched}
            handleOnChange={(e) =>
              dispatchDictionary({
                type: "word/searched",
                payload: e.target.value,
              })
            }
          />

          <NbWordsFiltered>{words.length}</NbWordsFiltered>

          <div className="flex items-center justify-between gap-2">
            <div
              className="flex items-center text-neutral-0 dark:text-primary-500"
              onClick={handleSortDate}
            >
              <CalendarMonthIcon sx={{ fontSize: 30 }} />
              {dateIsDescending ? (
                <ArrowDownwardIcon sx={{ fontSize: 22 }} />
              ) : (
                <ArrowUpwardIcon sx={{ fontSize: 22 }} />
              )}
            </div>

            <SettingsButton onClick={onToggleEdit}>
              {toggleUpdateIsOn ? (
                <CloseIcon sx={{ fontSize: 30 }} />
              ) : (
                <TuneIcon sx={{ fontSize: 30 }} />
              )}
            </SettingsButton>
          </div>
        </SearchFilterContainer>
        {toggleUpdateIsOn && (
          <Row>
            <WordEditContainer>
              <ButtonFilter onClick={handleToggleSelectDeselectAll}>
                {selectAll ? "Select All" : "Deselect All"}
              </ButtonFilter>
              <span className="md:text-xl">{nbItemsChecked}</span>
            </WordEditContainer>
            <WordEditContainer>
              <ButtonFilter onClick={handleToggleWordContext}>
                {wordContextOptions[wordContextIndex]}
              </ButtonFilter>
            </WordEditContainer>

            <EditDeleteIcons
              language={language}
              wordsChecked={wordsChecked}
              projectType={projectType}
            />
          </Row>
        )}
      </MainContainer>
    )
  );
}
