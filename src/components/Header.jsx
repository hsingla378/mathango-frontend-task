import { Button } from "@nextui-org/react";
import React from "react";
import { FaHeart } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import Favourite from "./Favourite";
import toast from "react-hot-toast";

export const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    toast.success("Logout successful");
    navigate("/login");
  };

  return (
    <div>
      <div className="flex justify-center  lg:justify-between flex-col md:flex-row items-center p-4 m-auto">
        <div className="text-center m-auto lg:m-0 lg:text-left ">
          <p className="text-2xl font-semibold">👋 Hey {"<user first name>"}</p>
          <p className="text-gray-500">Discover tasty and healthy recipes</p>
        </div>
        <div className="flex items-center gap-4 m-auto lg:m-0">
          <Favourite />
          <Search />
          {localStorage.getItem("isLoggedIn") === "true" && (
            <Button
              variant="solid"
              color="danger"
              size="sm"
              onClick={handleLogout}
              className="hidden lg:block"
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
