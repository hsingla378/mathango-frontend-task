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
  Chip,
  Spinner,
} from "@nextui-org/react";
import { MdNavigateNext } from "react-icons/md";
import { FaHeart, FaRegArrowAltCircleLeft } from "react-icons/fa";
import toast from "react-hot-toast";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useQuery } from "@tanstack/react-query";

const RecipeModal = ({
  similarRecipes,
  isOpen,
  onClose,
  onRecipeClick,
  recipeId,
}) => {
  const modalContentRef = useRef(null);
  const [isFavourite, setIsFavourite] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const modalSteps = [
    { step: 1, title: "Get ingredients" },
    { step: 2, title: "Get full recipe" },
    { step: 3, title: "Get similar recipe" },
    { step: 4, title: "" },
  ];

  const {
    isLoading,
    error,
    data: recipe,
    refetch,
  } = useQuery({
    queryKey: ["recipeDetails", recipeId],
    queryFn: () =>
      fetch(`https://api.spoonacular.com/recipes/${recipeId}/information`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      }).then((res) => res.json()),
    config: {
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  });

  useEffect(() => {
    refetch();
    setCurrentStep(1); // Reset the step whenever recipeId changes
  }, [recipeId, refetch]);

  useEffect(() => {
    if (isOpen && modalContentRef.current) {
      modalContentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isOpen, recipe]);

  useEffect(() => {
    if (recipe) {
      const favourite = JSON.parse(localStorage.getItem("favourite")) || [];
      const isFav = favourite.some((favRecipe) => favRecipe.id === recipe.id);
      setIsFavourite(isFav);
    }
  }, [recipe]);

  const handleFavouriteClick = () => {
    const favourite = JSON.parse(localStorage.getItem("favourite")) || [];
    if (isFavourite) {
      const updatedFavourite = favourite.filter(
        (favRecipe) => favRecipe.id !== recipe.id
      );
      toast.success("Removed from favourite");
      localStorage.setItem("favourite", JSON.stringify(updatedFavourite));
    } else {
      favourite.push(recipe);
      toast.success("Added to favourite. Kindly refresh the page to view it.");
      localStorage.setItem("favourite", JSON.stringify(favourite));
    }
    setIsFavourite(!isFavourite);
  };

  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  if (error) {
    toast.error("An error occurred while fetching recipe details");
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      scrollBehavior="inside"
      hideCloseButton
      size="sm"
    >
      <ModalContent>
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
              onPress={handleFavouriteClick}
            >
              {isFavourite ? (
                <GoHeartFill className="text-2xl text-blue-600" />
              ) : (
                <GoHeart className="text-2xl text-blue-600" />
              )}
            </Button>
          </div>
        </ModalHeader>
        <ModalBody className="p-0" ref={modalContentRef}>
          {isLoading ? (
            <div className="w-full h-full flex justify-center items-center my-16">
              <Spinner label="Loading..." color="primary" className="z-50" />
            </div>
          ) : (
            <>
              <div>
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
              </div>
              <Accordion
                className="px-4 pb-4"
                // showDivider={false}
                defaultExpandedKeys={["1", "2", "3"]}
              >
                {currentStep > 1 && (
                  <AccordionItem
                    key="1"
                    aria-label="Ingredients"
                    title="Ingredients"
                  >
                    <div className="flex flex-wrap gap-2">
                      {recipe?.extendedIngredients.map((ingredient) => {
                        return (
                          <Chip
                            key={ingredient.id}
                            size="md"
                            variant="bordered"
                          >
                            {ingredient.name}
                          </Chip>
                        );
                      })}
                    </div>
                  </AccordionItem>
                )}
                {currentStep > 2 && (
                  <AccordionItem
                    key="2"
                    aria-label="Full Recipe"
                    title="Full Recipe"
                  >
                    <h5 className="font-bold mb-4">Instructions</h5>
                    <p className="text-gray-600 text-sm">
                      {recipe?.instructions}
                    </p>
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
                        <p className="font-normal text-gray-600 mb-4">
                          {defaultContent}
                        </p>
                      </AccordionItem>
                      <AccordionItem
                        key="3"
                        aria-label="Good for health nutrition"
                        title="Good for health nutrition"
                      >
                        <p className="font-normal text-gray-600 mb-4">
                          {defaultContent}
                        </p>
                      </AccordionItem>
                    </Accordion>
                  </AccordionItem>
                )}
                {currentStep > 3 && (
                  <AccordionItem
                    key="3"
                    aria-label="Similar Recipes"
                    title="Similar Recipes"
                  >
                    <div className="flex flex-col gap-4">
                      {similarRecipes?.map((similarRecipe) => (
                        <div
                          className="p-0 m-0 rounded-2xl overflow-hidden border-1 border-gray-200 shadow-sm hover:shadow-md cursor-pointer bg-white h-[100px]"
                          key={similarRecipe.id}
                          onClick={() => {
                            onClose();
                            onRecipeClick(similarRecipe.id);
                          }}
                        >
                          <div className="p-0 m-0 h-full">
                            <div className="flex gap-1 h-full">
                              <div className="w-[35%] h-full">
                                <img
                                  alt={similarRecipe.title}
                                  className="cover col-span-2 h-full w-full"
                                  src={similarRecipe.image}
                                />
                              </div>
                              <div className="flex flex-col justify-center w-[65%] p-3 h-full">
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
                )}
              </Accordion>
            </>
          )}
        </ModalBody>
        {currentStep < 4 && (
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => setCurrentStep(currentStep + 1)}
              className="w-full font-semibold"
            >
              {
                modalSteps.filter(
                  (modalStep) => modalStep.step === currentStep
                )[0].title
              }
              <MdNavigateNext className="text-xl font-bold" />
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default RecipeModal;
