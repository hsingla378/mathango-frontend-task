import { Button } from "@nextui-org/react";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    toast.success("Login successful");
    navigate("/");
  };

  return (
    <div className="bg-[url(assets/Login_Background_Image.png)] bg-no-repeat bg-cover bg-center h-screen w-screen sm:grid grid-cols-2 text-white place-items-center backdrop-blur-md flex items-end sm:items-center p-4 sm:p-0">
      <div className="w-full md:h-full sm:flex justify-center items-center sm:bg-[rgba(0,0,0,0.4)]">
        <div className="flex flex-col gap-3 sm:w-fit w-full">
          <span className="text-6xl italic">
            <p>Welcome to</p>
            <p className="text-3xl">
              <b>Rec</b>ii<b>p</b>ii<b>e</b>
            </p>
          </span>
          <p className="text-gray-300">Please sign in to continue</p>
          <Button
            color="primary"
            variant="solid"
            size="lg"
            startContent={<FaGoogle />}
            className="font-semibold"
            onClick={handleLogin}
          >
            Continue with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
