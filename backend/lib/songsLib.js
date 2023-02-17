const express = require('express');
var bodyParser = require('body-parser');
const songsModel = require('../models/songsModel');
const songRouter = express.Router();

var jsonParser = bodyParser.json();

var urlencodedParser = bodyParser.urlencoded({ extended: true });


songRouter.get('/', async function(req, res) {
    const songs = await songsModel.find({});
    res.send(songs);
});

songRouter.post('/addSong', urlencodedParser, async function(req, res) {
    const song = new songsModel({
        songName: req.body.songName,
        songArtist: req.body.songArtist,
        songImage: req.body.songImage,
    });
    const newSong = await song.save();
    res.send({ newSong });
});

module.exports = songRouter;