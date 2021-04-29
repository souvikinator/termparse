const Termparse = require("./termparse");

//create a instance
const tp=new Termparse();

//1st command
tp.addCommand({
    name:"cmd1",
    usage:"this is command 1",
    run:function(){
        console.log("flag1=>",this.getFlag('flag1').value);
        console.log("flag2=>",this.getFlag('flag2').value);
    }
}).setFlags({
    name:"flag1",
    usage:"this is flag 1 for command 1",
    type:"string",
    value:"hello"
},{
    name:"flag2",
    usage:"this is flag 2 for command 1"
});

// 2nd command
tp.addCommand({
    name:"cmd2",
    usage:"this is command 1",
    run:function(){
        console.log(this.args); 
    }
}).setFlags({
    name:"flag1",
    usage:"this is flag 1 (gas 1) for command 2"
});

var args=process.argv.slice(2);

tp.parse(args);
