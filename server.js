const express = require('express');
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

app.listen(port, function() {
    console.log('Server started on port ' + port);
});