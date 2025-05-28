const ascii = require("ascii-table");
const chalk = require("chalk");
const path = require("path");
const fs = require("fs");

/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/

const { bot } = require("../JS/config.js");

let PASS = 0;
let FAIL = 0;

/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/

/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/

let tableCommand = new ascii("Mail Bot").setHeading(
  "File",
  "Commands",
  "Description",
  "Test"
);
const slashCommandsPath = path.join(__dirname, "../commands/slash");
fs.readdirSync(slashCommandsPath).forEach((file) => {
  const slashCommandFolder = path.join(slashCommandsPath, file);
  fs.readdirSync(slashCommandFolder)
    .filter((file) => file.endsWith(".js"))
    .forEach((file, index) => {
      const filePath = path.join(slashCommandFolder, file);
      const command = require(filePath);
      if (!command.data || !command.data.name) {
        tableCommand.addRow(         
          file,
          "Undefined",
          "Undefined",
          chalk.red.bold("FAIL")
        );
        FAIL++;
      } else {
        tableCommand.addRow(
          file,
          "/" + command.data.name,
          command.data.description,
          chalk.green.bold("PASS")
        );
        PASS++;
      }
    });
});

const prefixCommandsPath = path.join(__dirname, "../commands/prefix");
fs.readdirSync(prefixCommandsPath).forEach((file) => {
  const prefixCommandFolder = path.join(prefixCommandsPath, file);
  fs.readdirSync(prefixCommandFolder)
    .filter((file) => file.endsWith(".js"))
    .forEach((file, index) => {
      const filePath = path.join(prefixCommandFolder, file);
      const command = require(filePath);
      if (!command || !command.name) {
        tableCommand.addRow(
          file,
          "Undefined",
          "Undefined",
          chalk.red.bold("FAIL")
        );
        FAIL++;
      } else {
        tableCommand.addRow(      
          file,
          bot.prefix + command.name,
          command.description,
          chalk.green.bold("PASS")
        );
        PASS++;
      }
    });
});

/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/


console.log(tableCommand.toString());
console.log(`Loaded ${chalk.green(PASS)} commands successfully.`);
console.log(`Failed to load ${chalk.red(FAIL)} commands.`);

/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
