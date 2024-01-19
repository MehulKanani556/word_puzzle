var adminmodel = require('../model/adminmodel');
var usermodel = require('../model/usermodel');
var catmodel = require('../model/catmodel');
var subcatmodel = require('../model/subcatmodel')

const storage = require('node-persist');


////////////////////////////////////////////////////
// For Admin Side Register ..................
////////////////////////////////////////////////////

exports.ad_register = async (req, res) => {

    var email = req.body.email;

    var register_admin = await adminmodel.findOne({ email: email });

    if (register_admin) {
        res.status(200).json({
            status: "success",
            msg: "Admin already register"
        });
    }
    else {
        var data = await adminmodel.create(req.body);

        res.status(200).json({
            status: "success",
            data
        });
    }
}

//  For Admin Side Get Data .....................

exports.ad_select = async (req, res) => {

    var data = await adminmodel.find();

    res.status(200).json({
        status: "success",
        data
    })
}
//  For Admin Side Login Data .....................

exports.ad_login = async (req, res) => {

    var email = req.body.email;
    var data = await adminmodel.find({ email: email });

    await storage.init();
    var user_id = await storage.getItem('user_id');

    if (user_id == undefined) {

        if (data.length > 0) {

            if (data[0].password == req.body.password) {

                await storage.init();
                await storage.setItem('user_id', data[0].id)

                res.status(200).json({
                    status: "successfuly logged In",
                    data
                });

            }
            else {
                res.status(200).json({
                    status: "success",
                    msg: "check your email & password"
                })
            }
        }
    }
    else {
        res.status(400).json({
            status: "Admin alredy login",
        })

    }

}

// View User ..................................

exports.view_user = async (req, res) => {

    var data = await usermodel.find();

    res.status(200).json({
        status: "success",
        data
    });
}


///////////////////////////////////////////////
// For User Side Login  ............
//////////////////////////////////////////////

exports.us_register = async (req, res) => {

    var email = req.body.email;

    var register_user = await usermodel.findOne({ email: email });

    if (register_user) {
        res.status(200).json({
            status: "success",
            msg: "user already register"
        });
    }
    else {
        var data = await usermodel.create(req.body);

        res.status(200).json({
            status: "success",
            data
        });
    }
}

//  For User Side Get Data .....................

exports.us_select = async (req, res) => {

    var data = await usermodel.find();

    res.status(200).json({
        status: "success",
        data
    });
}

//  For User Side Login Data .....................

exports.us_login = async (req, res) => {

    var email = req.body.email;
    var data = await usermodel.find({ email: email });

    await storage.init();
    var user_id = await storage.getItem('use_id');

    if (user_id == undefined) {

        if (data.length > 0) {

            if (data[0].password == req.body.password) {

                await storage.init();
                await storage.setItem('use_id', data[0].id)

                res.status(200).json({
                    status: "successfuly logged In",
                    data
                });

            }
            else {
                res.status(200).json({
                    status: "success",
                    msg: "check your email & password"
                })
            }
        }
    }
    else {
        res.status(400).json({
            status: "user alredy login",
        })

    }
}

// USer View category ..........................

exports.View_cat = async (req, res) => {

    var data = await catmodel.find();

    res.status(200).json({
        status: "success",
        data
    })
}
// show win puzzle data
exports.winpuzzle = async (req, res) => {

    var data = await subcatmodel.find({ win_id: { $exists: true, $ne: null } }, { _id: 0 });

    res.status(200).json({
        status: "success",
        data
    })
}


///////////////////////////////////////////////
// For category  ............
//////////////////////////////////////////////

exports.insert = async (req, res) => {

    email = req.body.email;

    var ademail = await adminmodel.findOne({ email: email });

    if (ademail) {

        var data = await catmodel.create(req.body);

        res.status(200).json({
            status: "success",
            data
        })
    }
    else {
        res.status(200).json({
            status: "You Can Not authorise to add category",

        })

    }
}

exports.select = async (req, res) => {

    var data = await catmodel.find();

    res.status(200).json({
        status: "success",
        data
    })
}
exports.delete = async (req, res) => {

    var id = req.params.id;

    var data = await catmodel.findByIdAndDelete(id);

    res.status(200).json({
        status: "Data Deleted Successfuly",

    })
}
exports.update = async (req, res) => {

    var id = req.params.id;

    var data = await catmodel.findByIdAndUpdate(id, req.body);

    res.status(200).json({
        status: "Data Updated Successfuly",

    })
}

exports.single_cat = async (req, res) => {

    var id = req.params.id;
    var data = await subcatmodel.find({ cat_id: id });

    res.status(200).json({
        status: "Single Category data",
        data

    });
}

exports.single_puzzle = async (req, res) => {

    var id = req.params.id;
    var data = await subcatmodel.findById(id);

    res.status(200).json({
        status: "Single Category puzzle selected",
        data

    });
}

exports.userWin = async (req, res) => {

    var ans = req.body.ans;
    var id = req.params.id;
    var data = await subcatmodel.findById(id);
    await storage.init();
    var user_id = await storage.getItem('use_id');

    if (data.sub_catname == ans) {

        var data2 = await subcatmodel.findByIdAndUpdate({ id,win_id:user_id });
        res.status(200).json({
            status: "You win ",
            data2
        })
    }
    else {
        res.status(200).json({
            status: "You Loose "
        })
    }
}

///////////////////////////////////////////////
// For Sub category  ............
//////////////////////////////////////////////


exports.sub_insert = async (req, res) => {
    try {
        var char = "abcdefghijklmnopqrstuvwxyz";
        var data = await subcatmodel.create(req.body);

        console.log('Data:', data);
        var shuffledString = "";

        // Function to shuffle a string
        function shuffleString(str) {
            var shuffled = str.split('').sort(function () {
                return 0.5 - Math.random();
            }).join('');
            return shuffled;
        }

        var subcategoryName = data.sub_catname; // Assuming 'sub_catname' is the field containing the subcategory name

        // Generating random characters for the string
        for (var i = 0; i < 16 - subcategoryName.length; i++) {
            var randomIndex = Math.floor(Math.random() * char.length);
            shuffledString += char[randomIndex];
        }

        // Shuffle the subcategory name
        var shuffledSubcategories = shuffleString(subcategoryName);

        // Randomly insert shuffled subcategory characters into shuffledString
        for (var j = 0; j < shuffledSubcategories.length; j++) {

            var insertPosition = Math.floor(Math.random() * shuffledString.length);

            shuffledString = shuffledString.slice(0, insertPosition) + shuffledSubcategories[j] + shuffledString.slice(insertPosition);
        }

        // Update the database with the shuffled string
        var data1 = await subcatmodel.updateMany({ _id: data._id }, { sufflestring: shuffledString });

        res.status(200).json({
            status: "success",
            data,
            shuffledString // Optionally send the generated shuffled string in the response
        });

    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
}

exports.sub_select = async (req, res) => {

    var data = await subcatmodel.find().populate('cat_id');

    res.status(200).json({
        status: "success",
        data
    });
}


exports.sub_delete = async (req, res) => {

    var id = req.params.id;

    var data = await subcatmodel.findByIdAndDelete(id);

    res.status(200).json({
        status: "Data Deleted Successfuly",

    })
}
exports.sub_update = async (req, res) => {

    var id = req.params.id;

    var data = await subcatmodel.findByIdAndUpdate(id, req.body);

    res.status(200).json({
        status: "Data Updated Successfuly",

    });
}




