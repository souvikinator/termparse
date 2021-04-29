const chalk = require("chalk");

function showHelp() {
      for (let c in this.commands) {
         let command = this.commands[c];
         console.log(`${chalk.blueBright("Command:")} ${command.name}`);
         console.log(`${chalk.magentaBright("Usage:")} ${command.usage}`);
         console.log(`   ${chalk.greenBright("Flags:")}`);
         for (let f in command.flags) {
            let flag = command.flags[f];
            console.log(`   ${flag.name}  :  [${flag.type}]   ${flag.usage}`);
         }
         console.log("\n");
      }
      console.log(`${chalk.yellowBright("General:")}`);
      console.log("   -help  :  display help/usage guide");
}

module.exports={showHelp};
