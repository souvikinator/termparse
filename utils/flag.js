const chalk = require("chalk");

/*
 * @params {string} flg - name of a flag/option associated with the command
 * @return flag object
 */
function getFlag(flg) {
   //flags exists?
   if (!this.flags.hasOwnProperty(flg)) {
      console.log(chalk.red(`getFlag(): "${flg}" doesn't exists for command ${this.name}`));
      process.exit();
   }
   return this.flags[flg];
}

/*
 * set multiple flags to a command
 * @param flagProps - flag property
 * @param flagProps.name - name of the flag
 * @param flagProps.type - type of the flag (string,boolean)
 * @param flagProps.value - value of the flag
 * @param flagProps.usage - usage details/ description of the flag
 */
function setFlags(...flagProps) {
   flagProps.forEach(flagObj=>{
      if (typeof flagObj !== "object") {
         console.error(chalk.red(`setFlags(): invalid argument type, argument type has to be Object`));
         process.exit();
      }
      let tmpflag = Object.assign({
         name: "",
         type: "boolean",
         value: false,
         usage: ""
      }, flagObj);

      //options.value should have same type as options.type
      if (typeof (tmpflag.value) !== tmpflag.type) {
         console.error(chalk.red(`setFlags(): flag ${tmpflag.name} has value of invalid type. Flag takes value of type ${tmpflag.type}`));
         process.exit();
      }
      //flag already exists
      if (this.flags.hasOwnProperty(tmpflag.name)) {
         console.error(chalk.red(`setFlags(): flag ${tmpflag.name} already exists with the ${this.name}.`));
         process.exit();
      }
      this.flags[tmpflag.name] = { ...tmpflag };
      this.flags[tmpflag.name].isPresent = false;
   });
}

module.exports={getFlag,setFlags};
