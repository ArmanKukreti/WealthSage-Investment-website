import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SelectInvestmentOption = ({ category, selectedInvestmentOption, setSelectedInvestmentOption }) => {
  const [investmentOptions, setInvestmentOptions] = useState([]);

  useEffect(() => {
    const fetchInvestmentOptions = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/${
            category === "Mutual Funds"
              ? "get_mf_dash"
              : category === "Gold Bonds"
              ? "get_gold_bonds_dash"
              : category === "Exchange Traded Funds (ETFs)"
              ? "get_etf_dash"
              : ""
          } `
        );

        // console.log(response)

        const data = response.data[
            category === "Mutual Funds"
              ? "mfs"
              : category === "Gold Bonds"
              ? "gbs"
              : category === "Exchange Traded Funds (ETFs)"
              ? "etfs"
              : ""
          ];

        setInvestmentOptions(data);
        console.log(data);
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
            "An error occurred while fetching investment options. Please try again later.",
            {
              position: "top-center",
              style: { marginTop: "40px" },
            }
          );
        }
      }
    };

    fetchInvestmentOptions();
  }, [category]);

  const handleSelect = (option) => {
    setSelectedInvestmentOption(option);
    console.log(option);
  };

  return (
    <div className="h-80 w-full overflow-auto p-8">
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 mb-4 min-w-[800px]">
          <thead>
            {category === "Mutual Funds" ? (
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Sr no</th>
                <th className="border border-gray-300 p-2">
                  Name of the investment option
                </th>
                <th className="border border-gray-300 p-2">AUM</th>
                <th className="border border-gray-300 p-2">CAGR</th>
                <th className="border border-gray-300 p-2">Expense Ratio</th>
                <th className="border border-gray-300 p-2">Plan</th>
                <th className="border border-gray-300 p-2">Sub Category</th>
              </tr>
            ) : category === "Gold Bonds" ? (
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Sr no</th>
                <th className="border border-gray-300 p-2">Symbol</th>
                <th className="border border-gray-300 p-2">Issue Price</th>
                <th className="border border-gray-300 p-2">
                  Last Traded Price
                </th>
                <th className="border border-gray-300 p-2">Volume</th>
                <th className="border border-gray-300 p-2">
                  Value (Rs. Crore)
                </th>
                <th className="border border-gray-300 p-2">Annual Rate</th>
              </tr>
            ) : category === "Exchange Traded Funds (ETFs)" ? (
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Sr no</th>
                <th className="border border-gray-300 p-2">Symbol</th>
                <th className="border border-gray-300 p-2">Price</th>
                <th className="border border-gray-300 p-2">Underlying Asset</th>
                <th className="border border-gray-300 p-2">Volume</th>
                <th className="border border-gray-300 p-2">
                  Value (Rs. Crore)
                </th>
                <th className="border border-gray-300 p-2">Net Assets Value</th>
                <th className="border border-gray-300 p-2">Annual Rate</th>
              </tr>
            ) : (
              ""
            )}
          </thead>
          <tbody>
            {investmentOptions && investmentOptions.length > 0 ? (
              investmentOptions.map((option, index) =>
                category === "Mutual Funds" ? (
                  <tr
                    key={option._id}
                    onClick={() => handleSelect(option)}
                    className={`cursor-pointer ${
                      selectedInvestmentOption &&
                      selectedInvestmentOption._id === option._id
                        ? "bg-blue-500 text-white"
                        : "bg-white"
                    }`}
                  >
                    <td className="border border-gray-300 p-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {option.NameMFs}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {option.AUM}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {option.CAGR}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {option["Expense Ratio"]}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {option.Plan}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {option["Sub Category"]}
                    </td>
                  </tr>
                ) : category === "Gold Bonds" ? (
                  <tr
                    key={option._id}
                    onClick={() => handleSelect(option)}
                    className={`cursor-pointer ${
                      selectedInvestmentOption &&
                      selectedInvestmentOption._id === option._id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    <td className="border border-gray-300 p-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {option.SYMBOL}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {option["ISSUE PRICE"]}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {option.LTP}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {option.VOLUME}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {option["VALUE (₹ Crores)"]}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {option["365 D % CHNG"]}
                    </td>
                  </tr>
                ) : category === "Exchange Traded Funds (ETFs)" ? (
                  <tr
                    key={option._id}
                    onClick={() => handleSelect(option)}
                    className={`cursor-pointer ${
                      selectedInvestmentOption &&
                      selectedInvestmentOption._id === option._id
                        ? "bg-blue-500 text-white"
                        : "bg-white"
                    }`}
                  >
                    <td className="border border-gray-300 p-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {option.SYMBOL}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {option.LTP}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {option["UNDERLYING ASSET"]}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {option.VOLUME}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {option["VALUE (₹ Crores)"]}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {option.NAV}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {option["365 D % CHNG"]}
                    </td>
                  </tr>
                ) : ""
              )
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="border border-gray-300 p-2 text-center"
                >
                  No investment options available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SelectInvestmentOption;
