const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    image: "string"
})

const UserModel = mongoose.model("user", UserSchema)

module.exports = UserModel