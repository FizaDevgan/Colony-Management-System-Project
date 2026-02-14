var express = require('express');
var app = express();
const error = require("express/lib/router/route");
 var cookieParser = require("cookie-parser");
var db = require("./db.config");
let cors = require("cors");
var adminRouter=require("./routes/admin");
var userRouter=require("./routes/user");
var indexRouter = require("./routes/indexroute");
var fileupload = require("express-fileupload");

app.set('view engine' , 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(fileupload());
app.use('/',indexRouter);

app.use("/admin",adminRouter);
app.use("/user",userRouter);
//app.use("/cart",userRouter);

db.sequelize.sync(); //this line will connect u with mysql database and will chk if the table we trying to make is already made othervise it will make it


var port=3008;
app.listen(port,(error)=>{
    if(error){
        console.log(error.message);
    }else{
        console.log("Server started on port 3000" );
    }

}) ;