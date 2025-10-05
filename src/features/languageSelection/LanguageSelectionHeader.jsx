import Heading from "../../ui/Heading";

export default function LanguageSelectionHeader({
  title,
  searchLanguage,
  setSearchLanguage,
}) {
  return (
    <div className="flex flex-col items-center max-w-3xl mx-auto my-6">
      <p className="text-2xl md:text-3xl">{title}</p>
      <div className="w-full my-6">
        <input
          type="search"
          id="default-search"
          className="px-2 py-3 pl-4 text-xl w-full bg-neutral-100 dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-400 focus:ring-primary-500 focus:border-primary-500  dark:placeholder-neutral-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Search a language..."
          autoComplete="off"
          value={searchLanguage}
          autoFocus
          onChange={(e) => {
            setSearchLanguage(e.target.value);
          }}
          required
        />
      </div>
    </div>
  );
}
