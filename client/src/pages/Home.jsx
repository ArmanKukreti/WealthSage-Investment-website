import { useContext, useEffect, useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import "./Home.css";
import ETFS from "../components/etfs/ETFS"; // Correct import path
import MutualFunds from "../components/mfs/mfs";
import GoldBonds from "../components/gold_bonds/gold_bonds";
import { SlArrowDown } from "react-icons/sl";
import { UserContext } from "../context/userContext";
import toast from "react-hot-toast";

function Home() {
  const { currentUser } = useContext(UserContext);
  const [investmentData, setInvestmentData] = useState([]); // State to store investment data

  useEffect(() => {
    const getRecommendationData = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/get_recommendations",
          {
            email: currentUser.user_email,
          }
        );

        setInvestmentData(response.data);
        console.log(investmentData)
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
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

    getRecommendationData();
  }, [currentUser.user_email]); // Dependency array to rerun effect when email changes

  // Render based on investmentData state
//   const mutual_funds = investmentData?.mfs || [];
//   const etfs = investmentData?.etfs || [];
//   const gold_bonds = investmentData?.gold_bonds || [];

  return (
    <>
      <div className="title-main-div">
        <a href="" className="title-main">
          Here are some optimal investment options based on your financial preferences
        </a>
      </div>
      <main>
        <Dropdown title="Mutual Funds">
          <MutualFunds />
        </Dropdown>
        <Dropdown title="ETFs">
          <ETFS />
        </Dropdown>
        <Dropdown title="Gold Bonds">
          <GoldBonds />
        </Dropdown>
      </main>
    </>
  );
}

function Dropdown({ title, children }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-title" onClick={toggleDropdown}>
        <a className="title-dropdown">{title}</a>
        <SlArrowDown />
      </button>
      {isOpen && <div className="dropdown-content">{children}</div>}
    </div>
  );
}

export default Home;
