const Termparse = require("./termparse");

//create a instance
const tp=new Termparse();

//1st command
tp.addCommand({
    name:"cmd1",
    usage:"this is command 1",
    run:function(){
        console.log(`accessing flags using getFlag`,this.getFlag("flag1"));
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
        console.log(`another way to access flag`,this.flags.flag1); //this.flags.<flag_name>
    }
}).setFlags({
    name:"flag1",
    usage:"this is flag 1 (gas 1) for command 2"
});

var args=process.argv.slice(2);

tp.parse(args);
