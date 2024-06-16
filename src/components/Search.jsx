import { Input } from "@nextui-org/react";
import React, { useState, useEffect, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { recipes } from "../util/randomRecipes";
import { MdOutlineFastfood } from "react-icons/md";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debounceTimeout = useRef(null);

  const handleSearch = (value) => {
    if (value.trim() === "") {
      setSearchedRecipes([]);
      setIsSearching(false);
      return;
    }

    const filteredRecipes = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(value.toLowerCase())
    );
    setSearchedRecipes(filteredRecipes);
    setIsSearching(false);
  };

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    setIsSearching(true);
    debounceTimeout.current = setTimeout(() => {
      handleSearch(searchValue);
    }, 500);

    return () => {
      clearTimeout(debounceTimeout.current);
    };
  }, [searchValue]);

  const highlightText = (text, highlight) => {
    if (!highlight.trim()) {
      return text;
    }
    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);
    return (
      <>
        {parts.map((part, index) =>
          regex.test(part) ? <strong key={index}>{part}</strong> : part
        )}
      </>
    );
  };

  return (
    <div className="max-w-[90%] relative">
      <Input
        isClearable
        value={searchValue}
        radius="lg"
        placeholder="Search any recipe"
        variant="bordered"
        startContent={<IoSearch className="text-black" />}
        onChange={(e) => setSearchValue(e.target.value)}
        onClear={() => setSearchValue("")} // Add onClear handler
        className="w-[400px] max-w-[90%]"
      />
      {searchValue && (
        <div className="absolute z-20 flex flex-col gap-4 mt-4 p-4 rounded-lg shadow-lg">
          {isSearching ? (
            <p className="bg-white p-3 rounded-lg max-w-100px flex gap-1 items-center shadow-2xl">
              Searching...
            </p>
          ) : searchedRecipes.length > 0 ? (
            searchedRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white p-3 rounded-lg max-w-100px flex gap-1 items-center shadow-2xl"
              >
                <MdOutlineFastfood className="font-bold" />
                <p>{highlightText(recipe.title, searchValue)}</p>
              </div>
            ))
          ) : (
            <p className="bg-white p-3 rounded-lg max-w-100px flex gap-1 items-center shadow-2xl">
              No recipes found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
