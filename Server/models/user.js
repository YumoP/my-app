const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const schema = mongoose.Schema;

const userSchema = new schema({
    username: {
        type: String,
        unique: true,
        min:[4, 'Username must be at longer than 3 characters'],
        max:[15, 'Username must be shorter than 16 characters'],
        required: "Username is required",
    },
    email: {
        type: String,
        min:[],
        max:[],
        unique: true,
        required: "Email is required",
        lowercase: true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password: {
        type: String,
        min:[4,"Password must be at least 4 characters"],
        max:[32, "Password has to be less than 33 characters"],
        required:'password is required'
    },
    date: {
        type: String
    }

});

userSchema.methods.isSamePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

userSchema.pre('save', function(next){
    const user = this;
    bcrypt.genSalt(11, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            next();
        });
    });
})

module.exports = mongoose.model('User', userSchema);