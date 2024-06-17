import React from "react";
import { PopularRecipes } from "../components/PopularRecipes";
import Recipes from "../components/Recipes";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["recipes"],
    queryFn: () =>
      fetch("https://api.spoonacular.com/recipes/random?number=12", {
        headers: {
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      }).then((res) => res.json()),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    // cacheTime: 1000 * 60 * 60, // 1 hour
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="mb-20 lg:mb-0 lg:max-w-[85%] m-auto">
      <Header />
      <div className="">
        <PopularRecipes
          isPending={isPending}
          error={error}
          recipes={data.recipes}
        />
        <Recipes isPending={isPending} error={error} recipes={data.recipes} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
