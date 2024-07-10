
import Table from "./table/table";
import './mfs.css';
const MutualFunds = () => {
    // const data = [
    //     { krypt_codes: 1, NameMFs: 'John Doe', CAGR3Y: 28, 'Sub Category': 'abc', Plan:'xyz', AUM:10, 'Expense Ratio':1},
    //     { krypt_codes: 2, NameMFs: 'Jane Smith', CAGR3Y: 34, 'Sub Category': 'abc', Plan:'xyz', AUM:10, 'Expense Ratio':1},
    //     { krypt_codes: 3, NameMFs: 'Sam Johnson', CAGR3Y: 45, 'Sub Category': 'abc', Plan:'xyz', AUM:10, 'Expense Ratio':1 },
    //     { krypt_codes: 4, NameMFs: 'Nancy Wilson', CAGR3Y: 29, 'Sub Category': 'abc', Plan:'xyz', AUM:10, 'Expense Ratio':1 },
    //   ];
    const data = [
      {
        "AUM": 83548.61,
        "CAGR3Y": 25.14,
        "Expense Ratio": 0.73,
        "NameMFs": "HDFC Balanced Advantage Fund",
        "Plan": "Growth",
        "Sub Category": "Balanced Advantage Fund",
        "krypt_codes": "MF0"
    },
    {
        "AUM": 56750.35,
        "CAGR3Y": 14.17,
        "Expense Ratio": 0.86,
        "NameMFs": "ICICI Pru Balanced Advantage Fund",
        "Plan": "Growth",
        "Sub Category": "Balanced Advantage Fund",
        "krypt_codes": "MF6"
    },
    {
        "AUM": 54904.23,
        "CAGR3Y": 22.4,
        "Expense Ratio": 0.9,
        "NameMFs": "ICICI Pru Bluechip Fund",
        "Plan": "Growth",
        "Sub Category": "Large Cap Fund",
        "krypt_codes": "MF7"
    },
    {
        "AUM": 45410.51,
        "CAGR3Y": 17.96,
        "Expense Ratio": 0.83,
        "NameMFs": "SBI BlueChip Fund",
        "Plan": "Growth",
        "Sub Category": "Large Cap Fund",
        "krypt_codes": "MF12"
    },
    {
        "AUM": 41159.52,
        "CAGR3Y": 24.34,
        "Expense Ratio": 0.76,
        "NameMFs": "ICICI Pru Multi-Asset Fund",
        "Plan": "Growth",
        "Sub Category": "Multi Asset Allocation Fund",
        "krypt_codes": "MF17"
    },
    ]
    return (
      <section>
        {/* <h2>Mutual Funds</h2> */}
        <p>Information about Mutual Funds</p>
        <div className="table-div">
        <Table data={data}/>
        </div>
            
      </section>
    );
  }

export default MutualFunds;