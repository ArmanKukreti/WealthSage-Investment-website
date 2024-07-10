import React from "react";
import Table from "./table/Table"; // Correct import path
import "./etfs.css"; // Correct import path

const ETFS = () => {
  // const data = [
  //   { investment_id: 1, symbol: 'John Doe', issue_price: 28, LTP: 'abc', volume:'xyz', value:10, annual_rate:1},
  //   { investment_id: 2, symbol: 'John Doe', issue_price: 28, LTP: 'abc', volume:'xyz', value:10, annual_rate:1},
  //   { investment_id: 3, symbol: 'John Doe', issue_price: 28, LTP: 'abc', volume:'xyz', value:10, annual_rate:1},
  //   { investment_id: 4, symbol: 'John Doe', issue_price: 28, LTP: 'abc', volume:'xyz', value:10, annual_rate:1},
  // ];
  const data = [
    {
      "365 D % CHNG": 40.32,
      "LTP": 36.59,
      "NAV": 36.29,
      "SYMBOL": "HDFCBSE500",
      "UNDERLYING ASSET": "HDFC S&P BSE 500 ETF",
      "VALUE (₹ Crores)": 0.08,
      "VOLUME": 21899.0,
      "krypt_codes": "ETF4"
  },
  {
      "365 D % CHNG": 55.83,
      "LTP": 88.3,
      "NAV": 87.54,
      "SYMBOL": "UTISXN50",
      "UNDERLYING ASSET": "BSE Sensex Next 50",
      "VALUE (₹ Crores)": 0.03,
      "VOLUME": 3621.0,
      "krypt_codes": "ETF6"
  },
  {
      "365 D % CHNG": 26.98,
      "LTP": 248.0,
      "NAV": 246.77,
      "SYMBOL": "MOM50",
      "UNDERLYING ASSET": "Nifty 50",
      "VALUE (₹ Crores)": 0.08,
      "VOLUME": 3160.0,
      "krypt_codes": "ETF12"
  },
  {
      "365 D % CHNG": 28.7,
      "LTP": 265.25,
      "NAV": 260.7,
      "SYMBOL": "IDFNIFTYET",
      "UNDERLYING ASSET": "Nifty 50",
      "VALUE (₹ Crores)": 0.01,
      "VOLUME": 479.0,
      "krypt_codes": "ETF13"
  },
  {
      "365 D % CHNG": 24.09,
      "LTP": 66.66,
      "NAV": 61.26,
      "SYMBOL": "MONQ50",
      "UNDERLYING ASSET": "Nasdaq Q-50 Total Return Index",
      "VALUE (₹ Crores)": 0.15,
      "VOLUME": 22423.0,
      "krypt_codes": "ETF14"
  },  
  ]
  return (
    <section>
      <p>Information about Exchange Traded Funds</p>
      <div className="table-div">
        <Table data={data} />
      </div>
    </section>
  );
};

export default ETFS;
