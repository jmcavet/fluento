import { useProject } from "../features/projects/useProject";
import DictionaryHeader from "../features/dictionary/DictionaryHeader";
import DictionaryItems from "../features/dictionary/DictionaryItems";
import { useProjectContext } from "../contexts/ProjectContext";
import { useEffect } from "react";
import Spinner from "../ui/Spinner";
import { useLanguage } from "../features/languageSelection/useLanguages";
import NoProject from "../ui/NoProject";
import { useVocaFilterContext } from "../contexts/VocaFilterContext";

const Dictionary = () => {
  const { projects } = useProject();

  const { state: stateVocaFilter, dispatch: dispatchVocaFilter } =
    useVocaFilterContext();
  const { language } = stateVocaFilter;

  const languageNamesAll = projects?.map((project) => project.learningLanguage);
  const languageNames = [...new Set(languageNamesAll)];

  // Initialise the language selected (1 flag only must be selected in the header)
  useEffect(() => {
    if (projects?.length > 0) {
      dispatchVocaFilter({
        type: "language/selected",
        payload: projects[0].learningLanguage,
      });
    }
  }, [projects]);

  // If no projects are yet defined, return a warning
  if (projects?.length === 0) return <NoProject />;

  if (!languageNames || !language) return <Spinner />;

  return (
    <>
      <DictionaryHeader languageNames={languageNames} />
      <DictionaryItems />
    </>
  );
};

export default Dictionary;
