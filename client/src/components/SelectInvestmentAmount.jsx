import React, { useState } from 'react';

const SelectInvestmentAmount = ({ investmentAmount, timePeriod, setTimePeriod, setInvestmentAmount, category, selectedInvestmentOption }) => {



  return (
    <div className="mt-8 bg-white p-6 rounded-lg w-full">
      <div className="overflow-x-auto">
        <table className="w-full mb-4">
        <thead>
            {category === "Mutual Funds" ? (
              <tr className="bg-gray-200">
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
                {category === "Mutual Funds" ? (
                    <tr>
                        <td className="text-left px-2 py-1">{selectedInvestmentOption.NameMFs}</td>
                        <td className="text-left px-2 py-1">{selectedInvestmentOption.AUM}</td>
                        <td className="text-left px-2 py-1">{selectedInvestmentOption.CAGR}</td>
                        <td className="text-left px-2 py-1">{selectedInvestmentOption["Expense Ratio"]}</td>
                        <td className="text-left px-2 py-1">{selectedInvestmentOption.Plan}</td>
                        <td className="text-left px-2 py-1">{selectedInvestmentOption["Sub Category"]}</td>
                    </tr>
                ) : category === "Exchange Traded Funds (ETFs)" ? (
                    <tr>
                        <td className="text-left px-2 py-1">{selectedInvestmentOption.SYMBOL}</td>
                        <td className="text-left px-2 py-1">{selectedInvestmentOption.LTP}</td>
                        <td className="text-left px-2 py-1">{selectedInvestmentOption["UNDERLYING ASSET"]}</td>
                        <td className="text-left px-2 py-1">{selectedInvestmentOption.VOLUME}</td>
                        <td className="text-left px-2 py-1">{selectedInvestmentOption["VALUE (₹ Crores)"]}</td>
                        <td className="text-left px-2 py-1">{selectedInvestmentOption.NAV}</td>
                        <td className="text-left px-2 py-1">{selectedInvestmentOption["365 D % CHNG"]}</td>
                    </tr>
                ) : category === "Gold Bonds" ? (
                    <tr>
                        <td className="text-left px-2 py-1">{selectedInvestmentOption.SYMBOL}</td>
                        <td className="text-left px-2 py-1">{selectedInvestmentOption["ISSUE PRICE"]}</td>
                        <td className="text-left px-2 py-1">{selectedInvestmentOption.LTP}</td>
                        <td className="text-left px-2 py-1">{selectedInvestmentOption.VOLUME}</td>
                        <td className="text-left px-2 py-1">{selectedInvestmentOption["VALUE (₹ Crores)"]}</td>
                        <td className="text-left px-2 py-1">{selectedInvestmentOption["365 D % CHNG"]}</td>
                    </tr>

                ) : ""}

          </tbody>
        </table>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Investment Amount:</label>
        <input
          type="number"
          value={investmentAmount}
          onChange={(e) => setInvestmentAmount(e.target.value)}
          className="w-full p-2 border rounded mt-1"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Time Period:</label>
        <select
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
          className="w-full p-2 border rounded mt-1"
        >
          <option value="" disabled>Select Time Period</option>
          <option value="1">1 Year</option>
          <option value="3">3 Years</option>
          <option value="5">5 Years</option>
          <option value="10">10 Years</option>
        </select>
      </div>
    </div>
  );
};

export default SelectInvestmentAmount;
