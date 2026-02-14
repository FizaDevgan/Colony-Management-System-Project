var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var jwt_secret = 'abcd#123';


//var connection = require('../connection');
var adminController = require('../controllers/adminController');
const userController = require("../controllers/userController");
const indexController = require("../controllers/indexController");

router.use(express.urlencoded({extended: true}));
router.use(express.json());



function Authorize_admin(req,res,next) {
    const token = req.headers.authorization.split(" ")[1]
    // const token = req.headers
    console.log("in admin===")
    console.log("Token", token)

    if(!token){
        res.redirect('/admin/login');
    }else{
        try{
            req.admin =jwt.verify(token,jwt_secret);
            next();

        }catch(e){
            res.redirect('/admin/login');
        }
    }
}
function Authorize_admin_HTTP(req,res,next) {
    console.log(req.headers.authorization)
    const token = req.headers.authorization.split(" ")[1]
    console.log("Token", token)
    console.log("In authorize admin http===")
    console.log(token);
    if(!token){
        res.json({error:true,message:"ERROR"});
    }else{
        try{
            req.admin =jwt.verify(token,jwt_secret);
            next();

        }catch(e){
            res.json({error:true,message:"ERROR"});
        }
    }
}
// router.get('/dashboard', Authorize_admin,adminController.renderDashboardPage);

router.get('/adminlogin', adminController.renderadminloginPage);
// router.post('/loginadmin', adminController.loginadmin);
router.get('/verify-token', adminController.verifyToken)

router.get('/admindashboard', adminController.admindashboard);

router.get('/managegaurd', adminController.managegaurd);
router.post('/signupgaurd', adminController.signupgaurd);
router.post("/sendEmail" , adminController.sendEmail);
router.get('/viewgaurddata', adminController.viewgaurddata);
router.put("/changestatus/:id",adminController.changestatus);
router.put("/changestatus2/:id",adminController.changestatus2);

router.get('/manageuser', adminController.manageuser);
router.get('/viewuserdata', adminController.viewuserdata);
router.get("/remove/:id",adminController.remove);

router.get('/managehelper', adminController.managehelper);
router.post('/signuphelper', adminController.signuphelper);
router.get('/viewhelperdata', adminController.viewhelperdata);
router.put("/changehelperstatus/:id",adminController.changehelperstatus);
router.put("/changehelperstatus2/:id",adminController.changehelperstatus2);

router.get('/complaint', adminController.complaint);
router.get('/viewcomplaints', adminController.viewcomplaints);
router.put("/changecomplaint/:id",adminController.changeComplaint);

router.get('/flat', adminController.renderflat);
router.post('/addflat', adminController.addflat);
router.get('/viewflat', adminController.viewflat);

router.get('/change', adminController.renderchangepass);
router.put('/update',Authorize_admin, adminController.updatepass);

router.get('/addadmin',Authorize_admin_HTTP, adminController.renderaddadmin);
router.post('/addadmin', adminController.addadmin);
router.get('/viewadmin', adminController.viewadmin);


router.get('/logout',Authorize_admin, adminController.logout)

//project



module.exports=router;