import "dotenv/config";
import currencyConvert from "./app/currencyConvert.js";
import currencyValSymbol from "./app/currencyValSymbol.js";
import currencyCodes from "./app/currencyCodes.js";
import currencyTimeseries from "./app/currencyTimeseries.js";
import symbolsList from "./symbols.js";
import intervalCheck from "./intervalCheck.js";

const baseUrl = "https://api.apilayer.com/exchangerates_data";

var requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: {
    apikey: process.env.API_KEY,
  },
};

const runMain = async () => {
  const fromCurrency = await currencyConvert(baseUrl, requestOptions);
  await intervalCheck();
  await currencyValSymbol(baseUrl, requestOptions, fromCurrency, symbolsList);
  await intervalCheck();
  await currencyCodes(baseUrl, requestOptions);
  await intervalCheck();
  const timeSeries = await currencyTimeseries(
    baseUrl,
    requestOptions,
    fromCurrency,
    symbolsList
  );
  console.log("Thank you for using this app!");
  console.log("Exiting...");
  process.exit();
};

runMain();
