const mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    provider: String,
    providerId: String,
    token: String,
    providerPic: String,
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
})

UserSchema.methods.follow = function (userId) {
    if (this.following.indexOf(userId) === -1) {
        this.following.push(userId)
    }
    return this.save()
}

UserSchema.methods.addFollower = function (f) {
    this.followers.push(f)
}

module.exports = mongoose.model('User', UserSchema)