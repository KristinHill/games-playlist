const express = require('express');
const app = express();

const PORT = 8080;

const { dbConnection } = require('./db');

const startServer = async() => {
    await dbConnection.sync();
    app.listen(PORT, () => {
        console.log(`~Server is running on port ${PORT}~`)
    });
}
startServer();

// matches any url for a GET request to a possible file
// in the public directory
app.use(express.static(__dirname + "/public"));

// start of middlewre
app.use(express.json());
app.search(express.urlencoded({ extended: false }));

const genresRouter = require("./routes/genre");
app.use("/genre", genresRouter);

const gamesRouter = require("./routes/game");
app.use("/games", gamesRouter);

app.get("/", (req, res) => {
    res.send('Hello :)');
});
