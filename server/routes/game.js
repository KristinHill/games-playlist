const express = require("express");
const router = express.Router();

module.exports = router;

const { Game, Genre, Studio, Console } = require("../db");

router.get("/", (req, res) => {
    res.send("games list lol");
});

// GET /games/add-game
// respond w/HTML text to be rendered
// show a form
router.get("/add-game", async (req, res) => {
    const allOfMyGenres = await Genre.findAll();

    res.send(`
        <!DOCTYPE html>
        <html lang='en'>
            <head>
                <title>Add a New Game</title></head>
            <body>
                <h1>Add new game</h1>
                <form method="POST" action="/games">
                    <div>
                        <label>Name:</label>
                        <input type="text" name="title" />
                    </div>
                    <div>
                        <label>Link:</label>
                        <input type="text" name="link" placeholder='Optional' />
                    </div>
                    <div>
                        <div id='genre-selects-container'>
                            <select id='genre-select' name='genres'>
                                <option></option>
                                ${allOfMyGenres.map(genre => {
                                    return `<option value="${genre.id}" >${genre.name}</option>`
                                }).join("")
                            }
                            </select>
                        </div>
                        <button type='button' id='add-button'>+</buttom>
                    </div>
                    <button type='submit'>Add Game</button>
                </form>
                <script type="text/javascript" src="movie-form.js" ></script>
            </body>
        </html>
    `);
});

// POST /games
router.post("/", async (req, res, next) => {
    
    const title = req.body.title;
    const link = req.body.link;
    const art = req.body.artworkUrl;
    const year = req.body.year;
    const played = req.body.played;
    const attachedGenreIds = req.body.genres;
    const attachedStudioIds = req.body.studio;
    const attachedConsoleIds = req.body.console;

    try{
        const newGame = await Game.create({
            title: title,
            link: link || null,
            art: art,
            year: year,
            played: played,
        });
        await newGame.setGenres(attachedGenreIds);
        await newGame.setStudios(attachedStudioIds);
        await newGame.setConsoles(attachedConsoleIds);
        res.redirect("/games")
    } catch (err) {
        next(err);
    }
});