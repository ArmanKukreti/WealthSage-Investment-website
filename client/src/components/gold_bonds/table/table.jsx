import React, {useState} from "react";
import './table.css'
const Table =({ data }) => {
  
    return (
      <table className="table">
        <thead className="table-header">
          <tr>
            <th>Investment ID</th>
            <th>Symbol</th>
            <th>Issue Price</th>
            <th>Last Traded Price</th>
            <th>Volume</th>
            <th>Value (Rs. Crore)</th>
            <th>Annual Rate</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.krypt_codes} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#e0e0e0' }} Name="table-row">
              <td className="table-data">{item.krypt_codes}</td>
              <td className="table-data">{item.SYMBOL}</td>
              <td className="table-data">{item['Issue Price']}</td>
              <td className="table-data">{item.LTP}</td>
              <td className="table-data">{item.VOLUME}</td>
              <td className="table-data">{item['VALUE (\u20b9 Crores)']}</td>
              <td className="table-data">{item['365 D % CHNG']}</td>
              {/* <td className="table-data">{item.CAGR3Y}</td> */}
              {/* <td className="table-data">{item.expense_ratio}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

export default Table;