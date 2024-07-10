import React, { useContext, useEffect, useState } from 'react';
import CreateBasket from './CreateBasket';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const LeftSidebar = ({ setInvestmentData, setBaskets, setBasketName, selectedBasket, setSelectedBasket, baskets }) => {
  const [showModal, setShowModal] = useState(false);

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getBaskets = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:5000/my-baskets', {
          email: currentUser.user_email,
        });

        setBaskets(response.data.baskets); 

      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          toast.error(error.response.data.error, {
            position: 'top-center',
            style: { marginTop: '60px' },
          });
        } else {
          toast.error(
            'An error occurred while fetching your Baskets. Please try again later.',
            {
              position: 'top-center',
              style: { marginTop: '40px' },
            }
          );
        }
      }
    };

    if (currentUser) {
      getBaskets();
    }
  }, [currentUser]);

  const handleBasketClick = async (index, basketname) => {
    setSelectedBasket(index);
    setBasketName(basketname)

    try {
      const response = await axios.post(
        `http://127.0.0.1:5000/${basketname}/get-investments`, {
          email: currentUser.user_email,
        }
      );

      const data = response.data;
      setInvestmentData(data);

    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error, {
          position: "top-center",
          style: { marginTop: "60px" },
        });
      } else {
        toast.error(
          "An error occurred while fetching investments. Please try again later.",
          {
            position: "top-center",
            style: { marginTop: "40px" },
          }
        );
      }
    }
  };

  return (
    <div className='h-[91.2vh] w-full md:w-80 border-[3px] border-t-0 border-b-0 flex flex-col items-center justify-start'>
      <Toaster />
      <div className='flex flex-col items-center fixed top-24'>
        <h1 className='text-2xl md:text-4xl mt-4 md:mt-8'>Simulator</h1>
        <div className='mt-4 w-full flex flex-col gap-2'>
          <button className='font-bold hover:bg-gray-700 bg-gray-500 w-full rounded-full text-white px-4 py-2'>
            <Link to={`/home`}>Home</Link>
          </button>
          <button
            className='font-bold hover:bg-emerald-700 bg-emerald-500 w-full rounded-full text-white px-4 py-2'
            onClick={() => setShowModal(true)}
          >
            + Add Basket
          </button>
        </div>
        <div className='mt-4 w-full flex flex-col gap-2'>
          {baskets.length > 0 ? (
            baskets.map((basket, index) => (
              <div key={index}>
                <button
                  className={`font-bold w-full rounded-full text-white py-2 ${
                    selectedBasket === index ? 'bg-blue-500' : 'bg-gray-500 hover:bg-gray-700'
                  }`}
                  onClick={() => handleBasketClick(index, basket)}
                >
                  {basket}
                </button>
              </div>
            ))
          ) : (
            <p className='text-gray-500'>No baskets found.</p>
          )}
        </div>
      </div>

      <CreateBasket isVisible={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default LeftSidebar;
