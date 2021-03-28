# 𝗧𝗲𝗿𝗺-𝗽𝗮𝗿𝘀𝗲_ V2

A minimal node js CLI maker.

**Note:** Version 2 has breaking changes so make sure to read below and make changes to your application accordingly

## Technology used:
No **external dependencies** used apart from **chalk.js** for coloured outputs.

## Features:

 - Parses command line arguments like		 
	- -flag=value
	- -flag value
- Allows user to set commands
- Can have same named flags for different commands
- Generates usage details of the CLI application


### Getting started
-	use NPM
	```bash
	npm i termparse
	```
and you are ready to go

### Demo


```js
const Termparse = require("termparse");

//create a instance
const tp=new Termparse();

//1st command
tp.addCommand({
    name:"cmd1",
    usage:"this is command 1",
    run:function(){
    	//adding functionality to cmd1
	//this.getFlag(flagName) returns flag object
        console.log(`accessing flags using getFlag`,this.getFlag("flag1"));
    }
}).setFlags({ //chaining setFlags with addCommand
    name:"flag1",
    usage:"this is flag 1 for command 1",
    type:"string",
    value:"hahaha"
},{
    name:"flag2",
    usage:"this is flag 2 for command 1"
    //no type and value passed implies default: type:"boolean" and value:false
});

// 2nd command
tp.addCommand({
    name:"cmd1",
    usage:"this is command 1",
    run:function(){
        //another way to access flag object this.flags.<flag_name>
        console.log(`another way to access flag`,this.flags.gas1);
	//accessing args (non flag type)
	console.log(tp.args);
    }
}).setFlags({
    name:"gas1",
    usage:"this is flag 1 (gas 1) for command 2"
    type:"number",
    value:2000
});

var args=process.argv.slice(2);

tp.parse(args);

```

### Usage:

## `addCommand(options)`

Adds commands to the CLI application.
Takes command property object as input like so
```json
{
	"name":"name of command here",
	"usage":"usage details of the command",
	"run":"adds functionality to commad"
}
```
- `usage` takes the details of what the command does which is recommended to generate a auto-usage guide.
- `run` takes function and the function is called when the command is used in terminal. 

**NOTE:** do not pass fat arrow function or ()=>{} to run. Rather use function(){}.

## `setFlags(options...)`

Adds flags/options to a specific command of your CLI application. This function is used by chaining it to the `addCommand({...})` function.

Takes in multiple flag property objects as shown in the very first example.

```json
{
	"name":"name of flag",
	"type":"type of flag",
	"value":"value of flag",
	"usage":"usage details"
}
```

- `type` can be either `boolean`/`string`/`number`. If no type is passed then default is `boolean`.

- `value`  if flag type is boolean then it takes true/false, default being false in boolean. If flag type is string then it takes string as value, default being empty string.

## `getFlag(flag_name)`

Gets flag/option object of a specific command of your CLI application. Can be used within the `run` property of the `addCommand({...})`

- `flag` takes name of the flag

returns flag property object

```json
//content of flag property object
{
	"type":"type of flag",
	"value":"value of flag",
	"usage":"usage of the flag",
	"present":"whether flag is passed as arg or not"
}
```
using `getFlag()` lets user use the flags value to do various functions.
