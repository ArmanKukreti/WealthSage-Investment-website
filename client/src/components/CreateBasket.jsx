import React, { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../context/userContext";
import axios from "axios";

const CreateBasket = ({ isVisible, onClose }) => {
  const [basketName, setBasketName] = useState("");

  const { currentUser } = useContext(UserContext);

  const changeInputHandler = (e) => {
    setBasketName(e.target.value);
  };

  const postData = {
    email: currentUser.user_email,
    basket_name: basketName,
  };

  const createBasket = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://127.0.0.1:5000/create_basket`,
        postData
      );

      if (response.status === 201) {
        toast.success("Basket created successfully", {
          position: "top-center",
          style: { marginTop: "60px" },
        });

        setTimeout(() => {
          onClose();
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error, {
          position: "top-center",
          style: { marginTop: "60px" },
        });
      } else {
        toast.error(
          "An error occurred while creating Basket. Please try again later.",
          {
            position: "top-center",
            style: { marginTop: "40px" },
          }
        );
      }
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <Toaster />
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center p-4">
        <div className="relative bg-white w-full max-w-lg h-auto rounded-2xl p-6 shadow-md">
          <b className="block text-xl md:text-2xl lg:text-4xl mb-4">
            Create an Investment Basket
          </b>
          <div className="text-md md:text-lg mb-8">
            Simulate returns on various investment options like mutual funds,
            ETFs, gold bonds, etc.
          </div>
          <div className="w-full mb-4 rounded-md flex flex-col items-start justify-center gap-2">
            <span className="text-md">Basket Name</span>
            <input
              type="text"
              name="basket"
              value={basketName}
              onChange={changeInputHandler}
              className="block w-full rounded-md p-3 text-sm bg-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter basket name"
              autoFocus
            />
          </div>
          <div className="flex gap-4 justify-center">
            <button
              className="rounded-full text-white font-bold text-lg px-6 py-2 mt-5 bg-red-500"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="rounded-full text-white font-bold text-lg px-6 py-2 mt-5 bg-emerald-500"
              onClick={createBasket}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateBasket;
