require('dotenv').config();
const userLib = require("./backend/lib/userLib");
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/resume', function(req, res) {
    res.sendFile(__dirname + '/resume.html');
});

app.get('/card', function(req, res) {
    res.sendFile(__dirname + '/card.html');
});

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {}, function(err) {
    if (err) {
        console.error(err);
    } else {
        console.log('Connected to database');
        // TODO : donot create a user if atleast 1 user exist in the table - Done 
        // Get all users
        userLib.getAllUsers(function(err, usersList) {
            if (err) {
                console.error(err);
            } else {
                if (usersList.length === 0) {
                    userLib.createFirstUser(function(err, res) {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log(res);
                        }
                    });
                }
                console.log("Users found:");
                console.log(usersList);
            }
        });

        // Create a user
        var user1 = {
            userName: "kiran99",
            yearOfGraduation: 2025,
        };

        var user2 = {
            userName: "testUser",
            yearOfGraduation: 2024,
        };

        // userLib.createUser(user1, function(err, res) {
        //     if (err) {
        //         console.error(err);
        //     } else {
        //         console.log("User created:");
        //         console.log(res);
        //     }
        // });

        // userLib.createUser(user2, function(err, res) {
        //     if (err) {
        //         console.error(err);
        //     } else {
        //         console.log("User created:");
        //         console.log(res);
        //     }
        // });

        //  Get user by userName

        // userLib.getUserByUserName("harshavb08", function(err, res) {
        //     if (err) {
        //         console.error(err);
        //     } else {
        //         console.log("User found by userName:");
        //         console.log(res);
        //     }
        // });

        // Update user by userName

        var newValues = {
            $set: {
                yearOfGraduation: 2026,
            }
        };

        // userLib.updateUserByUserName("harshavb08", newValues, function(err, res) {
        //     if (err) {
        //         console.error(err);
        //     } else {
        //         console.log("User updated by userName:");
        //         console.log(res);
        //     }
        // });

        //delete user by userName

        // userLib.deleteUserByUserName("testUser", function(err, res) {
        //     if (err) {
        //         console.error(err);
        //     } else {
        //         console.log("User deleted by userName:");
        //         console.log(res);
        //     }
        // });


        app.listen(port, function() {
            console.log('Server started on port ' + port);
        });
    }
});