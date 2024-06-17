import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { GoHeart, GoHeartFill, GoHome } from "react-icons/go";
import { GoHomeFill } from "react-icons/go";
import { MdDeleteOutline, MdOutlineFastfood } from "react-icons/md";

const Footer = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [favouriteRecipes, setFavouriteRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedFavourite = JSON.parse(localStorage.getItem("favourite")) || [];
    setFavouriteRecipes(storedFavourite);
  }, []);

  const handleCardClick = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleRemoveFavourite = (recipeId) => {
    const updatedFavourites = favouriteRecipes.filter(
      (recipe) => recipe.id !== recipeId
    );
    setFavouriteRecipes(updatedFavourites);
    toast.success("Removed from favourite");
    localStorage.setItem("favourite", JSON.stringify(updatedFavourites));
  };

  return (
    <div className="lg:hidden fixed bottom-0 bg-white flex justify-around w-full place-items-center border-t-2 shadow-lg">
      <Button className=" py-5 w-full h-full bg-transparent flex flex-col gap-2 items-center">
        {isOpen ? (
          <>
            <GoHome className="text-2xl" />
            <span className="text-tiny">Home</span>
          </>
        ) : (
          <>
            <GoHomeFill className="text-2xl text-blue-600" />
            <span className="text-blue-600">Home</span>
          </>
        )}
      </Button>

      <Button
        onPress={onOpen}
        className="py-5 w-full h-full bg-transparent flex flex-col items-center m-auto p-0"
      >
        {isOpen ? (
          <>
            <GoHeartFill className="text-2xl text-blue-600" />
            <span className="text-tiny text-blue-600">Favourite</span>
          </>
        ) : (
          <>
            <GoHeart className="text-2xl" />
            <span className="text-tiny">Favourite</span>
          </>
        )}
      </Button>

      <>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Modal Title
                </ModalHeader>
                <ModalBody>
                  {favouriteRecipes.length > 0 ? (
                    favouriteRecipes.map((recipe) => (
                      <div
                        key={recipe.id}
                        className="cursor-pointer bg-white p-3 rounded-lg max-w-100px flex gap-2 items-center shadow-2xl justify-between"
                      >
                        <div
                          className="flex items-center gap-2"
                          onClick={() => handleCardClick(recipe)}
                        >
                          <MdOutlineFastfood className="font-bold" />
                          <p>{recipe.title}</p>
                        </div>
                        <Button
                          isIconOnly
                          color="error"
                          onClick={() => handleRemoveFavourite(recipe.id)}
                          aria-label="Remove from favourite"
                        >
                          <MdDeleteOutline className="text-red-600 text-lg" />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <>
                      {/* <p className="bg-white p-3 rounded-lg max-w-100px flex gap-1 items-center shadow-2xl"> */}
                      <span>No favourite recipes found. 😢</span>
                      {/* </p> */}
                    </>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  {/* <Button color="primary" onPress={onClose}>
                    Action
                  </Button> */}
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};

export default Footer;
