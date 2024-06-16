import React from "react";
import { PopularRecipes } from "../components/PopularRecipes";
import Recipes from "../components/Recipes";
import { Header } from "../components/Header";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="max-w-[85%] m-auto">
        <PopularRecipes />
        <Recipes />
      </div>
    </div>
  );
};

export default Home;
