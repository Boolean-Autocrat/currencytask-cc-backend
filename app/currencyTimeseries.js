import readline from "readline";
import fetch from "node-fetch";
import { table } from "table";

const currencyTimeseries = async (
  baseUrl,
  requestOptions,
  originalCurrency,
  symbolList
) => {
  console.log("-----------------------------------");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const start_date = await new Promise((resolve) => {
    rl.question(
      `Enter the start date for the timeseries for ${originalCurrency} (YYYY-MM-DD): `,
      (start_date) => {
        resolve(start_date);
      }
    );
  });

  const end_date = await new Promise((resolve) => {
    rl.question(
      `Enter the end date for the timeseries for ${originalCurrency} (YYYY-MM-DD): `,
      (end_date) => {
        resolve(end_date);
      }
    );
  });

  rl.close();
  let date_regex = /^\d{4}-\d{2}-\d{2}$/;

  if (!start_date.match(date_regex) || !end_date.match(date_regex)) {
    console.log("\n");
    console.log("\x1b[31m", "Please make sure the date is correct.");
    console.log("\x1b[0m");
    console.log("\n");
    return currencyTimeseries(
      baseUrl,
      requestOptions,
      originalCurrency,
      symbolList
    );
  }

  console.log(
    `Fetching timeseries data for KWD equivalent to currencies in "./symbols.js" ...`
  );
  let response = await fetch(
    `${baseUrl}/timeseries?start_date=${start_date}&end_date=${end_date}&base=${originalCurrency}&symbols=${symbolList.toString()}`,
    requestOptions
  );
  let data = await response.json();
  let rates = data.rates;
  const dataArr = [];
  dataArr.push(["\x1b[34mDate\x1b[0m"]);
  symbolList.forEach((symbol) => {
    dataArr[0].push(`\x1b[34m${symbol}\x1b[0m`);
  });
  for (let key in rates) {
    let temp_arr = [key];
    for (let symbol in rates[key]) {
      temp_arr.push(rates[key][symbol]);
    }
    dataArr.push(temp_arr);
  }
  console.log(table(dataArr));
};

export default currencyTimeseries;
