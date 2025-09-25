import tw from "tailwind-styled-components";
import { getLanguageCode } from "../../utils/languages";
import Flag from "react-flagkit";

const TagsStyle = tw.ul`flex flex-wrap items-center gap-x-6 gap-y-4`;

export default function LanguageFilter({ languages, onHandleClickFlag }) {
  const FlagStyle = tw.button`${(p) =>
    p.$selected ? "opacity-100" : "opacity-20"}`;

  return (
    languages && (
      <TagsStyle>
        {languages?.map((language, index) => {
          return (
            <FlagStyle
              $selected={language.selected}
              key={index}
              onClick={() => onHandleClickFlag(index)}
            >
              <Flag
                country={getLanguageCode(language.language)}
                size={44}
                className="rounded-xl"
              />
            </FlagStyle>
          );
        })}
      </TagsStyle>
    )
  );
}
