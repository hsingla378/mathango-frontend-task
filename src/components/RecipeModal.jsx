import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Accordion,
  AccordionItem,
  Image,
} from "@nextui-org/react";
import { MdNavigateNext } from "react-icons/md";
import { FaHeart, FaRegArrowAltCircleLeft } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { similarRecipes } from "../util/similarRecipes";

const RecipeModal = ({ recipe, isOpen, onClose, onRecipeClick }) => {
  const modalContentRef = useRef(null);
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if the recipe is in favorite when the component mounts or recipe changes
  useEffect(() => {
    if (recipe) {
      const favorite = JSON.parse(localStorage.getItem("favorite")) || [];
      const isFav = favorite.some((favRecipe) => favRecipe.id === recipe.id);
      setIsFavorite(isFav);
    }
  }, [recipe]);

  // Scroll to top when modal opens or when a new recipe is selected
  useEffect(() => {
    if (isOpen && modalContentRef.current) {
      modalContentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isOpen, recipe]);

  const handleFavoriteClick = () => {
    const favorite = JSON.parse(localStorage.getItem("favorite")) || [];
    if (isFavorite) {
      // Remove from favorite
      const updatedFavorite = favorite.filter(
        (favRecipe) => favRecipe.id !== recipe.id
      );
      localStorage.setItem("favorite", JSON.stringify(updatedFavorite));
    } else {
      // Add to favorite
      favorite.push(recipe);
      localStorage.setItem("favorite", JSON.stringify(favorite));
    }
    setIsFavorite(!isFavorite);
  };

  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      scrollBehavior="inside"
      hideCloseButton
    >
      <ModalContent>
        <>
          <ModalHeader className="flex justify-between">
            <div className="flex items-center gap-2">
              <Button
                isIconOnly
                aria-label="Back"
                onPress={onClose}
                className="bg-transparent text-xl"
              >
                <FaRegArrowAltCircleLeft />
              </Button>
              <p>{recipe?.title}</p>
            </div>
            <div>
              <Button
                isIconOnly
                aria-label="Like"
                className="bg-transparent"
                onPress={handleFavoriteClick}
              >
                {isFavorite ? (
                  <FaHeart className="text-2xl text-red-600" />
                ) : (
                  <CiHeart className="text-2xl" />
                )}
              </Button>
            </div>
          </ModalHeader>
          <ModalBody className="p-0" ref={modalContentRef}>
            <img src={recipe?.image} alt={recipe?.title} />
            <div className="p-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col justify-center items-center gap-1 border border-gray-300 p-2 rounded-lg shadow-sm text-gray-600">
                  <span className="text-sm">Ready in</span>
                  <span className="text-blue-700 font-bold">
                    {recipe?.readyInMinutes} mins
                  </span>
                </div>
                <div className="flex flex-col justify-center items-center gap-1 border border-gray-300 p-2 rounded-lg shadow-sm text-gray-600">
                  <span className="text-sm">Servings</span>
                  <span className="text-blue-700 font-bold">
                    {recipe?.servings}
                  </span>
                </div>
                <div className="flex flex-col justify-center items-center gap-1 border border-gray-300 p-2 rounded-lg shadow-sm text-gray-600">
                  <span className="text-sm">Price/serving</span>
                  <span className="text-blue-700 font-bold">
                    {recipe?.pricePerServing}
                  </span>
                </div>
              </div>
            </div>
            <Accordion className="p-4" showDivider={false}>
              <AccordionItem
                key="1"
                aria-label="Ingredients"
                title="Ingredients"
              >
                <div className="grid grid-cols-3 gap-3">
                  {recipe?.extendedIngredients.map((ingredient) => {
                    return (
                      <div
                        key={ingredient.id}
                        className="flex justify-center items-center flex-col gap-1 text-center"
                      >
                        <Image
                          src={recipe.image}
                          className="cover rounded-[50%] h-[100px] w-[100px] m-auto border-1 border-gray-400 shadow-lg"
                        />
                        <span className="text-sm text-black">
                          {ingredient.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </AccordionItem>
              <AccordionItem
                key="2"
                aria-label="Full Recipe"
                title="Full Recipe"
              >
                <h5 className="font-bold mb-4">Instructions</h5>
                <p className="text-gray-600 text-sm">{recipe?.instructions}</p>
                <h5 className="font-bold my-4">Equipments</h5>
                <h5 className="font-bold my-4">Quick Summary</h5>
                <p className="text-gray-600 text-sm">{recipe?.summary}</p>
                <Accordion
                  variant="light"
                  className="my-1 p-0 mx-0 text-sm font-semibold"
                  isCompact
                  showDivider={false}
                >
                  <AccordionItem
                    key="1"
                    aria-label="Nutrition"
                    title="Nutrition"
                    className="text-sm"
                  >
                    <p className="font-normal text-gray-600 mb-4">
                      {defaultContent}
                    </p>
                  </AccordionItem>
                  <AccordionItem
                    key="2"
                    aria-label="Bad for health nutrition"
                    title="Bad for health nutrition"
                  >
                    {defaultContent}
                  </AccordionItem>
                  <AccordionItem
                    key="3"
                    aria-label="Good for health nutrition"
                    title="Good for health nutrition"
                  >
                    {defaultContent}
                  </AccordionItem>
                </Accordion>
              </AccordionItem>
              <AccordionItem
                key="3"
                aria-label="Similar Recipes"
                title="Similar Recipes"
              >
                <div className="flex flex-col gap-4">
                  {similarRecipes.map((similarRecipe) => (
                    <div
                      className="max-w-[610px] p-0 m-0 rounded-2xl overflow-hidden border-1 border-gray-200 shadow-sm hover:shadow-md cursor-pointer bg-white"
                      key={similarRecipe.id}
                      onClick={() => {
                        onClose(); // Close the current modal
                        onRecipeClick(similarRecipe); // Open the new modal with the selected recipe
                      }}
                    >
                      <div className="p-0 m-0">
                        <div className="grid grid-cols-6 gap-1">
                          <img
                            alt={similarRecipe.title}
                            className="cover col-span-2"
                            src={similarRecipe.image}
                          />
                          <div className="flex flex-col justify-center col-span-4 p-3">
                            <div>
                              <h4 className="font-semibold">
                                {similarRecipe.title}
                              </h4>
                              <p className="text-gray-500">
                                Ready in {similarRecipe.readyInMinutes} mins
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionItem>
            </Accordion>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onPress={onClose}
              className="w-full font-semibold"
            >
              Get ingredients <MdNavigateNext className="text-xl font-bold" />
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};

export default RecipeModal;
