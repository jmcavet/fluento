import React from "react";
import Language from "./Language";
import { getFilteredLanguages } from "../../utils/languages";

export default function Languages({
  searchLanguage,
  setSearchLanguage,
  languageSelected,
  setLanguageSelected,
}) {
  const filteredLanguages = getFilteredLanguages(searchLanguage);

  return (
    <div className="max-w-6xl">
      {filteredLanguages.map((language) => (
        <Language
          language={language}
          key={language.name}
          languageSelected={languageSelected}
          setLanguageSelected={setLanguageSelected}
          setSearchLanguage={setSearchLanguage}
        />
      ))}
    </div>
  );
}
