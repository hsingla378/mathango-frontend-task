import { Button } from "@nextui-org/react";
import React, { useState, useEffect, useRef } from "react";
import { FaHeart } from "react-icons/fa";
import { MdOutlineFastfood } from "react-icons/md";
import RecipeModal from "./RecipeModal";

const Favourite = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavoriteVisible, setIsFavoriteVisible] = useState(false);
  const favoritesRef = useRef(null);

  // Fetch favorite recipes from localStorage when the component mounts
  useEffect(() => {
    const storedFavorite = JSON.parse(localStorage.getItem("favorite")) || [];
    setFavoriteRecipes(storedFavorite);
  }, []);

  const handleCardClick = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  const handleRemoveFavorite = (recipeId) => {
    const updatedFavorites = favoriteRecipes.filter(
      (recipe) => recipe.id !== recipeId
    );
    setFavoriteRecipes(updatedFavorites);
    localStorage.setItem("favorite", JSON.stringify(updatedFavorites));
  };

  const toggleFavoriteVisibility = () => {
    setIsFavoriteVisible(!isFavoriteVisible);
  };

  const handleClickOutside = (event) => {
    if (favoritesRef.current && !favoritesRef.current.contains(event.target)) {
      setIsFavoriteVisible(false);
    }
  };

  useEffect(() => {
    if (isFavoriteVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFavoriteVisible]);

  return (
    <div>
      <Button
        color=""
        variant="bordered"
        className="text-gray-800 w-44"
        startContent={<FaHeart className="text-xl" />}
        onClick={toggleFavoriteVisibility}
      >
        Favourite
      </Button>
      {isFavoriteVisible && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-10" />
          <div
            ref={favoritesRef}
            className="absolute z-20 flex flex-col gap-4 mt-4 p-4 rounded-lg"
          >
            {favoriteRecipes.length > 0 ? (
              favoriteRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="cursor-pointer bg-white p-3 rounded-lg max-w-100px flex gap-2 items-center shadow-2xl justify-between"
                >
                  <div
                    className="flex items-center gap-2"
                    onClick={() => handleCardClick(recipe)}
                  >
                    <MdOutlineFastfood className="font-bold" />
                    <p>{recipe.title}</p>
                  </div>
                  <Button
                    isIconOnly
                    color="error"
                    onClick={() => handleRemoveFavorite(recipe.id)}
                    aria-label="Remove from favorite"
                  >
                    <FaHeart className="text-red-600" />
                  </Button>
                </div>
              ))
            ) : (
              <p className="bg-white p-3 rounded-lg max-w-100px flex gap-1 items-center shadow-2xl">
                No favorite recipes found. 😢
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

export default Favourite;
