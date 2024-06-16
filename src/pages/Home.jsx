import React from "react";
import { PopularRecipes } from "../components/PopularRecipes";
import Recipes from "../components/Recipes";
import { Header } from "../components/Header";

const Home = () => {
  return (
    <div className="max-w-[85%] m-auto">
      <Header />
      <PopularRecipes />
      <Recipes />
    </div>
  );
};

export default Home;
