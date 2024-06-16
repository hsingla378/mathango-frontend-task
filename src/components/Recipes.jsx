// import { Card, CardBody, Image } from "@nextui-org/react";
// import { useQuery } from "@tanstack/react-query";
// import React, { useState } from "react";
// import { recipes } from "../util/randomRecipes";
// import RecipeModal from "./RecipeModal";

// const Recipes = () => {
//   // Uncomment the following lines to fetch recipes from the API
//   // const { isPending, error, data } = useQuery({
//   //   queryKey: ["repoData"],
//   //   queryFn: () =>
//   //     fetch("https://api.spoonacular.com/recipes/random?number=10", {
//   //       headers: {
//   //         "x-api-key": import.meta.env.VITE_API_KEY,
//   //       },
//   //     }).then((res) => res.json()),
//   // });

//   // if (isPending) return "Loading...";

//   // if (error) return "An error has occurred: " + error.message;
//   // let recipes = data.recipes;

//   const [selectedRecipe, setSelectedRecipe] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleCardClick = (recipe) => {
//     setSelectedRecipe(recipe);
//     setIsModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//     setSelectedRecipe(null);
//   };

//   return (
//     <div>
//       <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-5 p-5">
//         {recipes.length > 0 &&
//           recipes.map((recipe) => (
//             <div
//               className="max-w-[610px] p-0 m-0 rounded-2xl overflow-hidden border-1 border-gray-200 shadow-sm hover:shadow-md cursor-pointer bg-white"
//               key={recipe.id}
//               onClick={() => handleCardClick(recipe)}
//             >
//               <div className="p-0 m-0">
//                 <div className="grid grid-cols-6 gap-1">
//                   <img
//                     alt={recipe.title}
//                     className="cover col-span-2"
//                     src={recipe.image}
//                   />
//                   <div className="flex flex-col justify-center col-span-4 p-3">
//                     <div>
//                       <h4 className="font-semibold">{recipe.title}</h4>
//                       <p className="text-gray-500">
//                         Ready in {recipe.readyInMinutes} mins
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//       </div>
//       <p className="text-center">Loading more recipes</p>

//       {selectedRecipe && (
//         <RecipeModal
//           recipe={selectedRecipe}
//           isOpen={isModalOpen}
//           onClose={handleModalClose}
//         />
//       )}
//     </div>
//   );
// };

// export default Recipes;

import { Card, CardBody, Image } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { recipes } from "../util/randomRecipes";
import RecipeModal from "./RecipeModal";

const Recipes = () => {
  // Uncomment the following lines to fetch recipes from the API
  // const { isPending, error, data } = useQuery({
  //   queryKey: ["repoData"],
  //   queryFn: () =>
  //     fetch("https://api.spoonacular.com/recipes/random?number=10", {
  //       headers: {
  //         "x-api-key": import.meta.env.VITE_API_KEY,
  //       },
  //     }).then((res) => res.json()),
  // });

  // if (isPending) return "Loading...";

  // if (error) return "An error has occurred: " + error.message;
  // let recipes = data.recipes;

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  return (
    <div>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-5 p-5">
        {recipes.length > 0 &&
          recipes.map((recipe) => (
            <div
              className="max-w-[610px] p-0 m-0 rounded-2xl overflow-hidden border-1 border-gray-200 shadow-sm hover:shadow-md cursor-pointer bg-white"
              key={recipe.id}
              onClick={() => handleCardClick(recipe)}
            >
              <div className="p-0 m-0">
                <div className="grid grid-cols-6 gap-1">
                  <img
                    alt={recipe.title}
                    className="cover col-span-2"
                    src={recipe.image}
                  />
                  <div className="flex flex-col justify-center col-span-4 p-3">
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
      <p className="text-center">Loading more recipes</p>

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

export default Recipes;
