const ascii = require("ascii-table");
const chalk = require("chalk");
const path = require("path");
const fs = require("fs");

/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
const client = require("../JSON/client.js");
const { Collection } = require("discord.js");
client.commands = new Collection();
let PASS = 0;
let FAIL = 0;


/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
const eventsPath = path.join(__dirname, "../events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  
  } else {
    client.on(event.name, (...args) => event.execute(...args));
   
  }
}


/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
const slashCommandsPath = path.join(__dirname, "../commands");
const slashCommandFiles = fs
  .readdirSync(slashCommandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of slashCommandFiles) {
  const filePath = path.join(slashCommandsPath, file);
  const command = require(filePath);
  if (command.data && command.data.name) {
    client.commands.set(command.data.name, command);
  } else {
    console.error(
      `Error: Command ${file} does not have a valid data object or name.`
    );
  }
}

/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/


let eventtableCommand = new ascii();
//tableCommand.setTitleAlign(ascii.CENTER);
eventtableCommand.setHeading("Events","Status");
//.setHeadingAlign(ascii.CENTER);
eventtableCommand.setBorder("‖","=","+","+");
const commandsPath = path.join(__dirname, "../events");

const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

commandFiles.forEach((filePath) => {
  const fileName = filePath;

  try {
    eventtableCommand.addRow(fileName,chalk.green.bold("PASS"));
  } catch(error){
    eventtableCommand.addRow(chalk.red(fileName), chalk.red.bold("FAIL"));
      console.log(`Failed to load ${chalk.red(fileName)} Reason: ${error}`);
  }

});
console.log(eventtableCommand.toString());



/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/

let tableCommand = new ascii(`Mail Bot v1.1`);
tableCommand.setHeading("Commands","Test");
tableCommand.setBorder("‖","=","+","+");


  const loadCommands = (commandsPath) => {
  
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));
  
  commandFiles.forEach((filePath) => {
    const fileName = filePath;
    try {
      tableCommand.addRow(fileName , chalk.green.bold("PASS"));
      PASS++;
    } catch (error) {
      tableCommand.addRow(chalk.red(fileName) , chalk.red.bold("FAIL"));
      console.log(`Failed to load ${chalk.red(fileName)} Reason: ${error}`);
      FAIL++;
    }
  });
};

loadCommands(path.join(__dirname, "../commands"));
//loadCommands(path.join(__dirname, "../commands/Prefix"), false);

console.log(chalk.bgBlackBright(tableCommand.toString()));
console.log(`Loaded ${chalk.green(PASS)} commands successfully.`);
console.log(`Failed to load ${chalk.red(FAIL)} commands.`);

/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/