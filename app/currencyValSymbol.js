import fetch from "node-fetch";
import { table } from "table";

const formatDate = () => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

const currencyValSymbol = async (
  baseUrl,
  requestOptions,
  originalCurrency,
  symbolList
) => {
  let date = formatDate();
  console.log("-----------------------------------");
  console.log(`Fetching ${originalCurrency} currency data...`);
  let response = await fetch(
    `${baseUrl}/${date}?symbols=${symbolList.toString()}&base=${originalCurrency}`,
    requestOptions
  );
  let data = await response.json();
  let rates = data.rates;
  const dataArr = [];
  dataArr.push([
    "\x1b[34mCurrency\x1b[0m",
    `\x1b[34mAmount equal to 1 ${originalCurrency}\x1b[0m`,
  ]);
  for (let key in rates) {
    dataArr.push([key, rates[key]]);
  }
  console.log(table(dataArr));
};

export default currencyValSymbol;
