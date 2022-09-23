const express = require("express");
const router = express.Router();

module.exports = router;

const { Genre } = require("../db");
// GET /genre
// respond w/HTML text to be rendered
// show a form
router.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
            <head><title>Add a New Genre</title></head>
            <body>
                <h1>Add new genre</h1>
                <form method="POST" action="/genre">
                    <div>
                        <label>Name:</label>
                        <input type="text" name="theName" />
                        <button type="submit">Add Genre</button>
                    </div>
                </form>
            </body>
        </html>
    `);
})

// POST /genre
router.post("/", async (req, res, next) => {
    try {
        const newGenre = await Genre.create({ name: req.body.theName });
        console.log(newGenre);
        res.redirect("/genre");
    } catch(err) {
        next(err);
    }
});