import { useEffect } from "react";
import { useProjectContext } from "../../contexts/ProjectContext";
import { useVocaFilterContext } from "../../contexts/VocaFilterContext";

export function useLanguage() {
  const { state } = useProjectContext();
  const projectSelected = state.projectSelected;

  const { state: stateVocaFilter, dispatch: dispatchVocaFilter } =
    useVocaFilterContext();

  useEffect(() => {
    const learningLanguage = projectSelected?.learningLanguage;

    if (!stateVocaFilter.language && learningLanguage) {
      dispatchVocaFilter({
        type: "language/selected",
        payload: learningLanguage,
      });
    }
  }, [projectSelected, stateVocaFilter, dispatchVocaFilter]);

  return stateVocaFilter.language;
}
