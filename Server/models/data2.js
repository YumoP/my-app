const mongoose = require('mongoose');
const schema = mongoose.Schema;

const dataSchema = new schema({
    costcode: {
        type: String,
        unique: true,
        required: "costcode is required"
    },
    name: {
        type: String,
        required: "name is required"
    }
});


module.exports = mongoose.model('Data2', dataSchema);