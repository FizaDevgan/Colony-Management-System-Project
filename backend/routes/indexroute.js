var express = require('express');
const indexController = require("../controllers/indexController");
const userController = require("../controllers/userController");
const jwt = require("jsonwebtoken");
const adminController = require("../controllers/adminController");
var gaurd_jwt_secret = 'abcd#12';
var jwt_secret = 'abcd#12345';
var router = express.Router();




function Authorize_gaurd(req,res,next) {
    var token = req.headers.authorization.split(" ")[1]
    if(!token){
        res.json({error:true,message:"ERROR"});
    }else{
        try{
            req.gaurd =jwt.verify(token,gaurd_jwt_secret);
            next();

        }catch(e){
            // res.redirect('/logingaurd');
            res.json({error:true,message:"Unauthorized access"});

        }
    }
}
function Authorize_gaurd_HTTP(req,res,next) {

    var token = req.headers.authorization.split(" ")[1]
    console.log("request===")
    console.log(token)
    if(!token){
        res.json({error:true,message:"ERROR"});
    }else{
        try{
            req.gaurd =jwt.verify(token,gaurd_jwt_secret);
            next();

        }catch(e){
            res.json({error:true,message:"ERROR"});
        }
    }
}






router.get('/', indexController.renderindexPage);
router.post('/user-login', indexController.loginUser);
router.post('/user-signup', indexController.signupUser);


router.get('/aboutus', indexController.renderaboutusPage);
router.get('/contactus', indexController.rendercontactusPage);



router.get('/about', indexController.renderaboutPage);
router.get('/contact', indexController.rendercontactPage);


router.get('/logingaurd', indexController.rendergaurdloginPage);
router.post('/logingaurd', indexController.logingaurd);

router.get('/dashboard', indexController.renderdashboardPage);

router.get('/vmanagement', indexController.rendervmanagementPage);
router.get('/visitordata', indexController.visitordata);
router.put("/changestatus/:id",indexController.changestatus);

router.get('/vehical', indexController.rendervehicalPage);
router.get('/vehicaldata', indexController.vehicaldata);
router.put("/changestatus2/:id",indexController.changestatus2);

router.get('/changepass', indexController.renderchangepass);

router.get('/logout',Authorize_gaurd, indexController.logout)
// Admin
router.post('/admin-login', indexController.loginAdmin);

// Gaurd Routes
router.get('/verify-token', indexController.verifyToken)
router.put('/update',Authorize_gaurd_HTTP, indexController.updatepass);


module.exports=router;