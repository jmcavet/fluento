import { createContext, useContext, useReducer } from "react";

const methods = [
  { value: "random", label: "Random" },
  { value: "sortByDateLatest", label: "Sort by date (latest first)" },
  { value: "sortByDateOldest", label: "Sort by date (oldest first)" },
];

const initialState = {
  scoreToBeat: 0,
  totalWords: 0,
  wordsBy: [],
  currentIndex: 0,
  isTranslationVisible: false,
  projectType: "allProjects",
  gameStarted: false,
  isGameOver: false,
  method: methods[0].value,
  myWordsIds: null,
  wordIncrement: 1,
  pointsCumulated: 0,
  scoreLive: 0,
  wordIdsToDelete: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "test/TEST":
      return {
        ...state,
        scoreToBeat: action.payload.scoreToBeat,
        totalWords: action.payload.nbWords,
        wordsBy: action.payload.wordsBy,
        isTranslationVisible: false,
        gameStarted: true,
        myWordsIds: action.payload.myWordsIds,
        wordIncrement: initialState.wordIncrement,
        pointsCumulated: initialState.pointsCumulated,
        scoreLive: initialState.scoreUpdated,
        wordIdsToDelete: initialState.wordIdsToDelete,
      };
    case "method/selected":
      return { ...state, method: action.payload };

    case "game/reset":
      return {
        ...state,
        gameStarted: initialState.false,
        isGameOver: initialState.false,
      };
    case "game/running":
      return {
        ...state,
        wordIncrement: state.wordIncrement + 1,
        pointsCumulated: state.pointsCumulated + action.payload.scoreValue,
        scoreLive: action.payload.scoreUpdated,
        isTranslationVisible: false,
      };
    case "game/over":
      // Update the wordIncrement by substracting the number of words to delete. Indeed, the 'words' variable in the "GamePlay"
      // component will be updated as well automatically whenever those words are finished being deleted. The increment of
      // word will not be adjusted anymore and will be greater than the number of words available!
      return {
        ...state,
        wordIncrement: state.wordIncrement - state.wordIdsToDelete.length,
        scoreLive: action.payload.scoreUpdated,
        isGameOver: true,
      };
    case "word/deleted":
      // Deleting a word throughout the game can have various effects:
      // Either it is the last word of the game (12/12 for instance): then do not increase the 'wordIncrement' AND the game is over
      // Or it is NOT the last word: then we can increase the 'wordIncrement' as usual
      return {
        ...state,
        isTranslationVisible: false,
        isGameOver: state.wordIncrement === state.totalWords ? true : false,
        wordIncrement:
          state.wordIncrement === state.totalWords
            ? state.wordIncrement
            : state.wordIncrement + 1,
        wordIdsToDelete: [...state.wordIdsToDelete, action.payload],
      };
    case "translationVisibility/displayed":
      return { ...state, isTranslationVisible: true };
    case "translationVisibility/reset":
      return { ...state, isTranslationVisible: false };
    case "projectType/selected":
      return { ...state, projectType: action.payload };
    case "filter/reset":
      return {
        ...state,
        projectType: initialState.projectType,
      };
    default:
      return state;
  }
};

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined)
    throw new Error("GameContext uas used outside of GameProvider");

  return context;
};
