import { languages } from "../data/languages";

export const getLanguageCode = (languageSearched) => {
  const languageObject = languages?.filter(
    (language) =>
      language.name.toLowerCase() === languageSearched?.toLowerCase()
  );

  return languageObject[0]?.countryCode;
};

export const getFilteredLanguages = (languageSearched) => {
  const filteredLanguages = languages?.filter((language) =>
    language.name.toLowerCase().startsWith(languageSearched?.toLowerCase())
  );

  return filteredLanguages;
};

export const getUniqueLearningLanguages = (projects) => {
  // Get all learning languages for all user projects
  const allLearningLanguages = projects.map(
    (project) => project.learningLanguage
  );

  // Remove any duplicates and have a final unique array of learning languages
  const learningLanguages = [...new Set(allLearningLanguages)];

  return learningLanguages;
};
