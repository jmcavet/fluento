import { createContext, useContext, useReducer } from "react";

const initialState = {
  language: null,
  projectType: "allProjects",
  singleProjectId: null,
  wordsIdsFilteredOut: [],

  // Filter (word types, categories, favorites, etc.)
  wordTypes: [
    { value: "none", label: "None", selected: true },
    { value: "noun", label: "Noun", selected: true },
    { value: "verb", label: "Verb", selected: true },
    { value: "adjective", label: "Adjective", selected: true },
    { value: "adverb", label: "Adverb", selected: true },
    { value: "expression", label: "Expression", selected: true },
  ],
  wordType: "none",
  categoriesFiltered: null,
  isLearningLanguage: true,
  scoresFiltered: {
    happy: true,
    neutral: true,
    sad: true,
    none: true,
  },
  favoriteFiltered: {
    included: true,
    excluded: true,
  },
  progressFiltered: {
    complete: true,
    incomplete: true,
  },
  nbFiltersOn: 0,
  wordsToComplete: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "language/selected":
      return {
        ...state,
        language: action.payload,
        // Reset categories filtered
        categoriesFiltered: null,
        // Reset singleProjectId
        singleProjectId: null,
      };
    case "btnAllProjects/selected":
      return {
        ...state,
        projectType: "allProjects",
        wordsIdsFilteredOut: initialState.wordsIdsFilteredOut,
        categoriesFiltered: action.payload,
      };
    case "btnQuickies/selected":
      return {
        ...state,
        projectType: "quickies",
        wordsIdsFilteredOut: initialState.wordsIdsFilteredOut,
      };
    case "btnSingleProject/selected":
      return {
        ...state,
        projectType: "singleProject",
        wordsIdsFilteredOut: initialState.wordsIdsFilteredOut,
        categoriesFiltered: action.payload,
      };
    case "singleProjectId/selected":
      return { ...state, singleProjectId: action.payload };
    case "filter/reset":
      const initialWordTypesClone = [...initialState.wordTypes];
      initialWordTypesClone.forEach((obj) => (obj.selected = true));

      return {
        ...state,
        wordTypes: initialWordTypesClone,
        favoriteFiltered: initialState.favoriteFiltered,
        progressFiltered: initialState.progressFiltered,
        scoresFiltered: initialState.scoresFiltered,
        nbFiltersOn: initialState.nbFiltersOn,
        wordsIdsFilteredOut: initialState.wordsIdsFilteredOut,
      };

    // Flag language toggled by user
    case "isLearningLanguage/toggled":
      return { ...state, isLearningLanguage: !state.isLearningLanguage };
    case "wordType/selected":
      return { ...state, wordType: action.payload };
    case "filter/applied":
      const {
        wordTypes,
        categories,
        favoriteIcon,
        progressIcon,
        scoreIcon,
        nbFiltersOn,
        wordsIdsFilteredOut,
      } = action.payload;

      return {
        ...state,
        wordTypes: wordTypes,
        categoriesFiltered: categories,
        favoriteFiltered: favoriteIcon,
        progressFiltered: progressIcon,
        scoresFiltered: scoreIcon,
        nbFiltersOn: nbFiltersOn,
        wordsIdsFilteredOut: wordsIdsFilteredOut,
      };

    case "categories/filtered":
      return { ...state, categoriesFiltered: action.payload };

    case "wordsToComplete/defined":
      return { ...state, wordsToComplete: action.payload };
    default:
      return state;
  }
};

export const VocaFilterContext = createContext();

export const VocaFilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <VocaFilterContext.Provider value={{ state, dispatch }}>
      {children}
    </VocaFilterContext.Provider>
  );
};

export const useVocaFilterContext = () => {
  const context = useContext(VocaFilterContext);
  if (context === undefined)
    throw new Error("VocaFilterContext was used outside of VocaFilterProvider");

  return context;
};
