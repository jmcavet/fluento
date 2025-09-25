import Heading from "../../ui/Heading";

export default function LanguageSelectionHeader({
  title,
  searchLanguage,
  setSearchLanguage,
}) {
  return (
    <div className="my-6">
      <p className="text-4xl">{title}</p>
      <div className="col-span-full my-6">
        <input
          type="search"
          id="default-search"
          className="p-2 pl-4 text-2xl w-full h-20 bg-neutral-100 dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-400 focus:ring-primary-500 focus:border-primary-500  dark:placeholder-neutral-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
