import Heading from "../../ui/Heading";
import Flag from "react-flagkit";
import { getLanguageCode } from "../../utils/languages";

export default function ProjectDefinitionHeader({ title, learningLanguage }) {
  const countryCode = getLanguageCode(learningLanguage);

  return (
    <div className="flex items-center justify-center my-16 flex-col gap-8">
      <p className="text-2xl md:text-3xl">{title}</p>

      <Flag country={countryCode} size={40} />
    </div>
  );
}
