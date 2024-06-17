import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../src/style.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { recipes } from "../util/randomRecipes";
import { Button, Card, CardFooter, Image } from "@nextui-org/react";
import RecipeModal from "./RecipeModal";

export const PopularRecipes = () => {
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
    <div className="p-4">
      <Swiper
        slidesPerView={6}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        // loop={true}
      >
        {recipes.map((recipe) => {
          return (
            <SwiperSlide
              key={recipe.id}
              className="cover rounded-lg cursor-pointer"
              onClick={() => handleCardClick(recipe)}
            >
              <Card className="cover">
                <Image
                  alt={recipe.title}
                  className="cover h-full w-full brightness-[60%]"
                  src={recipe.image}
                />
                <CardFooter className="flex-col items-start text-left py-1 absolute bottom-1 z-10">
                  <p className=" text-sm text-white font-semibold">
                    {recipe.title}
                  </p>
                  <p className="text-tiny text-gray-300">
                    Ready in {recipe.readyInMinutes} mins
                  </p>
                </CardFooter>
              </Card>
            </SwiperSlide>
          );
        })}
        {selectedRecipe && (
          <RecipeModal
            recipe={selectedRecipe}
            isOpen={isModalOpen}
            onClose={handleModalClose}
            onRecipeClick={handleCardClick}
          />
        )}
      </Swiper>
    </div>
  );
};
