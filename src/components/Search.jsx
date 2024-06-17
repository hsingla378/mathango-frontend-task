import { Input } from "@nextui-org/react";
import React, { useState, useRef, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { MdOutlineFastfood } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import RecipeModal from "./RecipeModal";

const Search = () => {
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const debounceTimeout = useRef(null);
  const searchRef = useRef(null);

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["search"],
    queryFn: () =>
      fetch(
        `https://api.spoonacular.com/recipes/complexSearch?titleMatch=${searchValue}&number=5`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      ).then((res) => res.json()),
    config: {
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  });

  const handleCardClick = (recipeId) => {
    setSelectedRecipeId(recipeId);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRecipeId(null);
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

  const debounceSearch = (value) => {
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      refetch({ query: value });
    }, 500);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    debounceSearch(value);
  };

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
    <div className="max-w-[90%] relative mt-5 lg:mt-0">
      <Input
        isClearable
        value={searchValue}
        radius="lg"
        placeholder="Search any recipe"
        variant="bordered"
        startContent={<IoSearch className="text-black" />}
        onChange={handleInputChange}
        onClear={() => setSearchValue("")}
        className="min-w-[350px] max-w-[90%] bg-white rounded-xl"
      />
      {searchValue && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-10" />
          <div
            ref={searchRef}
            className="absolute z-20 flex flex-col gap-4 mt-4 p-4 rounded-lg"
          >
            {isLoading ? (
              <p className="bg-white p-3 rounded-lg max-w-100px flex gap-1 items-center shadow-2xl">
                Searching... 🧐
              </p>
            ) : data?.results.length > 0 ? (
              data.results.map((recipe) => (
                <div
                  onClick={() => handleCardClick(recipe.id)}
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
      {selectedRecipeId && (
        <RecipeModal
          recipeId={selectedRecipeId}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onRecipeClick={handleCardClick}
        />
      )}
    </div>
  );
};

export default Search;
