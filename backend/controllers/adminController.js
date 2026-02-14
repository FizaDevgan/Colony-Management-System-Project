//const connection = require("../connection");
var adminController ={};
var db=require('../db.config');
//var orderdetail = db.orderdetail;
var AdminModel = db.admin;
var gaurd = db.gaurd;
var helper = db.helper;
var ccategory = db.ccategory ;
var complaint = db.complaint;
var flatmodel = db.flat;
var UserModel = db.user;
var jwt = require('jsonwebtoken');
const {where} = require("sequelize");
var nodemailer =require('nodemailer');
const {logger} = require("sequelize/lib/utils/logger");
var jwt_secret = 'abcd#123';


adminController.renderadminloginPage= async (req,res)=>{
    res.render('admin/login');
}

/*adminController.loginadmin=async (req,res)=>{
    try {
        var {email, password,type} = req.body;
        var result = await AdminModel.findAll({where: {email: email, password: password,type:type}});
        if (result.length > 0) {
            //var result=await UserModal.findAll({where:{email:email ,password:password}});
            var payload = {
                id: result[0].id,
                name: result[0].name,
                email: result[0].email,
                type: result[0].type
            };
            var token = jwt.sign(payload, jwt_secret, {expiresIn: '1h'});
            res.cookie('adminToken', token);

            res.json({error: false, message: "Login successful",token});

        } else {
            res.json({error: true, message: "Login Failed"});
        }

    }
    catch(e)
    {
        res.json({error:true,message:e.message});
    }
}*/

adminController.verifyToken = (req, res) => {
    console.log("in verify admin--")
    const token = req.headers.authorization.split(" ")[1]
    console.log("Token", token)
    if (token) {
        try {
            let adminData = jwt.verify(token, jwt_secret); // Verify Token
            console.log("Admin Data==")
            console.log(adminData)
            res.json({error: false, message: 'Authorized', userData: adminData});
        } catch (error) {
            res.json({error: true, message: 'Unauthorized'});
        }
    } else {
        res.json({error: true, message: 'Unauthorized'});
    }

};

adminController.admindashboard= async (req,res)=>{
    res.render('admin/dashboard');
}


adminController.managegaurd= async (req,res)=>{
    res.render('admin/managegaurd');
}

adminController.signupgaurd = async (req, res) => {
    try {
        // console.log(req.files)
        var {name, gender,number,email,password, mobile, gate, shift} = req.body;
        var record = await gaurd.findAll({where: {email: email , gate:gate,shift:shift}});
        if (record.length > 0) {

            res.json({error: true, message: ' User Already Exists'});

        } else {

                await gaurd.create(req.body);
                //res.redirect('/admin/dashboard');
                res.json({error: false, message: "Data Added Successfully"});

        }
    } catch (e) {
        res.json({error: true, message: e.message});
    }
}


// email
adminController.sendEmail = async (req, res) => {
    try {
        var {email, password, name} = req.body;
        var transporter = nodemailer.createTransport({
            service: 'gmail', // You can use other services like Outlook, Yahoo, etc.
            auth: {
                user: 'dummymail2003s@gmail.com', // Your email address
                pass: 'uevludqlpergxtje', // uevludqlpergxtje
            },
        });
        // Email options
        const mailOptions = {
            from: 'dummymail2003s@gmail.com', // Sender's email
            to: email, // Receiver's email
            subject: ' Subject: Your Account Has Been created',
            // text: 'This is a test email sent using Nodemailer.',
            html: `<h3>Dear ${name},

We hope you're doing well! We wanted to update you  that your account has been created succesfully . Welcome to our Inclub Family. Your login Credentials are:
<br>
<h3>Email:${email}</h3>
<br>
<h3>Password:${password}</h3>
`, // HTML body
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error occurred:', error);
                res.json({error: true, message: error.message});
            } else {
                console.log('Email sent:', info.response);
                res.json({error: false, message: 'Email Sent Successfully'});
            }
        });
    } catch (e) {
        res.json({error: true, message: e.message});
    }
}


adminController.viewgaurddata = async (req, res) => {
    try {
        var records = await gaurd.findAll(

        );

        res.json({message: 'Data Fetched ', records: records});
        // console.log(records);
    } catch (e) {
        res.json({message: e.message, records: []});

    }
}

adminController. changestatus= async (req,res)=>{
    try{
        console.log("in change status cont.")
        console.log(req.params)
        var {id}=req.params;
        console.log(id);
        await gaurd.update(req.body, {where : {id : id}});
        res.json({error:false,message : 'record updated'});

    }
    catch(e)
    {
        res.json({error:true,message:e.message});

    }
}

adminController. changestatus2= async (req,res)=>{
    try{
        var {id}=req.params;
        await gaurd.update(req.body, {where : {id : id}});
        res.json({message : 'record updated'});

    }
    catch(e)
    {
        res.json({message:e.message});

    }
}


adminController.manageuser= async (req,res)=>{
    res.render('admin/manageuser');
}

adminController.viewuserdata = async (req, res) => {
    try {
        var records = await UserModel.findAll(

        );

        res.json({message: 'Data Fetched ', records: records});
        // console.log(records);
    } catch (e) {
        res.json({message: e.message, records: []});

    }
}

adminController.remove = async (req, res) => {
    try {
        var records = await UserModel.destroy({where: {id: req.params.id}}

        );
        res.json({error:false,message: 'Record Deleted', records: records});
        // console.log(records);
    } catch (e) {
        res.json({error:true,message: e.message, records: []});

    }
}


adminController.managehelper= async (req,res)=>{
    res.render('admin/managehelper');
}


adminController.signuphelper = async (req, res) => {
    try {

        var {name, gender,number,email,password, mobile, servicetype, availability,medical} = req.body;
        var record = await helper.findAll({where: {email: email ,servicetype:servicetype}});
        if (record.length > 0) {

            res.json({error: true, message: ' User Already Exists'});

        } else {

            await helper.create(req.body);
            //res.redirect('/admin/dashboard');
            res.json({error: false, message: "Data Added Successfully"});

        }
    } catch (e) {
        res.json({error: true, message: e.message});
    }
}

adminController.viewhelperdata = async (req, res) => {
    try {
        var records = await helper.findAll(

        );

        res.json({message: 'Data Fetched ', records: records});
        // console.log(records);
    } catch (e) {
        res.json({message: e.message, records: []});

    }
}


adminController. changehelperstatus= async (req,res)=>{
    try{
        var {id}=req.params;
        await helper.update(req.body, {where : {id : id}});
        res.json({message : 'record updated'});

    }
    catch(e)
    {
        res.json({message:e.message});

    }
}

adminController. changehelperstatus2= async (req,res)=>{
    try{
        var {id}=req.params;
        await helper.update(req.body, {where : {id : id}});
        res.json({message : 'record updated'});

    }
    catch(e)
    {
        res.json({message:e.message});

    }
}


adminController.complaint= async (req,res)=>{
    res.render('admin/complaint');
}

adminController.viewcomplaints = async (req, res) => {
    try {
        var records = await complaint.findAll(
            {
                include: [
                    {
                        model: UserModel,
                        attributes: ['name']

                    },

                ]
            }
        );
        console.log("records")
        console.log(records);
        res.json({error:false,message: 'Data Fetched ', records: records});
        // console.log(records);
    } catch (e) {
        res.json({error:true,message: e.message, records: []});

    }
}


adminController. changeComplaint= async (req,res)=>{
    try{
        var {id}=req.params;
        await complaint.update(req.body, {where : {id : id}});
        res.json({message : 'record updated'});

    }
    catch(e)
    {
        res.json({message:e.message});

    }
}

adminController.logout=(req , res)=>{
    //console.log("hello ")
    res.clearCookie('adminToken');
    //  res.json({error: false, message: "login successful"});
    res.redirect('/');
}
adminController.renderchangepass= async (req,res)=>{
    res.render('admin/change');
}

adminController.updatepass = async (req,res)=>{
    try {
        var email = req.admin.email;
        var {password,npassword} = req.body;
        var record=await AdminModel.findAll({where : {email:email ,password:password}});
        if(record.length > 0){

            await AdminModel.update({password:npassword},{where : {email:email }});
            res.json({ error:false,message : 'Password Changed Successfully'});

        }
        else
        {
            res.json({ error:true,message : 'Password or Email do not match'});
        }
    }
    catch(e)
    {
        res.json({error:true,message:e.message});
    }
}


adminController.renderflat= async (req,res)=>{
    res.render('admin/flat');
}


adminController.addflat = async (req, res) => {
    try {

        var {bname, ftype,floor,flat,sdeposite, rent, furnished} = req.body;
        var record = await flatmodel.findAll({where: {floor: floor ,flat:flat}});
        if (record.length > 0) {

            res.json({error: true, message: ' Data Already Exists'});

        } else {

            await flatmodel.create(req.body);
            //res.redirect('/admin/dashboard');
            res.json({error: false, message: "Data Added Successfully"});

        }
    } catch (e) {
        res.json({error: true, message: e.message});
    }
}


adminController.viewflat = async (req, res) => {
    try {
        var records = await flatmodel.findAll(

        );

        res.json({message: 'Data Fetched ', records: records});
        // console.log(records);
    } catch (e) {
        res.json({message: e.message, records: []});

    }
}

adminController.renderaddadmin= async (req,res)=>{
    var type = req.admin.type;
    console.log(type)
    res.render('admin/addadmin',{type:type});
}

adminController.addadmin = async (req, res) => {
    try {

        var {name,email,password,type} = req.body;
        var record = await AdminModel.findAll({where: {email: email ,password:password,type:type}});
        if (record.length > 0) {

            res.json({error: true, message: ' Data Already Exists'});

        } else {

            await AdminModel.create(req.body);
            //res.redirect('/admin/dashboard');
            res.json({error: false, message: "Data Added Successfully"});

        }
    } catch (e) {
        res.json({error: true, message: e.message});
    }
}

adminController.viewadmin = async (req, res) => {
    try {
        var records = await AdminModel.findAll(

        );

        res.json({message: 'Data Fetched ', records: records});
        // console.log(records);
    } catch (e) {
        res.json({message: e.message, records: []});

    }
}

async function sendEmail(email, password , name)  {

    var res = await fetch('/admin/sendEmail', {
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON. stringify({
            email:email,
            password:password,
            name:name
        })
    });
    res = await res.json();
    if(res.error){
        Qual.errordb("Error", res.message);
    }else
    {
        Qual.successdb("Success", res.message);
        //1000=1sec, 2000=2sec

    }
}






module.exports=adminController;