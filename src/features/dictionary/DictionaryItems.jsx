import { useEffect } from "react";
import DictionaryItem from "./DictionaryItem";
import { useDictionaryContext } from "../../contexts/DictionaryContext";
import tw from "tailwind-styled-components";
import { useVocabularyPerUser } from "../vocabularies/useVocabulary";
import { useVocaFilterContext } from "../../contexts/VocaFilterContext";

const MainContainer = tw.div`overflow-scroll flex flex-col gap-8 mt-4 px-4 text-neutral-800 dark:text-neutral-100`;

export default function DictionaryItems() {
  const { vocabulary } = useVocabularyPerUser();

  const { state: stateVocaFilter, dispatch: dispatchVocaFilter } =
    useVocaFilterContext();
  const {
    language,
    isLearningLanguage,
    projectType,
    wordsIdsFilteredOut,
    singleProjectId,
    wordTypes,
  } = stateVocaFilter;

  const { state: stateDictionary, dispatch: dispatchDictionary } =
    useDictionaryContext();

  // Define the list of words (project assigned or not (quickies)) for the language selected
  const wordsPerLanguage = vocabulary?.filter(
    (obj) => obj.learningLanguage === language,
  );

  let myVocaFiltered;
  if (projectType === "allProjects") {
    myVocaFiltered = wordsPerLanguage?.filter(
      (obj) => obj.project_id && !wordsIdsFilteredOut.includes(obj.id),
    );
  } else if (projectType === "singleProject") {
    myVocaFiltered = wordsPerLanguage?.filter(
      (obj) =>
        obj.project_id &&
        obj.project_id === singleProjectId &&
        !wordsIdsFilteredOut.includes(obj.id),
    );
  } else {
    // Quickies
    myVocaFiltered = wordsPerLanguage?.filter(
      (obj) => !obj.project_id && !wordsIdsFilteredOut.includes(obj.id),
    );
  }

  const { wordSearched, dateIsDescending } = stateDictionary;

  // Define the words filtered by project type, learningLanguage/motherLanguage selected, date ascending or not,
  // and finally the modal filter options (type, categories, completion, score, favorite, etc.)
  const words = myVocaFiltered
    ?.filter((obj) => {
      const word = isLearningLanguage ? obj.word : obj.word_translation;
      const context = isLearningLanguage
        ? obj.context
        : obj.context_translation;

      // Get ids of all types filtered by user in Filter modal window
      const typesFiltered = wordTypes?.filter((obj) => obj.selected);
      const typesNameFiltered = typesFiltered?.map((obj) =>
        obj.label.toLowerCase(),
      );

      // If quickies, we cannot evaluate the word type since there are no assigned, because it is a quicky per nature
      const typeConditionMet =
        projectType === "quickies"
          ? true
          : typesNameFiltered?.includes(obj.type);

      return (
        (word?.toLowerCase().includes(wordSearched?.toLowerCase()) ||
          context?.toLowerCase().includes(wordSearched?.toLowerCase())) &&
        typeConditionMet
      );
    })
    .sort((a, b) => {
      const date1 = new Date(a.created_at);
      const date2 = new Date(b.created_at);

      return dateIsDescending ? date2 - date1 : date1 - date2;
    });

  // Initialise the checked items (i.e. [false, false, false] representing 3 unchecked items)
  useEffect(() => {
    const initialCheckedStates = new Array(myVocaFiltered?.length).fill(false);
    dispatchDictionary({
      type: "items/checked",
      payload: initialCheckedStates,
    });
  }, [myVocaFiltered?.length, dispatchDictionary]);

  return (
    words && (
      <MainContainer>
        {words.map((data, index) => {
          return <DictionaryItem data={data} index={index} key={index} />;
        })}
      </MainContainer>
    )
  );
}
