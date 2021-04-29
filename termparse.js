"use strict";
const chalk = require("chalk")
const {showHelp}=require("./utils/misc");
const addCommand = require("./utils/command");
const parse = require("./utils/parser");

function Termparse() {
   this.commands = new Object();
   this.addCommand = addCommand; 
   //parse command line args
   this.parse = parse;
   this.showHelp = showHelp; 
}

module.exports = Termparse;
