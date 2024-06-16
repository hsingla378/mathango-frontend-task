import { Button, Input } from "@nextui-org/react";
import React from "react";
import { FaHeart } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import Search from "./Search";

export const Header = () => {
  return (
    <div className="bg-white">
      <div className="flex justify-center sm:justify-between flex-col sm:flex-row items-center p-4 max-w-[90%] m-auto">
        <div>
          <p className="text-2xl">👋 Hey {"<user first name>"}</p>
          <p className="text-gray-500">Discover tasty and healthy receipt</p>
        </div>
        <div className="flex gap-4">
          {" "}
          <Button
            color=""
            variant="bordered"
            className="text-gray-800 w-44"
            startContent={<FaHeart className="text-xl" />}
          >
            Favourite
          </Button>
          <Search />
        </div>
      </div>
    </div>
  );
};
