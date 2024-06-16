import { Card, CardBody, Image } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { recipes } from "../util/randomRecipes";

const Recipes = () => {
  //   const { isPending, error, data } = useQuery({
  //     queryKey: ["repoData"],
  //     queryFn: () =>
  //       fetch("https://api.spoonacular.com/recipes/random?number=10", {
  //         headers: {
  //           "x-api-key": import.meta.env.VITE_API_KEY,
  //         },
  //       }).then((res) => res.json()),
  //   });

  //   if (isPending) return "Loading...";

  //   if (error) return "An error has occurred: " + error.message;
  //   let recipes = data.recipes;

  return (
    <div>
      {" "}
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-5 p-5">
        {recipes.length > 0 &&
          recipes.map((recipe) => {
            return (
              <div
                className="max-w-[610px] p-0 m-0 rounded-2xl overflow-hidden border-1 border-gray-200 shadow-sm hover:shadow-md cursor-pointer bg-white"
                key={recipe.id}
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
            );
          })}
      </div>
      <p className="text-center">Loading more recipes</p>
    </div>
  );
};

export default Recipes;

{
  /* <div key={recipe.id} className="grid grid-cols-2 max-w-96">
            <img src={recipe.image} alt={recipe.title} />
            <div>
              <h4 className="font-semibold">{recipe.title}</h4>
              <p>Ready in {recipe.readyInMinutes} mins</p>
            </div>
          </div> */
}
