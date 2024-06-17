import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../src/style.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import { recipes } from "../util/randomRecipes";
import { Button, Card, CardFooter, Image } from "@nextui-org/react";
import RecipeModal from "./RecipeModal";
import { truncateTitle } from "../util/constant";

export const PopularRecipes = ({ isPending, error, recipes }) => {
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (recipeId) => {
    setSelectedRecipeId(recipeId);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRecipeId(null);
  };

  return (
    <div className="p-4">
    <h3 className="font-bold mb-3">Popular Recipes</h3>
      <Swiper
        slidesPerView={2.2}
        spaceBetween={15}
        navigation={true}
        modules={[Navigation, Autoplay]}
        className="mySwiper h-[152px]"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
          1280: {
            slidesPerView: 6,
            spaceBetween: 50,
          },
        }}
        // loop={true}
      >
        {recipes.map((recipe) => {
          return (
            <SwiperSlide
              key={recipe.id}
              className="cover rounded-lg cursor-pointer h-full"
              onClick={() => handleCardClick(recipe.id)}
            >
              <Card className="cover h-full">
                <Image
                  alt={recipe.title}
                  className="cover h-full w-full brightness-[60%]"
                  src={recipe.image}
                />
                <CardFooter className="flex-col items-start text-left py-1 absolute bottom-1 z-10">
                  <p className=" text-sm text-white font-semibold">
                    {truncateTitle(recipe.title, 15)}
                  </p>
                  <p className="text-tiny text-gray-200">
                    Ready in {recipe.readyInMinutes} mins
                  </p>
                </CardFooter>
              </Card>
            </SwiperSlide>
          );
        })}
        {selectedRecipeId && (
          <RecipeModal
            similarRecipes={recipes}
            recipeId={selectedRecipeId}
            isOpen={isModalOpen}
            onClose={handleModalClose}
            onRecipeClick={handleCardClick}
          />
        )}
      </Swiper>
    </div>
  );
};
