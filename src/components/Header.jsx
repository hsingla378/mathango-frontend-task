import { Button, Input } from "@nextui-org/react";
import React from "react";
import { FaHeart } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

export const Header = () => {
  return (
    <div className="flex justify-center sm:justify-between flex-col sm:flex-row items-center p-4">
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
        <Input
          isClearable
          radius="lg"
          placeholder="Search any recipe"
          variant="bordered"
          startContent={<IoSearch className="text-black" />}
        />
      </div>
    </div>
  );
};
