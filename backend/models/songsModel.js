const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    songName: { type: String, required: true, unique: true },
    songArtist: { type: String, required: true, unique: false },
    songImage: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("songs", songSchema);