var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
// var jwt_secret = 'abcd#1234';
var jwt_secret = 'abcd#12345';
var userController = require('../controllers/userController');
const adminController = require("../controllers/adminController");
const indexController = require("../controllers/indexController");


function Authorize_user(req, res, next) {
    // var token = req.cookies.userToken;
    const token = req.headers.authorization.split(" ")[1]
    if (!token) {
        res.redirect('/user/login');
    } else {
        try {
            req.user = jwt.verify(token, jwt_secret);
            next();

        } catch (e) {
            res.redirect('/user/login');
        }
    }
}

function Authorize_user_HTTP(req, res, next) {
    const authHeader = req.headers.authorization;
    // console.log("auth header=", authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({error: true, message: "Unauthorized: No token provided"});
    }

    const token = authHeader.split(" ")[1];
    console.log(token)

    try {
        req.user = jwt.verify(token, jwt_secret);
        console.log("req.user");
        console.log(req.user)
        next();
    } catch (e) {
        console.error("JWT verification error:", e);
        return res.status(401).json({error: true, message: "Unauthorized: Invalid token"});
    }
}

router.get('/verify-user-token', userController.verifyUserToken)

//
// router.get('/signup', userController.rendersignupPage)
// router.post('/signupuser', userController.signupuser);

router.get('/login', userController.renderloginPage)
// router.post('/login', userController.loginUser);

router.get('/userdash', userController.renderuserdashPage)
router.get('/book', userController.renderbookPage)
router.post('/viewhelper', userController.viewhelper);
router.get('/fetchhelperbooked', Authorize_user, userController.fetchhelperbooked)
router.get('/fetchhelperdata/:service', userController.fetchhelperdata)
router.post('/booknow', Authorize_user_HTTP, userController.booknow);

router.get('/vehicle', userController.rendervehicalPage)
router.post('/regsvehical', Authorize_user_HTTP, userController.regsvehical);
router.get('/fetchvehical', Authorize_user, userController.fetchvehical)

router.get('/complaint', userController.rendercomplaintPage);
router.get('/fetchcategory', userController.fetchcategories);
router.post('/regscomplaint', Authorize_user, userController.regscomplaint);
router.get('/fetchcomplaint', Authorize_user, userController.fetchcomplaint)

router.get('/amenities', userController.renderamenitiesPage);
router.get('/visitors', userController.rendervisitorsPage);
router.post('/regsvisitor', Authorize_user_HTTP, userController.regsvisitor);

router.get('/changepassword', userController.renderchangepass);
router.put('/update', Authorize_user, userController.updatepass);

router.get('/aboutus', userController.renderaboustus);
router.get('/contactus', userController.rendercontactus);


router.get('/logout', Authorize_user, userController.logout)

module.exports = router;