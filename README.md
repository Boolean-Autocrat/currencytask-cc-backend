# Features

- [x] Currency Conversion
- [x] Latest Currency Rates w/ Base Currency
- [x] All Available Currency Codes
- [x] Historical Currency Rates w/ Base Currency (Timeseries)
- [x] All relevant output in ASCII Tables
- [x] Added full input validation with error handling and retry (used regex for date validation)
- [x] Only used ES6 modules
- [x] Only used **3** dependencies (dotenv, node-fetch, table)
- [x] Only used **1** dev dependency for initial setup (vite)

# Setup

- Clone the repo
- Run `npm i`
- Create a `.env` file in the root directory
- Add your API key to the `.env` file as `API_KEY=your_api_key`
- Run `node app.js` to start the app

# File Structure

```
app
├───currencyCodes.js
├───currencyConvert.js
├───currencyTimeseries.js
├───currencyValSymbol.js
.gitignore
app.js
intervalCheck.js
package-lock.json
package.json
README.md (this file)
symbols.js
```
