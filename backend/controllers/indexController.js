var indexController ={};
var db=require('../db.config');
const userController = require("./userController");
var jwt = require('jsonwebtoken');
const {where} = require("sequelize");
var jwt_secret = 'abcd#12345';
var admin_jwt_secret = 'abcd#123';
var gaurd_jwt_secret = 'abcd#12';
//var productsdata =db.productsdata;
var gaurd = db.gaurd;
var visitor = db.visitor;
var UserModal = db.user;
var vehical = db.vehical;
var AdminModel = db.admin;

function Authorize_User(req,res,next) {
    var token = req.cookies.gaurdToken;
    if(!token){
        res.redirect('/logingaurd');
    }else{
        try{
            req.gaurd =jwt.verify(token,jwt_secret);
            next();

        }catch(e){
            res.json({error:true,message:e.message });
        }
    }
}


indexController.renderindexPage= async (req,res)=>{
    res.render('index');
}


indexController.renderaboutusPage= async (req,res)=>{
    res.render('aboutus');
}


indexController.rendercontactPage= async (req,res)=>{
    res.render('gaurd/contact');
}

indexController.renderaboutPage= async (req,res)=>{
    res.render('gaurd/about');
}


indexController.rendercontactusPage= async (req,res)=>{
    res.render('contactus');
}


indexController.rendergaurdloginPage= async (req,res)=>{
    res.render('gaurd/login');
}

indexController.logingaurd=async (req,res)=>{
    try {
        var {email, password} = req.body;
        var result = await gaurd.findAll({where: {email: email, password: password}});
        if (result.length > 0) {
            //var result=await UserModal.findAll({where:{email:email ,password:password}});
            // if(status="Block")
            // {
            //     res.json({error: true, message: "Login failed Contact Admin"});
            // }
            // else
            {


                var payload = {
                    id: result[0].id,
                    name: result[0].name,
                    email: result[0].email
                };
                var token = jwt.sign(payload, gaurd_jwt_secret, {expiresIn: '1h'});
                res.cookie('gaurdToken', token);

                res.json({error: false, message: "Login successful",token});
            }

        } else {
            res.json({error: true, message: "Login failed"});
        }

    }
    catch(e)
    {
        res.json({error:true,message:e.message});
    }
}



indexController.renderdashboardPage= async (req,res)=>{
    res.render('gaurd/dashboard');
}


indexController.rendervmanagementPage= async (req,res)=>{
    res.render('gaurd/vmanagement');
}


indexController.visitordata =async(req,res)=>{
    try{
        var records = await visitor.findAll(
            {

                include:  [
                    {
                        model:UserModal,
                        attributes:['name']

                    }
                ]

            });
        // console.log(records);
        res.json({message : 'Data Fetched ', records: records});

    }catch(e)
    {
        res.json({message:e.message , records:[]});

    }
}

indexController. changestatus= async (req,res)=>{
    try{
        var {id}=req.params;
        await visitor.update(req.body, {where : {id : id}});
        res.json({message : 'record updated'});

    }
    catch(e)
    {
        res.json({message:e.message});

    }
}

indexController.rendervehicalPage= async (req,res)=>{
    res.render('gaurd/vehical');
}


indexController.vehicaldata =async(req,res)=>{
    try{
        var records = await vehical.findAll(
            {

                include:  [
                    {
                        model:UserModal,
                        attributes:['name']

                    }
                ]

            });
        // console.log(records);
        res.json({error:false,message : 'Data Fetched ', records: records});

    }catch(e)
    {
        res.json({error:true,message:e.message , records:[]});

    }
}

indexController. changestatus2= async (req,res)=>{
    try{
        var {id}=req.params;
        await vehical.update(req.body, {where : {id : id}});
        res.json({message : 'record updated'});

    }
    catch(e)
    {
        res.json({message:e.message});

    }
}

indexController.renderchangepass= async (req,res)=>{
    res.render('gaurd/changepass');
}



indexController.logout=(req , res)=>{
    //console.log("hello ")
    res.clearCookie('gaurdToken');
    //  res.json({error: false, message: "login successful"});
    res.redirect('/');
}
indexController.updatepass = async (req,res)=>{
    try {
        console.log("update pass---")
        var email = req.gaurd.email;
        var {password,npassword} = req.body;
        console.log(email,password,npassword);
        var record=await gaurd.findAll({where : {email:email ,password:password}});
        if(record.length > 0){

            await gaurd.update({password:npassword},{where : {email:email }});
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

/*indexController.loginUser=async (req,res)=>{
    try {
        var {email, password} = req.body;
        var result = await UserModal.findAll({where: {email: email, password: password}});
        if (result.length > 0) {
            //var result=await UserModal.findAll({where:{email:email ,password:password}});
            var payload = {
                id: result[0].id,
                name: result[0].name,
                email: result[0].email
            };
            var token = jwt.sign(payload, jwt_secret, {expiresIn: '1h'});
            res.cookie('userToken', token);
            console.log("========")
            console.log(token);
            res.json({error: false, message: "Login successful"});

        } else {
            res.json({error: true, message: "Login failed"});
        }

    }
    catch(e)
    {
        res.json({error:true,message:e.message});
    }
}*/

indexController.loginUser = async (req, res) => {
    try {
        var { email, password } = req.body;
        var result = await UserModal.findAll({ where: { email, password } });

        if (result.length > 0) {
            var payload = {
                id: result[0].id,
                name: result[0].name,
                email: result[0].email
            };

            var token = jwt.sign(payload, jwt_secret, { expiresIn: '1d' });
            console.log("token")
            console.log(token)
            res.cookie('userToken', token);
            // console.log("========");
            // console.log(token);

            res.json({ error: false, message: "Login successful", token }); // ✅ include token
        } else {
            res.json({ error: true, message: "Login failed" });
        }

    } catch (e) {
        res.json({ error: true, message: e.message });
    }
};


indexController.signupUser = async (req,res)=>{
    console.log(req.body);
    console.log(req.files)
    var{name,email,mobile,password,floor,flat,members,date}=req.body;
    var {photo}=req.files;
    var server_path =`public/user/${photo.name}`;
    var db_path =`/user/${photo.name}`;
    console.log(req.body);
    photo.mv(server_path, async(error)=>{
        if(error){
            res.json({error:true ,message:error.message});
        }else{
            try{
                req.body.photo = db_path;
                await UserModal.create(req.body);
                res.json({message : 'Added Successfully'});

            }catch (e)
            {
                res.json({error:true,message:e.message});
            }
        }

    });

}

indexController.loginAdmin=async (req,res)=>{
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
            var token = jwt.sign(payload, admin_jwt_secret, {expiresIn: '1h'});
            console.log("token===")
            console.log(token)
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
}

indexController.verifyToken = (req, res) => {
    console.log("in verify gaurd--")
    const token = req.headers.authorization.split(" ")[1]
    console.log("Token", token)
    if (token) {
        try {
            let gaurdData = jwt.verify(token, gaurd_jwt_secret); // Verify Token
            console.log("Gaurd Data==")
            console.log(gaurdData)
            res.json({error: false, message: 'Authorized', userData: gaurdData});
        } catch (error) {
            res.json({error: true, message: 'Unauthorized'});
        }
    } else {
        res.json({error: true, message: 'Unauthorized'});
    }

};

module.exports=indexController;