var mongoose = require('mongoose');

var subcatschema = new mongoose.Schema({

    sub_catname :{
        type :String
    },
    cat_id :{
        type: mongoose.Schema.Types.ObjectId,
        ref :"category"
    },
    sufflestring:{
        type:String
    },
    win_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
   
});

module.exports = mongoose.model('sub_cat',subcatschema);
