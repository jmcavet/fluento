import { createContext, useContext, useReducer } from "react";

const initialState = {
  wordContextOptions: ["Word & Context", "Word", "Context"],
  wordContextIndex: 0,
  wordTagIsSelected: true,
  contextTagIsSelected: true,
  toggleUpdateIsOn: false,
  itemsChecked: [],
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
  wordSearched: "",
  nbFiltersOn: 0,
  dateIsDescending: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    // User clicks on one of the Tags ('Word' or 'Context') for displaying/hiding them on the list of items
    case "wordContextTags/selected":
      return {
        ...state,
        wordTagIsSelected: action.selection.wordTagIsSelected,
        contextTagIsSelected: action.selection.contextTagIsSelected,
      };

    case "wordContextTag/selected":
      return {
        ...state,
        wordContextIndex:
          state.wordContextIndex < 2 ? state.wordContextIndex + 1 : 0,
      };

    // User switches on/off the ui used for updating specific items
    case "toggleUpdate/selected":
      return { ...state, toggleUpdateIsOn: !state.toggleUpdateIsOn };

    // Initialization: creates an array of n (number of voca) empty objects
    // User select either single item, all of them or none of them --> for updating (edit / delete)
    case "items/checked":
      return { ...state, itemsChecked: action.payload };

    case "items/allUnchecked":
      const newArray = new Array(action.payload).fill(false);
      return { ...state, itemsChecked: newArray };

    // Vocabulary searched by user
    case "word/searched":
      return { ...state, wordSearched: action.payload };
    case "wordSearched/cleared":
      return { ...state, wordSearched: "" };

    case "dateSorting/toggled":
      return { ...state, dateIsDescending: !state.dateIsDescending };

    default:
      return state;
  }
};

export const DictionaryContext = createContext();

export const DictionaryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DictionaryContext.Provider value={{ state, dispatch }}>
      {children}
    </DictionaryContext.Provider>
  );
};

export const useDictionaryContext = () => {
  const context = useContext(DictionaryContext);
  if (context === undefined)
    throw new Error("DictionaryContext uas used outside of DictionaryProvider");

  return context;
};
