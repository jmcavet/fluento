import React, { useState } from "react";
import { HiMagnifyingGlass, HiXMark } from "react-icons/hi2";

export default function InputLanguage() {
  const [search, setSearch] = useState("");

  const clearSearch = (e) => {
    e.preventDefault();
    setSearch("");
  };

  return (
    <form className="flex items-center my-12">
      <label
        htmlFor="default-search"
        className="mb-2 font-medium text-gray-900 sr-only dark:text-gray-300"
      >
        Search
      </label>
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <HiMagnifyingGlass />
        </div>
        <input
          type="search"
          id="default-search"
          className="block p-4 pl-16 w-[20rem] sm:w-[30rem] md:w-[45rem] lg:w-[60rem] text-2xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-800 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search a language..."
          required
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search && (
          <button
            type="submit"
            className="text-gray-800 absolute right-2.5 bottom-2.5 px-4 py-2"
            onClick={clearSearch}
          >
            <HiXMark />
          </button>
        )}
      </div>
    </form>
  );
}
