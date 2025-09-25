import { createContext, useContext, useReducer } from "react";

const initialState = {
  totalSteps: 3,
  currentStep: 1,
  motherLanguage: null,
  learningLanguage: null,
  languages: [],
  projectSelected: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "projectStep/previous":
      return {
        ...state,
        currentStep: state.currentStep - 1,
      };
    case "projectStep/next":
      const languageKey = [Object.keys(action.payload)];
      const languageValue = action.payload[Object.keys(action.payload)];
      return {
        ...state,
        currentStep: state.currentStep + 1,
        [languageKey]: languageValue,
      };

    case "projectTotalSteps/redefined":
      return {
        ...state,
        totalSteps: action.payload.totalSteps,
        motherLanguage: action.payload.motherLanguage,
      };
    case "project/created":
      return {
        ...state,
        learningLanguage: null,
        currentStep: 1,
        languages: [...state.languages, action.payload],
      };
    case "langages/updated":
      return {
        ...state,
        languages: action.payload,
      };
    case "languages/deleted":
      const languageToDelete = action.payload;

      return {
        ...state,
        languages: state.languages.filter(
          (obj) => obj.language !== languageToDelete
        ),
      };
    case "languages/reset":
      return {
        ...state,
        languages: [],
      };
    case "project/selected":
      return { ...state, projectSelected: action.payload };
    case "account/logout":
      return {
        ...state,
        totalSteps: initialState.totalSteps,
        currentStep: initialState.currentStep,
        motherLanguage: initialState.motherLanguage,
        learningLanguage: initialState.learningLanguage,
        languages: [],
        projectSelected: initialState.projectSelected,
      };
    default:
      return state;
  }
};

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ProjectContext.Provider value={{ state, dispatch }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (context === undefined)
    throw new Error("ProjectContext uas used outside of ProjectProvider");

  return context;
};
