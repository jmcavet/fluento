import { useState } from "react";
import LanguageSelectionHeader from "../features/languageSelection/LanguageSelectionHeader";
import Languages from "../features/languageSelection/Languages";

const LanguageSelection = ({
  title,
  searchLanguage,
  setSearchLanguage,
  languageSelected,
  setLanguageSelected,
}) => {
  return (
    <Languages
      searchLanguage={searchLanguage}
      setSearchLanguage={setSearchLanguage}
      languageSelected={languageSelected}
      setLanguageSelected={setLanguageSelected}
    />
  );
};

export default LanguageSelection;
