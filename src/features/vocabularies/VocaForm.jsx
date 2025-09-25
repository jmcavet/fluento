import { useCallback, useState } from "react";
import Select from "react-select";
import { Select as MySelect } from "../../ui/Select";

import FormRow from "../../ui/FormRow";
import Flag from "react-flagkit";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
import {
  getLanguageCode,
  getUniqueLearningLanguages,
} from "../../utils/languages";
import { useProjectContext } from "../../contexts/ProjectContext";
import { useProject } from "../projects/useProject";
import { useGeneralSettingsContext } from "../../contexts/GeneralSettingsContext";
import { useVocaContext } from "../../contexts/VocaContext";
import { useEffect } from "react";

import tw from "tailwind-styled-components";
import { useVocaFilterContext } from "../../contexts/VocaFilterContext";

const MainContainer = tw.div`bg-neutral-0 dark:bg-neutral-800 p-4 rounded-2xl text-3xl shadow dark:shadow-neutral-700`;
const Input = tw.input`text-4xl p-6 bg-neutral-100 placeholder-neutral-300 dark:bg-neutral-700 dark:text-neutral-0 dark:placeholder-neutral-400 rounded-xl`;
const Textarea = tw.textarea`text-4xl p-6 bg-neutral-100 placeholder-neutral-300 dark:bg-neutral-700 dark:text-neutral-0 dark:placeholder-neutral-400 rounded-xl`;

export default function VocaForm() {
  const { state, dispatch } = useProjectContext();
  let projectSelected = state.projectSelected;

  const { projects } = useProject();

  const { state: stateVoca, dispatch: dispatchVoca } = useVocaContext();
  const { state: stateVocaFilter, dispatch: dispatchVocaFilter } =
    useVocaFilterContext();
  const wordTypes = stateVocaFilter.wordTypes;
  const wordType = stateVocaFilter.wordType;
  const learningLanguages = getUniqueLearningLanguages(projects);

  // Define the learning languages options used by the <Select /> "react-select" component
  const learningLanguagesOptions = learningLanguages?.map((language) => ({
    value: language,
    label: (
      <div className="flex items-center justify-between pt-4 pb-2">
        <Flag country={getLanguageCode(language)} />
      </div>
    ),
  }));

  useEffect(() => {
    if (learningLanguagesOptions) {
      dispatchVoca({
        type: "learningLanguage/selected",
        payload: learningLanguagesOptions[0],
      });
    }
  }, []); // LEAVE DEPENDENCY ARRAY EMPTY, OTHERWISE INFINITE RENDERINGS!

  // If all projects have been previously selected (in the dictionary for instance), redefine the 'projectSelected'
  // as the first one provided in the array.
  if (Array.isArray(projectSelected))
    dispatch({ type: "project/selected", payload: projectSelected[0] });

  const [languageDisplayed, setLanguageDisplayed] =
    useState("learningLanguage");

  const [errors, setErrors] = useState({
    word: { message: "" },
    type: { message: "" },
    context: { message: "" },
  });

  const handleSwitchLanguage = () => {
    if (languageDisplayed === "learningLanguage")
      setLanguageDisplayed("motherLanguage");
    else setLanguageDisplayed("learningLanguage");
  };

  const handleSelectLearningLanguage = (learningLanguageOption) => {
    dispatchVoca({
      type: "learningLanguage/selected",
      payload: learningLanguageOption,
    });
  };

  const flag = (
    <Flag
      country={getLanguageCode(projectSelected[languageDisplayed])}
      size={30}
      className="rounded-xl border-2 border-neutral-900 dark:border-neutral-0"
    />
  );

  return (
    projectSelected && (
      <MainContainer>
        <div className="flex items-center justify-end gap-6 mb-4">
          {flag}
          <FlipCameraAndroidIcon
            sx={{ fontSize: 30 }}
            className="text-primary-500 dark:text-primary-500 cursor-pointer"
            onClick={handleSwitchLanguage}
          />
        </div>
        <div className="flex flex-col items-start justify-center gap-8">
          <FormRow error={errors?.word?.message}>
            {languageDisplayed === "learningLanguage" && (
              <Input
                type="text"
                id="word"
                value={stateVoca.word}
                placeholder="Word"
                // autoFocus={true}
                onChange={(e) =>
                  dispatchVoca({
                    type: "word/updated",
                    payload: e.target.value,
                  })
                }
              />
            )}
            {languageDisplayed === "motherLanguage" && (
              <Input
                type="text"
                id="wordTranslation"
                value={stateVoca.wordTranslation}
                placeholder="Word Translation"
                onChange={(e) =>
                  dispatchVoca({
                    type: "wordTranslation/updated",
                    payload: e.target.value,
                  })
                }
              />
            )}
          </FormRow>

          <FormRow error={errors?.word?.message}>
            {languageDisplayed === "learningLanguage" && (
              <Textarea
                value={stateVoca.context}
                placeholder="Context"
                rows={3}
                onChange={(e) =>
                  dispatchVoca({
                    type: "context/updated",
                    payload: e.target.value,
                  })
                }
              />
            )}
            {languageDisplayed === "motherLanguage" && (
              <Textarea
                value={stateVoca.contextTranslation}
                placeholder="Context Translation"
                rows={3}
                onChange={(e) =>
                  dispatchVoca({
                    type: "contextTranslation/updated",
                    payload: e.target.value,
                  })
                }
              />
            )}
          </FormRow>

          {stateVoca.processType === "standard" ? (
            <div className="flex items-center justify-start gap-6 text-neutral-700 dark:text-neutral-300">
              <p>Type</p>
              <FormRow error={errors?.type?.message}>
                <MySelect
                  options={wordTypes}
                  value={wordType}
                  onChange={(e) => {
                    console.log("e.target.value: ", e.target.value);
                    dispatchVocaFilter({
                      type: "wordType/selected",
                      payload: e.target.value,
                    });
                  }}
                />
              </FormRow>
            </div>
          ) : null}
        </div>
      </MainContainer>
    )
  );
}
