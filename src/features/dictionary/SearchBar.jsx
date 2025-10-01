import tw from "tailwind-styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { useDictionaryContext } from "../../contexts/DictionaryContext";

const InputContainer = tw.input`px-2 py-3 text-base md:text-lg w-full text-neutral-0 bg-transparent dark:bg-transparent rounded-[1rem] border border-neutral-0 focus:ring-primary-700 focus:border-neutral-0 placeholder-neutral-200 dark:placeholder-neutral-400`;

export default function SearchBar({
  isFocused,
  setIsFocused,
  wordSearched,
  handleOnChange,
}) {
  const { dispatch: dispatchDictionary } = useDictionaryContext();

  const clearText = () => {
    dispatchDictionary({
      type: "wordSearched/cleared",
    });
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <InputContainer
          type="search"
          id="searchbar2"
          autoFocus={isFocused}
          value={wordSearched}
          placeholder="Search word..."
          onChange={handleOnChange}
          onKeyDown={(e) =>
            e.key === "Enter" ? setIsFocused(false) : setIsFocused(true)
          }
        />
        {wordSearched.length > 0 ? (
          <button
            className="relative right-10 text-neutral-0"
            onClick={() => clearText()}
          >
            <CloseIcon sx={{ fontSize: 24 }} />
          </button>
        ) : null}
      </div>
    </div>
  );
}
