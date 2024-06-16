import React from "react";
import { PopularRecipes } from "../components/PopularRecipes";
import Recipes from "../components/Recipes";

const Home = () => {
  return (
    <div className="max-w-[85%]">
      <PopularRecipes />
      <Recipes />
    </div>
  );
};

export default Home;
