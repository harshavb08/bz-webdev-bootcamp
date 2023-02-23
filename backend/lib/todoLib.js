const { default: mongoose } = require("mongoose");
const todoModel = require("../models/todoModel");

/*
1. createTodo
2. getAllTodos
3. getSingleTodoById
4. getTodosByQuery
5. updateTodoById
6. DeleteTodoById
*/

module.exports.createTodo = async function(todo, callback) {
    try {
        var newTodo = new todoModel(todo);
        var result = await newTodo.save();
        callback(null, result);
    } catch (err) {
        callback(err, null);
    }
}
module.exports.getAllTodos = async function(callback) {
    try {
        var todos = await todoModel.find({ isCompleted: false, isDeleted: false });
        callback(null, todos);
    } catch (err) {
        callback(err, null);
    }
}

module.exports.getTodosByQuery = async function(query, callback) {
    try {
        var todos = await todoModel.find(query);
        callback(null, todos);
    } catch (err) {
        callback(err, null);
    }
}

module.exports.getSingleTodoById = async function(id, callback) {
    try {
        var todo = await todoModel.findOne(id);
        callback(null, todo);
    } catch (err) {
        callback(err, null);
    }
}

module.exports.updateTodoById = async function(id, data, callback) {
    try {
        var todo = {
            _id: new mongoose.Types.ObjectId(id),
        };
        var result = await todoModel.findOneAndUpdate(todo, data);
        callback(null, result);
    } catch (err) {
        callback(err, null);
    }
}

module.exports.deleteTodoById = async function(id, callback) {
    try {
        var todo = {
            _id: id,
        };
        var result = await todoModel.findOneAndUpdate(todo, { isDeleted: true });
        callback(null, result);
    } catch (err) {
        callback(err, null);
    }
}

module.exports.getAllCompletedTodos = async function(callback) {
    try {
        var todos = await todoModel.find({ isCompleted: true, isDeleted: false });
        callback(null, todos);
    } catch (err) {
        callback(err, null);
    }
}

module.exports.getAllDeletedTodos = async function(callback) {
    try {
        var todos = await todoModel.find({ isDeleted: true });
        callback(null, todos);
    } catch (err) {
        callback(err, null);
    }
}