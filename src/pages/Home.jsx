import { useNavigate } from "react-router-dom";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { useUser } from "../features/authentification/useUser";
import { useProject } from "../features/projects/useProject";
import Spinner from "../ui/Spinner";
import ProjectCards from "../features/projects/ProjectCards";
import { useVocabularyPerUser } from "../features/vocabularies/useVocabulary";
import LanguageFilter from "../features/projects/LanguageFilter";
import HomeTabs from "../features/home/HomeTabs";
import { useGeneralSettingsContext } from "../contexts/GeneralSettingsContext";
import Dashboard from "../features/home/Dashboard";
import tw from "tailwind-styled-components";
import { useEffect } from "react";
import { useProjectContext } from "../contexts/ProjectContext";
import { useCategoriesPerUser } from "../features/category/useCategory";

const MainContainer = tw.div`flex flex-col m-6 gap-16`;
const LanguageFilterContainer = tw.div`flex items-center justify-center bg-white px-8 py-4 rounded-xl w-fit m-auto`;
const ButtonAddProject = tw.button`block m-auto`;

const Home = () => {
  const navigate = useNavigate();

  const { user, isLoading: userIsLoading } = useUser();
  const { projects, isLoading: projectsIsLoading } = useProject();
  const { vocabulary, isLoading: vocabularyIsLoading } = useVocabularyPerUser();
  const { categories, isLoading: categoriesIsLoading } = useCategoriesPerUser();

  const { state: stateGeneralSettingsContext } = useGeneralSettingsContext();
  const homeTab = stateGeneralSettingsContext.homeTab;

  const { state: stateProject, dispatch: dispatchProject } =
    useProjectContext();
  const { languages, projectSelected } = stateProject;

  const projectsByLanguages = projects?.filter((project) => {
    return languages?.filter(
      (obj) => obj.language === project.learningLanguage
    )[0]?.selected;
  });

  const onHandleClickFlag = (index) => {
    // Get the updated languages: [{language: 'German', selected: false}, {language: 'Spanish', selected: true}, ...]
    const updatedLanguages = languages?.map((language, _index) => {
      if (_index === index) {
        return { ...language, selected: !language.selected };
      } else return language;
    });

    // Get all languages' names: ['Spanish', 'Russian', ...]
    const updatedLanguagesNames = updatedLanguages
      .filter((obj) => obj.selected)
      .map((obj) => obj.language);

    // If the language of the existing project selected is different from those filtered by the flag icons,
    // select the first project available for the first language available from the 'updatedLanguagesNames' array.
    // Finally, set this project as the new projectSelected state
    console.log("AAAA: ", projectSelected);
    if (!updatedLanguagesNames.includes(projectSelected?.learningLanguage)) {
      const projectSelected = projects?.filter((project) => {
        return project.learningLanguage === updatedLanguagesNames[0];
      })[0];

      dispatchProject({ type: "project/selected", payload: projectSelected });
    }

    // If the user's action has not modified anything, don't do anything
    const nbLanguagesSelected = updatedLanguages?.filter(
      (obj) => obj.selected
    ).length;
    if (nbLanguagesSelected === 0) return;

    // Update the languages filtered by user
    dispatchProject({ type: "langages/updated", payload: updatedLanguages });
  };

  // Initialise the languages state with those (must be unique) for each project available
  useEffect(() => {
    // Trick to reset languages to an empty array, whenever all projects have been deleted
    if (projects?.length === 0 && languages.length > 0) {
      dispatchProject({ type: "languages/reset" });
    }
    if (languages.length === 0 && projects?.length > 0) {
      // Select only unique languages' names (["Arabic, Chinese"] and not ["Arabic", "Arabic", "Chinese"])
      const languagesNames = [
        ...new Set(projects.map((project) => project.learningLanguage)),
      ];

      // Return an array such as: [{language: "Arabic", selected: true}, {language: "Chinese", selected: true}]
      const languagesInitialised = languagesNames.map((languageName) => {
        return { language: languageName, selected: true };
      });

      dispatchProject({
        type: "langages/updated",
        payload: languagesInitialised,
      });
    }
  }, [projects, dispatchProject, languages.length]);

  // Whenever no projects have been created yet
  if (projects?.length === 0)
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-16 text-4xl text-neutral-900 dark:text-neutral-0">
        <p>Start creating a new project</p>
        <button
          className="flex items-center justify-center text-accent-500"
          onClick={() => navigate("/project-setup")}
        >
          <AddCircleOutlinedIcon
            sx={{
              fontSize: 44,
            }}
          />
        </button>
      </div>
    );

  if (
    userIsLoading ||
    projectsIsLoading ||
    vocabularyIsLoading ||
    categoriesIsLoading
  )
    return <Spinner />;

  const languagesNamesSelected = languages
    ?.filter((language) => language.selected)
    .map((obj) => obj.language);

  const nbWordsPerLanguagesSelected = vocabulary.filter((obj) =>
    languagesNamesSelected?.includes(obj.learningLanguage)
  ).length;

  return (
    projectsByLanguages && (
      <MainContainer>
        <LanguageFilterContainer>
          <LanguageFilter
            languages={languages}
            onHandleClickFlag={onHandleClickFlag}
          />
        </LanguageFilterContainer>

        <div className="flex flex-col justify-center gap-8">
          <HomeTabs />
          <ButtonAddProject onClick={() => navigate("/project-setup")}>
            <AddCircleOutlinedIcon
              sx={{
                fontSize: 54,
              }}
              className="text-accent-500"
            />
          </ButtonAddProject>
        </div>

        <div className="mx-auto text-3xl">
          Total number words:{" "}
          <span className="text-4xl font-semibold">
            {nbWordsPerLanguagesSelected}
          </span>
        </div>
        {homeTab === "dashboard" ? (
          <Dashboard
            projectsByLanguages={projectsByLanguages}
            vocabulary={vocabulary}
          />
        ) : (
          <ProjectCards
            projectsFilteredByLanguage={projectsByLanguages}
            vocabulary={vocabulary}
            categories={categories}
          />
        )}
      </MainContainer>
    )
  );
};

export default Home;
