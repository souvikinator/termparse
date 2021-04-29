const chalk = require("chalk");
const {getFlag,setFlags}=require("./flag");

/*
 * add a new command 
 * @param cmdprop - command properties
 * @param cmdprop.name - name of the command
 * @param cmdprop.usage - usage details/description of the command
 * @param cmdprop.run - function to be execute after the command is called
 */
function addCommand(cmdprop) {

   //assigning the passed options to the tmp cmdObj
   cmdprop = Object.assign({
      name: "",
      usage: "",
      run: function () { },
      flags: {},
      setFlags: setFlags,
      getFlag: getFlag,
      args: []
   }, cmdprop);
   //error handling
   if (cmdprop.name.length === 0) {
      console.error(chalk.red("addCommand(): command name cannot be empty"));
      process.exit();
   }

   //if command already exists
   if (this.commands.hasOwnProperty(cmdprop.name)) {
      console.error(chalk.red(`addCommand(): cannot have two commands with same name, ${cmdprop.name} already exists`));
      process.exit();
   }

   if (typeof cmdprop.run !== "function") {
      console.error(chalk.red(`addCommand(): no functionality added to ${cmd}. add one by passing a function to run property `));
      process.exit();
   }
   this.commands[cmdprop.name] = { ...cmdprop };
   //for chaining
   return this.commands[cmdprop.name];
}

module.exports=addCommand;
