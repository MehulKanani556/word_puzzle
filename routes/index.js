var express = require('express');
var router = express.Router();

var user = require('../controller/usercontroller');

/* GET home page. */

//  For Admin ..................

router.get('/ad', user.ad_select);
router.post('/adminregister', user.ad_register);
router.post('/adminlogin', user.ad_login);
router.get('/viewuser', user.view_user);
router.get('/winpuzzle',user.winpuzzle);

//  For User ...................

router.get('/us', user.us_select);
router.post('/userregister', user.us_register);
router.post('/userlogin', user.us_login);
router.get('/viewcat', user.View_cat);
router.get('/singlecat/:id', user.single_cat);
router.get('/singlepuzzle/:id', user.single_puzzle);

// For Category ................
router.get('/cat',user.select);
router.post('/insert',user.insert);
router.post('/update/:id',user.update);
router.get('/delete/:id',user.delete);

// For subCategory ................
router.get('/subcat',user.sub_select);
router.post('/subinsert',user.sub_insert);
router.post('/subupdate/:id',user.sub_update);
router.get('/subdelete/:id',user.sub_delete);
router.post('/win/:id',user.userWin);


module.exports = router;
