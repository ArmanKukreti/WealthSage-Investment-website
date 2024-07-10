import React, { useContext, useEffect, useState } from "react";
import SelectInvestmentOption from "./SelectInvestmentOption";
import SelectInvestmentAmount from "./SelectInvestmentAmount";
import axios from "axios";
import { UserContext } from "../context/userContext";
import toast, { Toaster } from "react-hot-toast";

const SelectInvestmentCategory = ({ selectedBasket, basketName, isVisible, onClose }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedInvestmentOption, setSelectedInvestmentOption] = useState(null);
  const [showAnotherComponent, setShowAnotherComponent] = useState(0);

  const [investmentAmount, setInvestmentAmount] = useState('');
  const [timePeriod, setTimePeriod] = useState('');

  const {currentUser} = useContext(UserContext)

  const options = [
    "Mutual Funds",
    "Exchange Traded Funds (ETFs)",
    "Gold Bonds"
  ];

  const handleNextClick = () => {
    if (showAnotherComponent < 2) {
      setShowAnotherComponent((prevValue) => prevValue + 1);
    }
  };

  const handleAddInvestment = async () => {
    // const newInvestment = {
    //   ...selectedInvestmentOption,
    //   selectedOption,
    //   investmentAmount,
    //   timePeriod
    // }

    const selectedInvestmentData = {
      selectedOption,
      investmentAmount,
      timePeriod,
      ...selectedInvestmentOption
    }


      try {
        console.log("ffffffffffffffffffffff0",selectedInvestmentData)

        if(selectedInvestmentData.selectedOption === 'Mutual Funds') {

          const postData = {
            "email": currentUser.user_email,
            "investment_name": selectedInvestmentData.NameMFs,
            "investment_category": selectedInvestmentData.selectedOption,
            "investment_code": selectedInvestmentData._id,
            "investment_amount": selectedInvestmentData.investmentAmount,
            "investment_cagr": selectedInvestmentData.CAGR,
            "time_period": parseInt(selectedInvestmentData.timePeriod),
          }

          const response = await axios.post(`http://127.0.0.1:5000/basket/${basketName}`, postData)

          console.log(response)

          if(response.status === 200) {
            toast.success("Investment stored successfully", {
              position: "top-center",
              style: { marginTop: "60px" },
            })
          }

        } else if (selectedInvestmentData.selectedOption === 'Exchange Traded Funds (ETFs)'){

          const postData = {
            "email": currentUser.user_email,
            "investment_name": selectedInvestmentData.SYMBOL,
            "investment_category": selectedInvestmentData.selectedOption,
            "investment_code": selectedInvestmentData._id,
            "investment_amount": selectedInvestmentData.investmentAmount,
            "investment_cagr": selectedInvestmentData['365 D % CHNG'],
            "time_period": selectedInvestmentData.timePeriod,
          }

          console.log("Hi ETFs", postData)
          const response = await axios.post(`http://127.0.0.1:5000/basket/${basketName}`, postData)

          console.log(response)

          if(response.status === 200) {
            toast.success("Investment stored successfully", {
              position: "top-center",
              style: { marginTop: "60px" },
            })
          }

        }
        

      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error, {
          position: "top-center",
          style: { marginTop: "60px" },
        });
        
      } else {
        toast.error(
          "An error occurred while creating Investment. Please try again later.",
          {
            position: "top-center",
            style: { marginTop: "40px" },
          }
        );
      }
    }
      
  
    // console.log("newInvestment", newInvestment)
    // setInvestmentDetails((prevDetails) => [...prevDetails, newInvestment]);
    // closeModal();

  }

  const closeModal = () => {
    onClose();
    setShowAnotherComponent(0);
    setSelectedOption(null)
    setSelectedInvestmentOption(null)
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg border w-full max-w-md md:max-w-lg lg:max-w-xl">
        <h2 className="text-xl font-bold mb-4">
          {showAnotherComponent === 0
            ? "Add an Investment Category to the Basket"
            : showAnotherComponent === 1
            ? "Select one of the Investment Options from your chosen category"
            : showAnotherComponent === 2
            ? "Add Investment Amount and Duration for your chosen Option"
            : ""}
        </h2>
        <p className="mb-4">
          Simulate returns on various investment options like mutual funds,
          ETFs, gold bonds, etc.
        </p>

        {showAnotherComponent === 2 ? (
          <SelectInvestmentAmount investmentAmount={investmentAmount} timePeriod={timePeriod} setInvestmentAmount={setInvestmentAmount} setTimePeriod={setTimePeriod} category={selectedOption} selectedInvestmentOption={selectedInvestmentOption} />
        ) : showAnotherComponent === 1 ? (
          <SelectInvestmentOption category={selectedOption} selectedInvestmentOption={selectedInvestmentOption} setSelectedInvestmentOption={setSelectedInvestmentOption} onClose={onClose} />
        ) : (
          <div className="space-y-2">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedOption(option)}
                className={`w-full p-3 rounded-lg text-left ${
                  selectedOption === option
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        <div className="flex justify-center gap-10 mt-6">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
            onClick={closeModal}
          >
            CANCEL
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
            onClick={showAnotherComponent === 2 ? handleAddInvestment : handleNextClick}
            disabled={showAnotherComponent === 0 && selectedOption === null || showAnotherComponent === 1 && selectedInvestmentOption === null}
          >
            {showAnotherComponent === 2 ? "Add" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectInvestmentCategory;
