var userController = {};
var db = require('../db.config');
//const error = require("jsonwebtoken/lib/JsonWebTokenError");
var UserModal = db.user;
var helper = db.helper;
var bookhelper = db.bookhelper;
var ccategory = db.ccategory;
var complaint = db.complaint;
var vehical = db.vehical;
var visitor = db.visitor;
var jwt = require('jsonwebtoken');
const {where} = require("sequelize");
let jwt_secret = 'abcd#12345';


/*function verifyUser(req,res,authHeader){
    const token = authHeader.split(' ')[1];

    if (token) {
        try {
            const secret = process.env.JWT_SECRET_KEY;
            let userData = jwt.verify(token, secret); // Verify Token
            res.json({error: false, message: "Authorized", userData: userData});
        } catch (error) {
            res.json({error: true, message: "Unauthorized"});
        }
    } else {
        res.json({error: true, message: "Unauthorized"});
    }
}*/

userController.verifyUserToken = (req, res) => {
    console.log("in verify user--")
    const token = req.headers.authorization.split(" ")[1]
    console.log("Token", token)
    if (token) {
        try {
            let userData = jwt.verify(token, jwt_secret); // Verify Token
            console.log("User Data==")
            console.log(userData)
            res.json({error: false, message: 'Authorized', userData: userData});
        } catch (error) {
            res.json({error: true, message: 'Unauthorized'});
        }
    } else {
        res.json({error: true, message: 'Unauthorized'});
    }

};


userController.rendersignupPage = (req, res) => {
    res.render('user/signup');
}

/*userController.signupuser = async (req,res)=>{

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

}*/


userController.renderloginPage = (req, res) => {
    res.render('user/login');
}
/*userController.loginUser=async (req,res)=>{
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


userController.renderuserdashPage = (req, res) => {
    res.render('user/userdash');
}


userController.renderbookPage = (req, res) => {
    res.render('user/book');
}


userController.viewhelper = async (req, res) => {
    try {
        var records = await helper.findAll({
                where: {
                    servicetype: req.params.servicetype,
                    availability: req.params.servicetype
                }
            }
        );

        res.json({message: 'Data Fetched ', records: records});
        // console.log(records);
    } catch (e) {
        res.json({message: e.message, records: []});

    }
}

userController.fetchhelperbooked = async (req, res) => {
    try {
        var userId = req.user.id;
        // console.log(service)
        var records = await bookhelper.findAll({
            where: {userId: userId},
            include: [
                {
                    model: helper,
                    attributes: ['name', 'gender', 'number', 'adharcard', 'servicetype', 'availability', 'medical', 'status']

                },

            ]
        });

        res.json({error: false, message: 'Data Fetched ', records: records});
    } catch (e) {
        res.json({message: e.message, records: []});

    }
}

userController.fetchhelperdata = async (req, res) => {
    try {
        console.log(req.params)
        var service = req.params.service;
        console.log(service)
        var records = await helper.findAll({where: {servicetype: service, status: "Approved"}});
        // console.log(records);
        res.json({message: 'Data Fetched ', records: records});
    } catch (e) {
        res.json({message: e.message, records: []});

    }
}

userController.booknow = async (req, res) => {
    try {
        console.log("________")
        console.log(req.user)
        let userId = req.user.id;
        var {helperId, date, instructions} = req.body;
        req.body.userId = userId;
        var record = await bookhelper.findAll({where: {helperId: helperId, date: date}});
        console.log("record====")
        console.log(record)
        if (record.length > 0) {
            res.json({error: true, message: ' helper is occupied at this date'});
        } else {

            await bookhelper.create(req.body);
            //res.redirect('/admin/dashboard');
            res.json({error: false, message: "Helper booked"});

        }
    } catch (e) {
        res.json({error: true, message: e.message});
    }


}


userController.rendervehicalPage = (req, res) => {
    res.render('user/vehical');
}

userController.regsvehical = async (req, res) => {

    var userId = req.user.id;
    console.log(userId)

    var {email, oname, type, vnumber} = req.body;
    req.body.userId = userId;
    var {rc} = req.files;
    var server_path = `public/user/${rc.name}`;
    var db_path = `/user/${rc.name}`;
    // console.log(req.body);
    rc.mv(server_path, async (error) => {
        if (error) {
            res.json({error: true, message: error.message});
        } else {
            try {
                req.body.rc = db_path;
                await vehical.create(req.body);
                res.json({error:false,message: 'Vehicle Added Successfully'});

            } catch (e) {
                res.json({error: true, message: e.message});
            }
        }

    });

}


userController.rendercomplaintPage = (req, res) => {
    res.render('user/complaint');
}

userController.fetchcategories = async (req, res) => {
    try {
        var records = await ccategory.findAll();
        res.json({message: 'Data Fetched ', records: records});
    } catch (e) {
        res.json({message: e.message, records: []});

    }
}


userController.regscomplaint = async (req, res) => {


    try {

        var userId = req.user.id;
        console.log(userId)

        var {email, type, description, date, suggestion} = req.body;
        req.body.userId = userId;
        await complaint.create(req.body);
        res.json({message: 'Added Successfully'});

    } catch (e) {
        res.json({error: true, message: e.message});
    }


}

userController.renderamenitiesPage = (req, res) => {
    res.render('user/amenities');
}

userController.rendervisitorsPage = (req, res) => {
    res.render('user/visitors');
}

userController.regsvisitor = async (req, res) => {
    try {
        console.log("In reg visitor")
        var userId = req.user.id;
        console.log(userId)

        var {name, email, mobile, floor, flat, parking, date} = req.body;
        req.body.userId = userId;

        console.log(req.body);
        var records = await UserModal.findAll({where: {id: userId, floor: floor, flat: flat}})
        if (records.length > 0) {

            await visitor.create(req.body);
            res.json({error:false,message: ' Visitor added Successfully'});

        } else {
            res.json({error: true, message: "Resident Not Registered"});
        }

    } catch (e) {
        res.json({error: true, message: e.message});
    }


}

userController.logout = (req, res) => {
    //console.log("hello ")
    res.clearCookie('userToken');
    //  res.json({error: false, message: "login successful"});
    res.json({error: false, message: 'Logged Out'});
}


userController.renderchangepass = async (req, res) => {
    res.render('user/changepassword');
}

userController.updatepass = async (req, res) => {
    try {
        var email = req.user.email;

        var {password, npassword} = req.body;
        var record = await UserModal.findAll({where: {email: email, password: password}});
        if (record.length > 0) {

            await UserModal.update({password: npassword}, {where: {email: email}});
            res.json({error: false, message: 'Password Changed Successfully'});

        } else {
            res.json({error: true, message: 'Password or Email do not match'});
        }
    } catch (e) {
        res.json({error: true, message: e.message});
    }
}


userController.renderaboustus = async (req, res) => {
    res.render('user/aboutus');
}


userController.rendercontactus = async (req, res) => {
    res.render('user/contactus');
}


userController.fetchvehical = async (req, res) => {
    try {
        var userId = req.user.id;
        // console.log(service)
        var records = await vehical.findAll({where: {userId: userId}});
        // console.log(records);
        res.json({error:false,message: 'Data Fetched ', records: records});
    } catch (e) {
        res.json({error:true,message: e.message, records: []});

    }
}


userController.fetchcomplaint = async (req, res) => {
    try {
        var userId = req.user.id;
        // console.log(service)
        var records = await complaint.findAll({
            where: {userId: userId},

        });

        // console.log(records);
        res.json({message: 'Data Fetched ', records: records});
    } catch (e) {
        res.json({message: e.message, records: []});

    }
}
userController.viewBookings = async (req, res) => {
    try {
        var userId = req.user.id;
        // console.log(service)
        var records = await bookhelper.findAll({
            where: {userId: userId},
            include: [
                {
                    model: helper,
                    attributes: ['name', 'gender', 'number', 'adharcard', 'servicetype', 'availability', 'medical', 'status']

                },

            ]
        });
        // console.log(records);
        res.json({message: 'Data Fetched ', records: records});
    } catch (e) {
        res.json({message: e.message, records: []});

    }
}


module.exports = userController;