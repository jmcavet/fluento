import { createContext, useContext, useReducer } from "react";

const initialState = {
  processType: "standard",
  word: "",
  wordTranslation: "",
  context: "",
  contextTranslation: "",
  learningLanguageObj: {},
  languages: null,
  tags: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "processType/selected":
      return {
        ...state,
        processType: action.payload,
      };
    case "word/updated":
      return { ...state, word: action.payload };
    case "wordTranslation/updated":
      return { ...state, wordTranslation: action.payload };
    case "context/updated":
      return { ...state, context: action.payload };
    case "contextTranslation/updated":
      return { ...state, contextTranslation: action.payload };
    case "learningLanguage/selected":
      return { ...state, learningLanguageObj: action.payload };
    case "tags/selected":
      return { ...state, tags: action.payload };
    case "form/reset":
      return {
        ...state,
        word: "",
        wordTranslation: "",
        context: "",
        contextTranslation: "",
        tags: new Array(state.tags.length).fill(false),
      };
    case "languages/selected":
      return { ...state, languages: action.payload };
    default:
      return state;
  }
};

export const VocaContext = createContext();

export const VocaProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <VocaContext.Provider value={{ state, dispatch }}>
      {children}
    </VocaContext.Provider>
  );
};

export const useVocaContext = () => {
  const context = useContext(VocaContext);
  if (context === undefined)
    throw new Error("VocaContext uas used outside of VocaProvider");

  return context;
};
