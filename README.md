# 𝗧𝗲𝗿𝗺-𝗽𝗮𝗿𝘀𝗲 _

A minimal node js CLI maker.

## Technology used:
No **external dependencies** used apart from **chalk.js** for coloured outputs.

## Features:

 - Parses command line arguments like		 
	- -flag=value
	- -flag value
- Allows user to set commands
- Generates usage details of the CLI application

well go down to know more...

## Usage:

### Getting started

-	 Download the `termparse.js` file and place it in your project directory.
-	To use it in project:
	```nodejs
	const Termparse=require(path/to/termparse.js);
	```	
or

-	use NPM
	```bash
	npm i termparse
	```
and you are ready to go

### Adding commands for the application
```js
const Termparse=require(path/to/termparse.js);

//initializing
var termparse=new Termparse.init();

//adding commands for cli application
termparse.addCommand({
	name:"cmd1",
	usage:"cmd1 usage details here",
	run: function(){
		//functioning of cmd1 here
		console.log("cmd1 called");
	} 
});

termparse.addCommand({
	name:"cmd2",
	usage:"cmd2 usage details here",
	run: function(){
		//function of cmd1 here
		console.log("cmd2 called");
	} 
});

//adding options/flags to commands
termparse.setFlag('cmd1',{
	name:'flag1',
	type:'string',
	value:'default value',
	usage:'usage details of flag1'
});

termparse.setFlag('cmd2',{
	name:'flag2',
	type:'boolean',
	value:false,
	usage:'usage details of flag2'
});

//getting command line args
var args=process.argv.slice(2);

//passing command line args to termparse
termparse.parse(args);
```

## `addCommand(options)`

Adds commands to the CLI application.
Takes object as input with following keys:
```json
{
	"name":"name of command here",
	"usage":"usage details of the command",
	"run":"adds functionality to commad"
}
```
`usage` takes the details of what the command does which is recommended to generate a auto-usage guide.

`run` takes function and the function is called when the command is called in terminal.

## `setFlag(command_name,options)`

Adds flags/options to a specific command of your CLI application.
`command_name` takes name of the command the flag/option will be associated with.
`option` takes object with following keys:

```json
{
	"name":"name of flag",
	"type":"type of flag",
	"value":"value of flag",
	"usage":"usage details"
}
```

`type` can be either `boolean` or `string`
if no type is passed then default is `boolean`

`value`  if flag type is boolean then it takes true/false, default being false in boolean.
if flag type is string then it takes string as value, default being empty string.

## `getFlag(command_name,flag_name)`

Gets flags/options object of a specific command of your CLI application.
`command_name` takes name of the command the flag/option will be associated with.
`flag` takes name of the flag

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
using `getFlag()` lets user use the flags value to do various function.
Let's modify the first usage example little bit:

```js
const Termparse=require(path/to/termparse.js);

//initializing
var termparse=new Termparse.init();

//adding commands for cli application
termparse.addCommand({
	name:"cmd1",
	usage:"cmd1 usage details here",
	run: function(){
		//usage of getFlag()
		let flag1=termparse.getFlag("cmd1","flag1");
		if(flag1.value.length>0){
			console.log(`value of flag1= ${flag1.value}`);
		}
	} 
});

termparse.addCommand({
	name:"cmd2",
	usage:"cmd2 usage details here",
	run: function(){
		//function of cmd1 here
		console.log("cmd2 called");
	} 
});

//adding options/flags to commands
termparse.setFlag('cmd1',{
	name:'flag1',
	type:'string',
	value:'default value',
	usage:'usage details of flag1'
});

termparse.setFlag('cmd2',{
	name:'flag2',
	type:'boolean',
	value:false,
	usage:'usage details of flag2'
});

//getting command line args
var args=process.argv.slice(2);

//passing command line args to termparse
termparse.parse(args);

```
