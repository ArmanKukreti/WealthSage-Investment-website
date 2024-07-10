import React, { useState, useEffect, useContext } from "react";
import CreateBasket from "./CreateBasket";
import SelectInvestmentCategory from "./SelectInvestmentCategory";
import axios from "axios";
import { UserContext } from "../context/userContext";
import PieChartComponent from "./Pie_Chart";
import ChartComponent from "./Line_Graph";
import CategoryResults from "./CategoryResults";
import GroupedBarChartComponent from "./Group_Bar";
import YearlyChartComponent from "./Bar_Graph.jsx";

const Investment = ({ investmentData, baskets, basketName, selectedBasket }) => {

  const [showCreateBasket, setShowCreateBasket] = useState(false);
  const [showSelectInvestmentCategory, setShowSelectInvestmentCategory] = useState(false);
  const [investmentDetails, setInvestmentDetails] = useState([]);

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    if (selectedBasket !== null) {
      // Fetch or update investment details when a basket is selected
      // Here we use the investmentData prop or an API call to fetch the investment details
      setInvestmentDetails(investmentData);
    }
  }, [selectedBasket, investmentData]);

  useEffect(() => {
    const getInvestmentData = async () => {
      try {
        const response = await axios.post(
          `http://127.0.0.1:5000/${basketName}/get-investments`,
          {
            email: currentUser.user_email,
          }
        );

        const data = response.data;

        // console.log(data)

        setInvestmentDetails(data);
        
      } catch (error) {
        toast.error(
          "An error occurred while getting investments. Please try again later.",
          {
            position: "top-center",
            style: { marginTop: "40px" },
          }
        );
      }
    };

    getInvestmentData();
  }, [investmentDetails]);

  // const investmentDetails[0] = [
  //   {
  //     investment_amount: 636,
  //     investment_category: "Mutual Funds",
  //     investment_code: "hdh",
  //     investment_name: "jhs",
  //     annual_returns: 15,
  //     time_period: 5,
  //   },
  //   {
  //     investment_amount: 636,
  //     investment_category: "Mutual Funds",
  //     investment_code: "hdh",
  //     investment_name: "jhs",
  //     annual_returns: 15,
  //     time_period: 4,
  //   },
  //   {
  //     investment_amount: 636,
  //     investment_category: "Gold Bonds",
  //     investment_code: "hdh",
  //     investment_name: "jhs",
  //     annual_returns: 20,
  //     time_period: 3,
  //   },
  // ];

  function max_duration(data) {
    var max_durationx = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i]["time_period"] > max_durationx) {
        max_durationx = data[i]["time_period"];
        // console.log(max_durationx);
      }
    }
    return max_durationx;
  }

  function create_2d_arrays(data) {
    var final_array = [];
    const max_durationy = max_duration(data);
    // console.log(max_durationy)

    for (let i = 0; i < data.length; i++) {
      var x = [data[i]["investment_amount"]];
      for (let j = 0; j < max_durationy; j++) {
        // console.log(j);
        if (data[i]["time_period"] >= j + 1) {
          // for (let i=0, i<)
          // console.log('hello');
          const last_amount = x[j];
          const interest = data[i]["annual_returns"];
          x.push(last_amount * (1 + interest / 100));
        } else {
          // console.log('hello1');
          const last_amount = x[j];
          const interest = 0;
          x.push(last_amount * (1 + interest / 100));
        }
      }
      final_array.push(x);
    }
    return final_array;
  }

  function get_line_array(array_2d) {
    var lengthx = array_2d[0];
    var lengthy = array_2d.length;
    var lengthx = lengthx.length;
    var x = [];
    for (let i = 0; i < lengthx; i++) {
      x.push(0);
    }
    for (let i = 0; i < lengthx; i++) {
      var y = 0;
      for (let j = 0; j < lengthy; j++) {
        y = y + array_2d[j][i];
      }
      x[i] = y;
    }
    var year_list = [];
    for (let i = 0; i < lengthx; i++) {
      year_list.push("year" + i.toString());
    }
    return [x, year_list];
  }

  function get_group_bar(array_2d, dataz) {
    var lengthx = array_2d[0];
    var lengthy = array_2d.length;
    var lengthx = lengthx.length;
    var principal_amount = [];
    var names = [];
    var final_returns = [];
    // console.log(lengthy);
    for (let i = 0; i < lengthy; i++) {
      // console.log(array_2d[i][0])
      // console.log(array_2d[i][lengthx-1])
      principal_amount.push(array_2d[i][0]);
      final_returns.push(array_2d[i][lengthx - 1]);
    }
    for (let i = 0; i < lengthy; i++) {
      // principal_amount.push(array_2d[i][0])
      // final_returns.push(array_2d[i][-1])
      names.push(dataz[i]["investment_name"]);
    }
    // var x = []
    // for (let i=0; i<lengthx; i++){
    //   x.push(0);
    // }
    // for (let i=0; i<lengthx; i++){
    //   var y = 0;
    //   for (let j=0; j<lengthy; j++){
    //     y = y + array_2d[j][i]
    //   }
    //   x[i] = y
    // }
    var year_list = [];
    for (let i = 0; i < lengthx; i++) {
      year_list.push("year" + i.toString());
    }
    return [principal_amount, final_returns, names];
  }

  function get_category_bar(dataz) {
    var unique_categories = [];
    for (let i = 0; i < dataz.length; i++) {
      if (!unique_categories.includes(dataz[i]["investment_category"])) {
        unique_categories.push(dataz[i]["investment_category"]);
      }
    }
    // var list_metadata_categories = []
    // for (let i=0; i<dataz.length; i++){
    //   list_metadata_categories.push([]);
    // }
    var principal_amount = [];
    var investment_returns = [];

    for (let i = 0; i < unique_categories.length; i++) {
      var principal_amountx = 0;
      var investment_returnsx = 0;
      for (let j = 0; j < dataz.length; j++) {

        if (dataz[j]["investment_category"] == unique_categories[i]) {
          principal_amountx = principal_amountx + dataz[j]["investment_amount"];
          const interest = dataz[j]["annual_returns"];
          const duration = dataz[j]["time_period"];
          const returns =
            dataz[j]["investment_amount"] * (1 + interest / 100) ** duration;
          investment_returnsx = investment_returnsx + returns;
        }
      }

      principal_amount.push(principal_amountx);
      investment_returns.push(investment_returnsx);
    }
    return [principal_amount, investment_returns, unique_categories];
  }

  function investment_category_division(datay) {
    var unique_categories = ["Mutual Funds", "ETFs", "Gold Bonds"];
    // var investment_distro = [[],[],[]];
    var mf_amount = 0;
    var etfs_amount = 0;
    var gold_bonds_amount = 0;
    for (let i = 0; i < datay.length; i++) {
      // var investment = 0;
      // for (let j = 0; j < datay.length; i++) {
      //   if (datay[j]["investment_category"] == unique_categories[i]) {
      //     investment = investment + datay[j]["investment_amount"];
      //   }
      // }
      if (datay[i]["investment_category"] == "Mutual Funds") {
        mf_amount = mf_amount + datay[i]["investment_amount"];
      } else if (datay[i]["investment_category"] == "ETFs") {
        etfs_amount = etfs_amount + datay[i]["investment_amount"];
      } else {
        gold_bonds_amount = gold_bonds_amount + datay[i]["investment_amount"];
      }
      // investment_distro.push(investment);
    }
    return [[mf_amount, etfs_amount, gold_bonds_amount], unique_categories];
  }

  function investment_period_division(datay) {
    var name_investment = [];
    var period_investment = [];
    for (let i = 0; i < datay.length; i++) {
      name_investment.push(datay[i]["investment_name"]);
      
      period_investment.push(datay[i]["time_period"]);
    }
    // var unique_categories = ["Mutual Funds", "ETFs", "Gold Bonds"];
    // // var investment_distro = [[],[],[]];
    // var mf_amount = 0;
    // var etfs_amount = 0;
    // var gold_bonds_amount = 0;
    // for (let i = 0; i < datay.length; i++) {
    //   // var investment = 0;
    //   // for (let j = 0; j < datay.length; i++) {
    //   //   if (datay[j]["investment_category"] == unique_categories[i]) {
    //   //     investment = investment + datay[j]["investment_amount"];
    //   //   }
    //   // }
    //   if (datay[i]['investment_category']=='Mutual Funds'){
    //     mf_amount = mf_amount + datay[i]['investment_amount']
    //   } else if (datay[i]['investment_category']=='ETFs'){
    //     etfs_amount = etfs_amount + datay[i]['investment_amount']
    //   } else{
    //     gold_bonds_amount = gold_bonds_amount + datay[i]['investment_amount']

    //   }
    //   // investment_distro.push(investment);
    // }
    return [name_investment, period_investment];
  }

  return (
    <div className="bg-slate-100 w-[50vw] h-auto flex flex-col rounded-2xl items-center justify-center p-4">
      {baskets.length === 0 ? (
        <>
          <p className="font-bold text-lg text-center">
            No Investment Baskets Found
          </p>
          <button
            className="rounded-full border-4 px-8 py-1 mt-5 border-emerald-500"
            onClick={() => setShowCreateBasket(true)}
          >
            + Add Basket
          </button>
          <CreateBasket
            isVisible={showCreateBasket}
            onClose={() => setShowCreateBasket(false)}
          />
        </>
      ) : selectedBasket === null ? (
        <p className="font-bold text-lg text-center">Please select a basket</p>
      ) : investmentDetails.length === 0 ? (
        <>
          <p className="font-bold text-lg text-center">
            No Investments Found in Selected Basket
          </p>
          <button
            className="rounded-full border-4 px-8 py-1 mt-5 border-emerald-500"
            onClick={() => setShowSelectInvestmentCategory(true)}
          >
            + Add Investment
          </button>
          <SelectInvestmentCategory
            basketName={basketName}
            selectedBasket={selectedBasket}
            setInvestmentDetails={setInvestmentDetails}
            isVisible={showSelectInvestmentCategory}
            onClose={() => setShowSelectInvestmentCategory(false)}
          />
        </>
      ) : (
        <div className="p-4 w-full mt-8">
          <h2 className="font-bold text-4xl mb-4">Investments</h2>
          <button
            className="mb-4 text-right rounded-full border-4 px-8 py-1 mt-5 border-emerald-500"
            onClick={() => setShowSelectInvestmentCategory(true)}
          >
            + Add Investment
          </button>
          <SelectInvestmentCategory
            basketName={basketName}
            selectedBasket={selectedBasket}
            setInvestmentDetails={setInvestmentDetails}
            isVisible={showSelectInvestmentCategory}
            onClose={() => setShowSelectInvestmentCategory(false)}
          />
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 bg-gray-200">Amount</th>
                  <th className="py-2 px-4 bg-gray-200">Category</th>
                  <th className="py-2 px-4 bg-gray-200">Investment Name</th>
                  <th className="py-2 px-4 bg-gray-200">Time Period</th>
                  <th className="py-2 px-4 bg-gray-200">CAGR</th>
                </tr>
              </thead>
              <tbody>
                {investmentDetails.map((investment, index) => (
                  <tr key={index}>
                    <td className="border py-2 px-4">{investment.investment_amount}</td>
                    <td className="border py-2 px-4">{investment.investment_category}</td>
                    <td className="border py-2 px-4">{investment.investment_name}</td>
                    <td className="border py-2 px-4">{investment.time_period}</td>
                    <td className="border py-2 px-4">{investment.investment_cagr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          

          <h1 className="mt-10">Details of Investments</h1>
          <h2>Distribution by Investment Amount</h2>
          <PieChartComponent
            datay={investment_category_division(investmentDetails)}
          />
          <h2>Distribution by Time Period of Investment</h2>
          {/* <h1>Bar Graph Example</h1> */}
          <YearlyChartComponent
            datay={investment_period_division(investmentDetails)}
          />

          <h1>Details of Returns</h1>
          <h2>Overall Returns vs Time</h2>
          <ChartComponent
            datay={get_line_array(create_2d_arrays(investmentDetails))}
          />
          <h2>Investment vs Returns by Categories</h2>
          <CategoryResults datay={get_category_bar(investmentDetails)} />

          <h2>Investment vs Returns by Investment Options</h2>
          <GroupedBarChartComponent
            datay={get_group_bar(
              create_2d_arrays(investmentDetails),
              investmentDetails
            )}
          />
        </div>
      )}
    </div>
  );
};

export default Investment;
