import { createContext, useContext, useReducer } from "react";

const initialState = {
  motherLanguage: null,
  homeTab: "projects",
  darkMode: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "motherLanguage/defined":
      return {
        ...state,
        motherLanguage: action.payload,
      };
    case "homeTab/selected":
      return {
        ...state,
        homeTab: action.payload,
      };
    case "darkMode/selected":
      return {
        ...state,
        darkMode: action.payload,
      };
    default:
      return state;
  }
};

export const GeneralSettingsContext = createContext();

export const GeneralSettingsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GeneralSettingsContext.Provider value={{ state, dispatch }}>
      {children}
    </GeneralSettingsContext.Provider>
  );
};

export const useGeneralSettingsContext = () => {
  const context = useContext(GeneralSettingsContext);
  if (context === undefined)
    throw new Error(
      "GeneralSettingsContext uas used outside of GeneralSettingsProvider"
    );

  return context;
};
