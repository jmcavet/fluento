import React from "react";
import tw from "tailwind-styled-components";
import Flag from "react-flagkit";
import { getLanguageCode } from "../../utils/languages";

const TagsStyle = tw.ul`flex flex-wrap items-center gap-x-6 gap-y-4`;

export default function LanguagesSingleSelection({
  languageNames,
  languageSelected,
  onHandleClickFlag,
}) {
  const FlagStyle = tw.button`${(p) =>
    p.$selected ? "opacity-100" : "opacity-30"}`;

  return (
    languageNames && (
      <TagsStyle>
        {languageNames?.map((language, index) => {
          return (
            <FlagStyle
              $selected={language === languageSelected}
              key={index}
              onClick={() => onHandleClickFlag(index)}
            >
              <Flag
                country={getLanguageCode(language)}
                size={44}
                className="rounded-xl border-2 border-neutral-900 dark:border-neutral-0"
              />
            </FlagStyle>
          );
        })}
      </TagsStyle>
    )
  );
}
