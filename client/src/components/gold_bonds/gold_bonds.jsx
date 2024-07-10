import Table from "./table/table";
import './gold_bonds.css'

const GoldBonds = () => {
  // const data = [
  //   { krypt_codes: 1, SYMBOL: 'John Doe', LTP: 28, LTP: 'abc', volume:'xyz', value:10, annual_rate:1},
  //   { krypt_codes: 2, SYMBOL: 'John Doe', issue_price: 28, LTP: 'abc', volume:'xyz', value:10, annual_rate:1},
  //   { krypt_codes: 3, SYMBOL: 'John Doe', issue_price: 28, LTP: 'abc', volume:'xyz', value:10, annual_rate:1},
  //   { krypt_codes: 4, SYMBOL: 'John Doe', issue_price: 28, LTP: 'abc', volume:'xyz', value:10, annual_rate:1},
  // ];
  const data =[
    {
      "365 D % CHNG": 28.23,
      "ISSUE PRICE": NaN,
      "LTP": 7650.0,
      "SYMBOL": "SGBAUG30",
      "Unnamed: 0": 3,
      "VALUE (₹ Crores)": 0.12,
      "VOLUME": 161.0,
      "krypt_codes": "GB3"
  },
  {
      "365 D % CHNG": 28.4,
      "ISSUE PRICE": NaN,
      "LTP": 7579.99,
      "SYMBOL": "SGBJUL29IV",
      "Unnamed: 0": 4,
      "VALUE (₹ Crores)": 0.11,
      "VOLUME": 147.0,
      "krypt_codes": "GB4"
  },
  {
      "365 D % CHNG": 28.14,
      "ISSUE PRICE": NaN,
      "LTP": 7500.0,
      "SYMBOL": "SGBMAY29I",
      "Unnamed: 0": 6,
      "VALUE (₹ Crores)": 1.27,
      "VOLUME": 1694.0,
      "krypt_codes": "GB6"
  },
  {
      "365 D % CHNG": 28.39,
      "ISSUE PRICE": NaN,
      "LTP": 7615.98,
      "SYMBOL": "SGBAUG28V",
      "Unnamed: 0": 7,
      "VALUE (₹ Crores)": 0.48,
      "VOLUME": 633.0,
      "krypt_codes": "GB7"
  },
  ]
  return (
    
    <section>
      {/* <h2>Gold Bonds</h2> */}
      <p>Information about Gold Bonds</p>
      <div className='table-div'>

      <Table data={data}/>
      </div>
    </section>
  );
};

export default GoldBonds;