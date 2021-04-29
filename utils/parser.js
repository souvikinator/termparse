const chalk = require("chalk");
const {showHelp}=require("./misc");

/*
 * parses command line args
 * @params {string[]} args - command line arguments
 */
function parse(args) {
      //no args provided
      if (args.length === 0) {
         this.showHelp();
         process.exit();
      }
      let cmd = args[0];//command
      let cmd_args = args.slice(1);//args except command 
      let rxp1 = new RegExp("^\-(.*)\=([^]*)"); //for -flag=value
      let rxp2 = new RegExp("^\-(.*)"); //for -flag value
      this.args = new Array(); //args except command and flags

      if (cmd === "-help") {
         this.showHelp();
         process.exit();
      }

      //command exists?
      if (!this.commands.hasOwnProperty(cmd)) {
         console.log(chalk.red(`unknown command : "${cmd}"`));
         this.showHelp();
         process.exit();
      }
      
      for (let n in cmd_args) {
         let rxp1_res = rxp1.exec(cmd_args[n]);
         let rxp2_res = rxp2.exec(cmd_args[n]);

         if (rxp1_res !== null) {
            //for flag of type -flag=value
            //if command has the flag
            if (!this.commands[cmd].flags.hasOwnProperty(rxp1_res[1])) {
               console.log(chalk.red(`unknown flag : "${rxp1_res[1]}"`));
               this.showHelp();
               process.exit();
            }

            let flg_obj = this.commands[cmd].flags[rxp1_res[1]];

            //if flag exists and the type is boolean
            if (flg_obj.type === "boolean") {
               flg_obj.value = true;
               flg_obj.isPresent = true;
            }
            //if flag exists and the type is string then next arg is it's value
            if (flg_obj.type === "string") {
               let flag_val_type = typeof (rxp1_res[2]);
               //check if value passed?
               if (flag_val_type === "undefined" || flag_val_type === "null" || rxp1_res[2].length === 0) {
                  console.log(chalk.red(`'-${rxp1_res[1]}' used but no value passed`));
                  process.exit();
               }
               flg_obj.value = rxp1_res[2];
               flg_obj.isPresent = true;
            }

         } else if (rxp2_res !== null) {
            //for flags of type -flag or -flag value
            if (!this.commands[cmd].flags.hasOwnProperty(rxp2_res[1])) {
               console.log(chalk.red(`unknown flag : "${rxp2_res[1]}"`));
               this.showHelp();
               process.exit();
            }
            let flg_obj = this.commands[cmd].flags[rxp2_res[1]];
            if (flg_obj.type === "boolean") {
               flg_obj.value = true;
               flg_obj.isPresent = true;
            }
            //flag exists and the type is string then next arg is it's value
            if (flg_obj.type === "string") {
               //type of arg next to flag
               let flag_val_type = typeof (cmd_args[parseInt(n) + 1]);
               if (flag_val_type === 'null' || flag_val_type==='undefined') {
                  console.log(chalk.red(`'-${rxp2_res[1]}' used but no value passed`));
                  process.exit();
               }
               flg_obj.value = cmd_args[parseInt(n) + 1];
               flg_obj.isPresent = true;
               //remove already parsed command line args
               cmd_args.splice(parseInt(n) + 1, 1); //remove the next element to avoid conflict
            }
         } else {
            //rest are arguments
            this.args.push(cmd_args[n]);
            //make args accessible from each commands
            this.commands[cmd].args.push(cmd_args[n]);
         }

      }
      //executing command action
      this.commands[cmd].run();
   }

module.exports=parse;
