const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const request = require("request");

const fs = require("fs");
const http = process.argv[2];
const file = process.argv[3];
request(http, (error, responce, data) => {
  if (error) {
    console.log("error: ", error);
    process.exit();
  }
  
  console.log("responce: ", responce && responce.statusCode);
  fs.readFile(file, (err) => {
    if (!err) {
      rl.question(`${file} already exist, do you want to overwrite?\n(Y to accept, or skip and exit)`, (ans) => {
        if (ans.toLowerCase() === "y") {
          fs.writeFile(file, data, (error) => {
            !error ? console.log("saved") : console.log(error);
            process.exit();
          });
        } else {
          process.exit();
        }
      });
    } else {
      fs.writeFile(file, data, (error) => {
        !error ? console.log("saved") : console.log(error);
        process.exit();
      });
    }
  });
});
