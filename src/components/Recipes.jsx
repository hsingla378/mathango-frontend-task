import { Card, CardBody, Image } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
// import { recipes } from "../util/randomRecipes";
import RecipeModal from "./RecipeModal";

const Recipes = ({ isPending, error, recipes }) => {
  const [selecedRecipeId, setSelecedRecipeId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (recipeId) => {
    setSelecedRecipeId(recipeId);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelecedRecipeId(null);
  };

  return (
    <div className="p-4">
      <h3 className="font-bold mb-3">All Recipes</h3>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-5">
        {recipes.map((recipe) => (
          <div
            className="p-0 m-0 rounded-2xl overflow-hidden border-1 border-gray-200 shadow-sm hover:shadow-md cursor-pointer bg-white h-[100px]"
            key={recipe.id}
            onClick={() => handleCardClick(recipe.id)}
          >
            <div className="p-0 m-0 h-full">
              <div className="flex gap-1 h-full">
                <div className="w-[35%] h-full">
                  <img
                    alt={recipe.title}
                    className="cover col-span-2 h-full w-full"
                    src={recipe.image}
                  />
                </div>
                <div className="flex flex-col justify-center w-[65%] p-3 h-full">
                  <div>
                    <h4 className="font-semibold">{recipe.title}</h4>
                    <p className="text-gray-500">
                      Ready in {recipe.readyInMinutes} mins
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <p className="text-center">Loading more recipes</p> */}

      {selecedRecipeId && (
        <RecipeModal
          similarRecipes={recipes}
          recipeId={selecedRecipeId}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onRecipeClick={handleCardClick}
        />
      )}
    </div>
  );
};

export default Recipes;
