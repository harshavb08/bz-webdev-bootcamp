const userModel = require("../models/userModel");

// CREATE

// creates first user
module.exports.createFirstUser = async function(callback) {
    try {
        var user = {
            userName: "harshavb08",
            yearOfGraduation: 2024,
        };
        var newUser = new userModel(user);
        var result = await newUser.save();
        callback(null, result);
    } catch (err) {
        callback(err, null);
    }
}

// create a user
module.exports.createUser = async function(user, callback) {
    try {
        var newUser = new userModel(user);
        var result = await newUser.save();
        callback(null, result);
    } catch (err) {
        callback(err, null);
    }
}

// READ

// get all users
module.exports.getAllUsers = async function(callback) {
    try {
        var users = await userModel.find({});
        callback(null, users);
    } catch (err) {
        callback(err, null);
    }
}

// get user by userName
module.exports.getUserByUserName = async function(userName, callback) {
    try {
        var query = { userName: userName };
        var user = await userModel.find(query);
        callback(null, user);
    } catch (err) {
        callback(err, null);
    }
}

// UPDATE

// update values by userName
module.exports.updateUserByUserName = async function(userName, newValues, callback) {
    try {
        var query = { userName: userName };
        var updatedUser = await userModel.findOneAndUpdate(query, newValues, { new: true });
        callback(null, updatedUser);
    } catch (err) {
        callback(err, null);
    }
}

// DELETE   

// delete user by userName

module.exports.deleteUserByUserName = async function(userName, callback) {
    try {
        var query = { userName: userName };
        var deletedUser = await userModel.findOneAndDelete(query);
        callback(null, deletedUser);
    } catch (err) {
        callback(err, null);
    }
}