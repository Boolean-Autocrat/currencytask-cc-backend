import fetch from "node-fetch";
import { table } from "table";

const currencyCodes = async (baseUrl, requestOptions) => {
  console.log("-----------------------------------");
  console.log(`Fetching currency codes...`);
  let response = await fetch(`${baseUrl}/symbols`, requestOptions);
  let data = await response.json();
  let symbols = data.symbols;
  const dataArr = [];
  dataArr.push(["\x1b[31mSymbol\x1b[0m", `\x1b[31mCurrency\x1b[0m`]);
  for (let key in symbols) {
    dataArr.push([key, symbols[key]]);
  }
  console.log(table(dataArr));
};

export default currencyCodes;
