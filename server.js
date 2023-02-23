require('dotenv').config();
const userLib = require("./backend/lib/userLib");
const songsLib = require("./backend/lib/songsLib");
const todoLib = require("./backend/lib/todoLib");
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const todoModel = require('./backend/models/todoModel');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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

app.get('/musicPlayer', function(req, res) {
    res.sendFile(__dirname + '/musicPlayer.html');
});

app.get('/weatherApp', function(req, res) {
    res.sendFile(__dirname + '/weatherApp.html');
});

app.get('/todo', function(req, res) {
    res.sendFile(__dirname + '/todo.html');
});

app.get("/api/todos", function(req, res) {
    todoLib.getAllTodos(function(err, todos) {
        if (err) {
            res.json({
                status: "error",
                message: err,
                data: null
            });
        } else {
            res.json({
                status: "success",
                message: "Todos retrieved successfully",
                data: todos
            });
        }
    })
});

app.post("/api/todos", function(req, res) {
    const todo = req.body;
    todoLib.createTodo(todo, function(err, result) {
        if (err) {
            res.json({
                status: "error",
                message: err,
                data: null
            });
        } else {
            res.json({
                status: "success",
                message: "Todo created successfully",
                data: result
            });
        }
    })
});

app.put("/api/todos/:id", function(req, res) {
    const id = req.params.id;
    const data = req.body;
    todoLib.updateTodoById(id, data, function(err, result) {
        if (err) {
            res.json({
                status: "error",
                message: err,
                data: null
            });
        } else {
            res.json({
                status: "success",
                message: "Todo updated successfully",
                data: result
            });
        }
    })
});


app.delete("/api/todos/:id", function(req, res) {
    const id = req.params.id;
    todoLib.deleteTodoById(id, function(err, result) {
        if (err) {
            res.json({
                status: "error",
                message: err,
                data: null
            });
        } else {
            res.json({
                status: "success",
                message: "Todo deleted successfully",
                data: result
            });
        }
    })
});

app.get("/api/todos/completed", function(req, res) {
    todoLib.getAllCompletedTodos(function(err, todos) {
        if (err) {
            res.json({
                status: "error",
                message: err,
                data: null
            });
        } else {
            res.json({
                status: "success",
                message: "Deleted Todos retrieved successfully",
                data: todos
            });
        }
    })
});

app.get("/api/todos/deleted", function(req, res) {
    todoLib.getAllDeletedTodos(function(err, todos) {
        if (err) {
            res.json({
                status: "error",
                message: err,
                data: null
            });
        } else {
            res.json({
                status: "success",
                message: "Deleted Todos retrieved successfully",
                data: todos
            });
        }
    })
});




app.use('/songsApi', songsLib)


mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {}, function(err) {
    if (err) {
        console.error(err);
    } else {
        console.log('Connected to database');
        // TODO : donot create a user if atleast 1 user exist in the table - Done 
        // Get all users
        // userLib.getAllUsers(function(err, usersList) {
        //     if (err) {
        //         console.error(err);
        //     } else {
        //         if (usersList.length === 0) {
        //             userLib.createFirstUser(function(err, res) {
        //                 if (err) {
        //                     console.error(err);
        //                 } else {
        //                     console.log(res);
        //                 }
        //             });
        //         }
        //         console.log("Users found:");
        //         console.log(usersList);
        //     }
        // });

        // Create a user
        // var user1 = {
        //     userName: "kiran99",
        //     yearOfGraduation: 2025,
        // };

        // var user2 = {
        //     userName: "testUser",
        //     yearOfGraduation: 2024,
        // };

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

        // var newValues = {
        //     $set: {
        //         yearOfGraduation: 2026,
        //     }
        // };

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