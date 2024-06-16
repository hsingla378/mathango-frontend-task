import React from "react";
import { PopularRecipes } from "../components/PopularRecipes";
import Recipes from "../components/Recipes";

const Home = () => {
  return (
    <div>
      <PopularRecipes />
      <Recipes />
    </div>
  );
};

export default Home;
