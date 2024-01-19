var mongoose = require('mongoose');

var catschema = new mongoose.Schema({

    cat_name: {
        type: String
    },
    email: {
        type: String
    }

});

module.exports = mongoose.model('category', catschema);