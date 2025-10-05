import Flag from "react-flagkit";
import { useProjectContext } from "../../contexts/ProjectContext";

export default function Language({
  language,
  setLanguageSelected,
  setSearchLanguage,
}) {
  const { state, dispatch } = useProjectContext();
  const { currentStep, totalSteps } = state;

  let languageType;
  if (totalSteps === 3) {
    languageType = currentStep === 1 ? "motherLanguage" : "learningLanguage";
  }
  if (totalSteps === 2) {
    languageType = currentStep === 1 ? "learningLanguage" : "null";
  }

  return (
    <li
      className="flex items-center justify-between py-4 m-4 border-b border-slate-300 cursor-pointer hover:bg-primary-200 hover:dark:bg-primary-700"
      onClick={() => {
        setLanguageSelected(language.name);
        setSearchLanguage("");
        dispatch({
          type: "projectStep/next",
          payload: { [languageType]: language.name },
        });
      }}
    >
      <div>{language.name}</div>
      <div>
        <Flag country={language.countryCode} size={40} />
      </div>
    </li>
  );
}
