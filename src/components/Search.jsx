import { Input } from "@nextui-org/react";
import React, { useState, useEffect, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { recipes } from "../util/randomRecipes";
import { MdOutlineFastfood } from "react-icons/md";
import RecipeModal from "./RecipeModal";

const Search = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debounceTimeout = useRef(null);
  const searchRef = useRef(null);

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

  const handleCardClick = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setSearchValue("");
    }
  };

  useEffect(() => {
    if (searchValue) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchValue]);

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
        onClear={() => setSearchValue("")}
        className="w-[400px] max-w-[90%]"
      />
      {searchValue && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-10" />
          <div
            ref={searchRef}
            className="absolute z-20 flex flex-col gap-4 mt-4 p-4 rounded-lg"
          >
            {isSearching ? (
              <p className="bg-white p-3 rounded-lg max-w-100px flex gap-1 items-center shadow-2xl">
                Searching... 🧐
              </p>
            ) : searchedRecipes.length > 0 ? (
              searchedRecipes.map((recipe) => (
                <div
                  onClick={() => handleCardClick(recipe)}
                  key={recipe.id}
                  className="cursor-pointer bg-white p-3 rounded-lg max-w-100px flex gap-2 items-center shadow-2xl"
                >
                  <MdOutlineFastfood className="font-bold" />
                  <p>{highlightText(recipe.title, searchValue)}</p>
                </div>
              ))
            ) : (
              <p className="bg-white p-3 rounded-lg max-w-100px flex gap-1 items-center shadow-2xl">
                No recipes found. 😢
              </p>
            )}
          </div>
        </>
      )}
      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onRecipeClick={handleCardClick}
        />
      )}
    </div>
  );
};

export default Search;
