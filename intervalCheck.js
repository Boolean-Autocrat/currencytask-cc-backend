import readline from "readline";

const intervalCheck = async () => {
  const mainReader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const check = await new Promise((resolve) => {
    mainReader.question(`Continue to the next step? (y/n) `, (check) => {
      resolve(check);
    });
  });
  mainReader.close();
  if (check.toLowerCase() === "n") {
    console.log("Thank you for using this app!");
    console.log("Exiting...");
    process.exit();
  }
};

export default intervalCheck;
