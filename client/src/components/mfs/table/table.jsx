import React, {useState} from "react";
import './table.css'
const Table =({ data }) => {
  
    return (
      <table className="table">
        <thead className="table-header">
          <tr>
            <th>Investment ID</th>
            <th>Investment Option Name</th>
            <th>Sub Category</th>
            <th>Plan</th>
            <th>AUM</th>
            <th>CAGR 3Y</th>
            <th>Expense Ratio</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.krypt_codes} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#e0e0e0' }} Name="table-row">
              <td className="table-data">{item.krypt_codes}</td>
              <td className="table-data">{item.NameMFs}</td>
              <td className="table-data">{item['Sub Category']}</td>
              <td className="table-data">{item.Plan}</td>
              <td className="table-data">{item.AUM}</td>
              <td className="table-data">{item.CAGR3Y}</td>
              <td className="table-data">{item['Expense Ratio']}</td>
              
              
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

export default Table;