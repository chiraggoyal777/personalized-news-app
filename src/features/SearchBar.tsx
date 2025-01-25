import { FormEvent, useRef, useState } from "react";
import { useQueryParams } from "../hooks/useQueryParams";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
const SearchBar = () => {
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const { q } = useQueryParams();
  const [searchVal, setSearchVal] = useState(q || "");

  function handleSearchArticle(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (searchVal.trim() !== "") {
      navigate(`/search-results?q=${searchVal}`);
    }
  }
  return (
    <form
      className="relative flex w-full items-center rounded-md bg-white md:w-96"
      onSubmit={handleSearchArticle}
    >
      <input
        className="w-full grow bg-transparent px-4 py-3 pr-0 text-dark"
        ref={searchInputRef}
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
        spellCheck="false"
        type="search"
        // required
        placeholder="Search articles..."
      />
      <div className="flex items-center px-2 text-medium">
        {searchVal !== "" && (
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full text-center transition-all hover:bg-light-theme hover:text-dark-theme"
            type="button"
            aria-label="Clear"
            onClick={() => setSearchVal("")}
          >
            <XMarkIcon className="shrink-0" width="1.25rem" height="1.25rem" />
          </button>
        )}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-full text-center transition-all hover:bg-light-theme hover:text-dark-theme"
          type="submit"
          aria-label="Search"
        >
          <MagnifyingGlassIcon
            className="shrink-0"
            width="1.25rem"
            height="1.25rem"
          />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
