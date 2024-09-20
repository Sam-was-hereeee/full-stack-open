const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {type: String, required: true, unique: [true, "duplicate username"]},
    name: {type: String, required: true},
    passwordHash: {type: String, required: true},
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    }]
})

userSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.passwordHash;
        delete ret.__v;
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User