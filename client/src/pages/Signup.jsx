import React, { useState } from "react";
import { Navbar } from "../components";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Signup = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [currentStep, setCurrentStep] = useState(1);

  const [sums, setSums] = useState(0);

  const navigate = useNavigate();

  const [selectedOptions, setSelectedOptions] = useState({
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    answer5: "",
    answer6: "",
    answer7: "",
    answer8: "",
    answer9: "",
    answer10: "",
    answer11: "",
  });

  const questions = [
    {
      step: 2,
      question: "What is your current age?",
      options: ["Less than 30", "31 to 35", "36 to 45", "Older than 45"],
      points: [5, 4, 3, 1],
    },
    {
      step: 3,
      question: "How many sources of income do you currently have?",
      options: [
        "None (relying solely on investments)",
        "1 source (e.g., salary, business income)",
        "2 sources",
        "3 sources",
        "4 or more sources",
      ],
      points: [1, 2, 3, 4, 5],
    },
    {
      step: 4,
      question: "How much do you earn annually from all sources of income?",
      options: [
        "Under ₹5,00,000",
        "₹5,00,001 - ₹10,00,000",
        "₹10,00,001 - ₹20,00,000",
        "₹20,00,001 - ₹40,00,000",
        "Over ₹40,00,000",
      ],
      points: [1, 2, 3, 4, 5],
    },
    {
      step: 5,
      question: "How many people are financially dependent on you?",
      options: ["None", "1-2 people", "3-4 people", "5 or more people"],
      points: [5, 4, 3, 1],
    },
    {
      step: 6,
      question: "What is your main goal for these investments?",
      options: [
        "Preservation of capital",
        "Conservative income generation",
        "Balanced growth and income",
        "Aggressive growth",
      ],
      points: [1, 2, 3, 5],
    },
    {
      step: 7,
      question:
        "What is your expected timeframe for needing returns on these investments?",
      options: [
        "Less than 1 year",
        "1-4 years",
        "5-10 years",
        "11-20 years",
        "Over 20 years",
      ],
      points: [5, 4, 3, 2, 1],
    },
    {
      step: 8,
      question: "What is your current net worth (excluding primary residence)?",
      options: [
        "Under ₹15,00,000",
        "₹15,00,000 - ₹50,00,000",
        "₹50,00,000 - ₹1 crore",
        "₹1 crore - ₹25 crore",
        "Over ₹25 crore",
      ],
      points: [1, 2, 3, 4, 5],
    },
    {
      step: 9,
      question:
        "How comfortable are you with complex investments like stocks or bonds?",
      options: ["Not comfortable", "Somewhat comfortable", "Very comfortable"],
      points: [1, 2, 3],
    },
    {
      step: 10,
      question:
        "What level of risk are you willing to tolerate with your investments?",
      options: [
        "Conservative (preserve capital)",
        "Moderate (balanced growth with some risk)",
        "Aggressive (seek high growth, willing to accept high risk)",
      ],
      points: [1, 3, 5],
    },
    {
      step: 11,
      question:
        "Suppose the stock market performs poorly over the next decade, what would you expect from your investments?",
      options: [
        "Lose money",
        "Minimal or no returns",
        "Modest gains",
        "Stability with small profits",
      ],
      points: [1, 2, 3, 5],
    },
    {
      step: 12,
      question:
        "How do you feel about short-term volatility in your investments?",
      options: [
        "I actively seek out investment opportunities during volatility",
        "I don't mind short-term losses",
        "I can tolerate small losses",
        "I need to see at least some return",
      ],
      points: [5, 4, 2, 1],
    },
  ];

  const filteredQuestion = questions.filter(
    (question) => question.step === currentStep
  );

  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleOptionChange = (e, questionIndex, optionIndex) => {
    const { name, value } = e.target;
    const newSelectedOptions = { ...selectedOptions, [name]: value };
    setSelectedOptions(newSelectedOptions);

    const question = questions.find((q) => q.step === currentStep);
    const optionPoints = question.points[optionIndex];

    const newSums = Object.keys(newSelectedOptions).reduce((acc, key) => {
      const stepIndex = parseInt(key.replace("answer", ""), 10);
      if (stepIndex > 0 && stepIndex <= questions.length) {
        const optionValue = newSelectedOptions[key];
        const question = questions[stepIndex - 1];
        const optionIndex = question.options.indexOf(optionValue);
        if (optionIndex >= 0) {
          return acc + question.points[optionIndex];
        }
      }
      return acc;
    }, 0);

    setSums(newSums);
  };

  const nextStepHandler = (e) => {
    e.preventDefault();
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const previousStepHandler = (e) => {
    e.preventDefault();
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const classification = {
      "risk-appetite": ''
    }

    if(sums < 25) {
      classification["risk-appetite"] = "Conservative"
    } else if (sums > 45){
      classification["risk-appetite"] = "Aggressive"
    } else {
      classification["risk-appetite"] = "Moderate"
    }

    const postData = {
      ...userData,
      ...selectedOptions,
      ...classification,
    };

    console.log(postData)
    try {
      const response = await axios.post(
        `http://127.0.0.1:5000/register`,
        postData
      );

      if (response.status === 201) {
        toast.success("User registered successfully", {
          position: "top-center",
          style: { marginTop: "60px" },
        });

        setTimeout(() => {
          navigate("/login");
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
          "An error occurred while creating account. Please try again later.",
          {
            position: "top-center",
            style: { marginTop: "40px" },
          }
        );
      }
    }
  };

  console.log(sums);

  return (
    <div className="min-h-screen gradient-bg-welcome">
      <Navbar />
      <Toaster />
      <div className="md:h-[90vh] flex flex-col lg:flex-row justify-center items-center gap-10 px-4 lg:px-0 py-8 lg:py-0">
        <div className="white-glassmorphism p-6 text-white w-full lg:w-auto mb-8 lg:mb-0">
          <ul className="flex flex-col justify-center items-center gap-6 lg:gap-8">
            <li
              className={`flex justify-center items-center gap-8 ${
                currentStep === 1 ? "text-blue-500" : "text-white"
              }`}
            >
              <span className="rounded-full text-black font-bold bg-white border-2 px-3 py-2">
                1
              </span>
              Account Details
            </li>
            <li
              className={`flex flex-col items-center gap-2 ${
                currentStep > 1 && currentStep <= 5
                  ? "text-blue-500"
                  : "text-white"
              }`}
            >
              <div className="flex items-center gap-8">
                <span className="rounded-full text-black font-bold bg-white border-2 px-3 py-2">
                  2
                </span>
                Questionnaire
              </div>
              <ul className="flex flex-col w-full justify-center items-end gap-2 lg:gap-4">
                {questions.map((_, index) => (
                  <li
                    key={index}
                    className={`flex justify-center items-center gap-8 ${
                      currentStep === index + 2 ? "text-blue-500" : "text-white"
                    }`}
                  >
                    Question-{index < 9 ? 0 : ""}
                    {index + 1}
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>

        <div className="white-glassmorphism p-6 text-white w-full lg:w-[65%]">
          <form className="flex flex-col justify-center gap-8 w-full">
            {currentStep === 1 && (
              <>
                <div className="flex flex-col justify-center items-start gap-4 w-full">
                  <label
                    htmlFor="name"
                    className="text-gray-300 text-sm md:text-base"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={userData.name}
                    onChange={changeInputHandler}
                    placeholder="Enter Your Name"
                    className="bg-transparent border-2 border-gray-400 text-white text-sm md:text-base rounded-sm p-2 w-full"
                  />
                </div>

                <div className="flex flex-col justify-center items-start gap-4 w-full">
                  <label
                    htmlFor="email"
                    className="text-gray-300 text-sm md:text-base"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userData.email}
                    onChange={changeInputHandler}
                    placeholder="Enter Your Email"
                    className="bg-transparent border-2 border-gray-400 text-white text-sm md:text-base rounded-sm p-2 w-full"
                  />
                </div>

                <div className="flex flex-col justify-center items-start gap-4 w-full">
                  <label
                    htmlFor="password"
                    className="text-gray-300 text-sm md:text-base"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={userData.password}
                    onChange={changeInputHandler}
                    placeholder="Enter Your Password"
                    className="bg-transparent border-2 border-gray-400 text-white text-sm md:text-base rounded-sm p-2 w-full"
                  />
                </div>

                <div className="flex flex-col justify-center items-start gap-4 w-full">
                  <label
                    htmlFor="confirmPassword"
                    className="text-gray-300 text-sm md:text-base"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={userData.confirmPassword}
                    onChange={changeInputHandler}
                    placeholder="Confirm Your Password"
                    className="bg-transparent border-2 border-gray-400 text-white text-sm md:text-base rounded-sm p-2 w-full"
                  />
                </div>
              </>
            )}

            {filteredQuestion.length > 0 && (
              <>
                <h2 className="text-lg lg:text-xl">
                  {filteredQuestion[0].question}
                </h2>
                <ul className="flex flex-col gap-4">
                  {filteredQuestion[0].options.map((option, index) => (
                    <li key={index} className="flex items-center gap-4">
                      <input
                        type="radio"
                        id={`option${index}`}
                        name={`answer${currentStep - 1}`}
                        value={option}
                        checked={
                          selectedOptions[`answer${currentStep - 1}`] === option
                        }
                        onChange={(e) =>
                          handleOptionChange(e, currentStep - 2, index)
                        }
                        className="bg-transparent border-2 border-gray-400 text-white text-sm md:text-base rounded-sm p-2"
                      />
                      <label
                        htmlFor={`option${index}`}
                        className="text-gray-300 text-sm md:text-base"
                      >
                        {option}
                      </label>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {currentStep === 13 && (
              <div className="flex flex-col justify-center items-start gap-4 w-full">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-blue-500 text-white text-sm md:text-base rounded-sm p-2 w-full"
                >
                  Submit
                </button>
              </div>
            )}

            <div className="flex justify-start gap-3 w-full">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={previousStepHandler}
                  className="bg-gray-500 text-white text-sm md:text-base rounded-sm p-2"
                >
                  Previous
                </button>
              )}
              {currentStep < 13 && (
                <button
                  type="button"
                  onClick={nextStepHandler}
                  className="bg-blue-500 px-4 text-white text-sm md:text-base rounded-sm p-2"
                >
                  Next
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
