import React, { useState, useEffect, useRef } from "react";
import { Button } from "@nextui-org/react";
import { FaHeart } from "react-icons/fa";
import { MdDeleteOutline, MdOutlineFastfood } from "react-icons/md";
import RecipeModal from "./RecipeModal";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Favourite = () => {
  const [favouriteRecipes, setFavouriteRecipes] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavouriteVisible, setIsFavouriteVisible] = useState(false);
  const favouritesRef = useRef(null);
  const navigate = useNavigate();

  // Fetch favourite recipes from localStorage when the component mounts
  useEffect(() => {
    const storedFavourite = JSON.parse(localStorage.getItem("favourite")) || [];
    setFavouriteRecipes(storedFavourite);
  }, []);

  // Check if the user is logged in or not
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      toast.error("Please login to view recipes");
      navigate("/login");
    }
  }, []);

  const handleCardClick = (recipeId) => {
    setSelectedRecipeId(recipeId);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRecipeId(null);
  };

  const handleRemoveFavourite = (recipeId) => {
    const updatedFavourites = favouriteRecipes.filter(
      (recipe) => recipe.id !== recipeId
    );
    setFavouriteRecipes(updatedFavourites);
    toast.success("Removed from favourite");
    localStorage.setItem("favourite", JSON.stringify(updatedFavourites));
  };

  const toggleFavouriteVisibility = () => {
    setIsFavouriteVisible(!isFavouriteVisible);
  };

  const handleClickOutside = (event) => {
    if (
      favouritesRef.current &&
      !favouritesRef.current.contains(event.target)
    ) {
      setIsFavouriteVisible(false);
    }
  };

  useEffect(() => {
    if (isFavouriteVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFavouriteVisible]);

  return (
    <div className="hidden lg:block">
      <Button
        color=""
        variant="bordered"
        className={`text-gray-800 w-44 bg-white ${
          isFavouriteVisible ? "text-blue-600" : ""
        }`}
        startContent={<FaHeart className="text-xl" />}
        onClick={toggleFavouriteVisibility}
      >
        Favourite
      </Button>
      {isFavouriteVisible && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-10" />
          <div
            ref={favouritesRef}
            className="absolute z-20 flex flex-col gap-4 mt-4 p-4 rounded-lg"
          >
            {favouriteRecipes.length > 0 ? (
              favouriteRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="cursor-pointer bg-white p-3 rounded-lg max-w-100px flex gap-2 items-center shadow-2xl justify-between"
                >
                  <div
                    className="flex items-center gap-2"
                    onClick={() => handleCardClick(recipe.id)}
                  >
                    <MdOutlineFastfood className="font-bold" />
                    <p>{recipe.title}</p>
                  </div>
                  <Button
                    isIconOnly
                    color="error"
                    onClick={() => handleRemoveFavourite(recipe.id)}
                    aria-label="Remove from favourite"
                  >
                    <MdDeleteOutline className="text-red-600 text-lg" />
                  </Button>
                </div>
              ))
            ) : (
              <p className="bg-white p-3 rounded-lg max-w-100px flex gap-1 items-center shadow-2xl">
                No favourite recipes found. 😢
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

export default Favourite;
