const { dbConnection, Game, Genre, Studio, Console }  = require('./index');

const runSeed = async() => {
    await dbConnection.sync({ force: true });

    //Genres
    const horrorGenre = await Genre.create({ name: "Horror" });
    const survivalGenre = await Genre.create({ name: "Survival" });
    const puzzleGenre = await Genre.create({ name: "Puzzle" });
    const rpgGenre = await Genre.create({ name: "RPG" });
    const fpsGenre = await Genre.create({ name: "FPS" });
    const partyGenre = await Genre.create({ name: "Party" });
    const actadvGenre = await Genre.create({ name: "Action-Adventure" });
    const platGenre = await Genre.create({ name: "Platformer" });
    const sandboxGenre = await Genre.create({ name: "Sandbox" });
    const relaxGenre = await Genre.create({ name: "Relaxing" });

    //Consoles
    const switchConsole = await Console.create({
        name: "Switch",
        distributor: "Nintendo"
    });
    const n64Console = await Console.create({
        name: "N64",
        distributor: "Nintendo"
    });
    const nesConsole = await Console.create({
        name: "NES",
        distributor: "Nintendo"
    });
    const snesConsole = await Console.create({
        name: "SNES",
        distributor: "Nintendo"
    });
    const cubeConsole = await Console.create({
        name: "Gamecube",
        distributor: "Nintendo"
    });
    const wiiConsole = await Console.create({
        name: "wii",
        distributor: "Nintendo"
    });
    const pcConsole = await Console.create({
        name: "PC",
        distributor: "N/A"
    });
    const ps5Console = await Console.create({
        name: "PS5",
        distributor: "Sony"
    });
    const ps3Console = await Console.create({
        name: "PS3",
        distributor: "Sony"
    });
    const ps4Console = await Console.create({
        name: "PS4",
        distributor: "Sony"
    });
    const xboxConsole = await Console.create({
        name: "Xbox",
        distributor: "Microsoft"
    });



    //Studios
    const actbliStudio = await Studio.create({ name: "Activision-Blizzard" });
    const sonyStudio = await Studio.create({ name: "Sony Playstation" });
    const ninStudio = await Studio.create({ name: "Nintendo" });
    const treyStudio = await Studio.create({ name: "Treyarch" });
    const hitStudio = await Studio.create({ name: "Hit-Point" });

    //Games
    const acnh = await Game.create({
        title: "Animal Crossing New Horizons",
        link: "blah.com",
        year: 2020,
        played: true,
        artworkUrl: "acnh-image"
    });
    await acnh.setGenres([rpgGenre, sandboxGenre, relaxGenre]);
    await acnh.setStudios([ninStudio]);
    await acnh.setConsoles([switchConsole]);

    const codBO3 = await Game.create({
        title: "Call of Duty: Black Ops III",
        link: "cod.com",
        year: 2015,
        played: true,
        artworkUrl: "codbo3-image"
    });
    await codBO3.setGenres([rpgGenre, fpsGenre]);
    await codBO3.setStudios([sonyStudio, treyStudio]);
    await codBO3.setConsoles([ps4Console, ps5Console]);


    console.log("Database is seeded!");
    process.kill(0);
}

runSeed();
