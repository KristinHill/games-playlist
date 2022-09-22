const Sequelize = require("sequelize");

const dbConnection = new Sequelize(
    "postgres://localhost:5432/gameplaylist"
);

/*
    Game model
        - title (not null)
        - link (null)
        - year (not null)
        - image (not null, default image)
        - played or not (not null, boolean, default false)
    Genre model
        - name (not null)
    Studio model
        - name (not null)
    Console model
        - name (not null)
*/

const Game = dbConnection.define('game', {
    title: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    link: {
        type: Sequelize.DataTypes.STRING(1000),
        allowNull: true,
        validate: {
            isUrl: true
        }
    },
    year: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    played: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    artworkUrl: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: 'default-game.jpg'
    }
});

const Genre = dbConnection.define('genre', {
    name: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false
    }
});

const Studio = dbConnection.define('studio', {
    name: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false
    }
});

const Console = dbConnection.define('console', {
    name: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false
    },
    distributor: {
        type: Sequelize.DataTypes.STRING
    }
});

//Joins
Game.belongsToMany(Genre, { through: 'games_genres' });
Genre.belongsToMany(Game, { through: 'games_genres' });

Game.belongsToMany(Studio, { through: 'games_studios' });
Studio.belongsToMany(Game, { through: 'games_studios' });

Game.belongsToMany(Console, { through: 'games_consoles' });
Console.belongsToMany(Game, { through: 'games_consoles' });

module.exports = {
    dbConnection: dbConnection,
    Game: Game,
    Genre: Genre,
    Studio: Studio,
    Console: Console
}
