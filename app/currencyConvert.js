import readline from "readline";
import fetch from "node-fetch";

const currencyConvert = async (baseUrl, requestOptions) => {
  console.log("-----------------------------------");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const from = await new Promise((resolve) => {
    rl.question(`Enter the currency code to be converted from: `, (from) => {
      resolve(from);
    });
  });

  const to = await new Promise((resolve) => {
    rl.question(`Enter the currency code to be converted to: `, (to) => {
      resolve(to);
    });
  });

  const amount = await new Promise((resolve) => {
    rl.question(`Enter the amount to be converted: `, (amt) => {
      resolve(amt);
    });
  });

  const date = await new Promise((resolve) => {
    rl.question(`Enter the date (YYYY-MM-DD): `, (d) => {
      resolve(d);
    });
  });

  rl.close();

  let date_regex = /^\d{4}-\d{2}-\d{2}$/;

  if (
    from.length !== 3 ||
    to.length !== 3 ||
    isNaN(amount) ||
    !date.match(date_regex)
  ) {
    console.log("\n");
    console.log(
      "\x1b[31m",
      "Please make sure the currency codes are three letter strings, amount is an integer and date is correct."
    );
    console.log("\x1b[0m");
    console.log("\n");
    return currencyConvert(baseUrl, requestOptions);
  }

  try {
    console.log(`Fetching conversion data...`);
    let response = await fetch(
      `${baseUrl}/convert?to=${to}&from=${from}&amount=${amount}&date=${date}`,
      requestOptions
    );
    let data = await response.json();
    console.log("\n");
    console.log(
      `\x1b[34m${amount} ${from}\x1b[0m is equal to \x1b[34m${data.result.toFixed(
        2
      )} ${to}\x1b[0m as of \x1b[34m${date}\x1b[0m.`
    );
    console.log("\n");
    return from;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

export default currencyConvert;
