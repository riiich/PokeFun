const router = require('express').Router();
const mysql = require('mysql');
require('dotenv').config();     // needs this in order to get environment variables from .env file

// ALSO MAKE SURE THE '.env' FILE IS ALWAYS IN THE '.gitignore' FILE SO THAT IT DOESN'T GET UPLOADED TO GITHUB
// process.env: this allows us to access specific information in the .env file

// create a connection to the database 
const db = mysql.createConnection({
    host: process.env.ENDPOINT,
    user: process.env.MASTER_USER,
    password: process.env.MASTER_PASS,
    database: "pokemon",
});

// connect to database
db.connect((err) => {
    if(err) {
        console.log(err);
    }
    else{
        console.log("Connected to MySQL Database!");
    }
})

// middleware
router.use((req, res, next) => {
    // console.log(req.headers); 
    
    next();
});

router.get('/', (req, res) => {
    res.json({
        status: 200,
        message: "This is the endpoint route to retrieve some data!",
    })
});

// get the list of amount of times a pokemon has been searched
router.get('/pokemonList', async (req, res) => {
    const allPokemonQuery = "SELECT * FROM Pokemon";

    db.query(allPokemonQuery, (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            result.sort((a, b) => b.searchCount - a.searchCount);   // sort based on searchCount in descending order
            
            res.status(200).send({
                status: res.statusCode,
                pokemonSearchList: result,  // return the data from the database
            });
        }
    })
});

// adds the pokemon into the database
router.post('/pokemonList', (req, res) => {
    try{
        let { pokemonName, pokemonImg, allPokemons } = req.body;
        

        if(!allPokemons.includes(pokemonName)){
            console.log(`${pokemonName} is not a real Pokemon!`);
            res.json({
                message: `${pokemonName} is not a real Pokemon!`,
                pokemon: pokemonName,
                exists: false,
            });
        }
        else{
            pokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);   // capitalize the first letter of pokemon name before storing
            const checkPokemon = `SELECT * FROM Pokemon WHERE name='${pokemonName}'`;
            db.query(checkPokemon, (err, checkResult) => {
                if(err){
                    console.log(err);
                }
                else{
                    if(checkResult.length > 0){
                        console.log(`${pokemonName} EXISTS in the database`);
                        const updateQuery = `UPDATE Pokemon SET searchCount = searchCount + 1, image='${pokemonImg}' WHERE name='${pokemonName}' and image is not null`;

                        db.query(updateQuery, (err, result) => {
                            if(err) {
                                console.log(err);
                            }
                            else{
                                res.json({
                                    message: "Updated Pokemon!",
                                    pokemon: pokemonName,
                                    image: pokemonImg,
                                })
                            }
                        });
                        console.log(`${pokemonName}'s data has been updated!`);
                    }
                    else{
                        console.log(`${pokemonName} DOES NOT EXIST in the database!`);
                        const addPokemonQuery = `INSERT INTO Pokemon (name, image) values('${pokemonName}', '${pokemonImg}')`;

                        db.query(addPokemonQuery, [pokemonName, pokemonImg], (err, result) => {
                            if(err){
                                console.log(err);
                            }
                            else{
                                res.json({
                                    message: "Added Pokemon!",
                                    pokemon: pokemonName,
                                    image: pokemonImg,
                                    exists: true,
                                });
                                console.log(`Successfully added ${pokemonName} into the database!`);
                            }
                        });
                    }
                }
            })
        }     
    }
    catch(error){
        console.log(error);
    }
});

// get the specific pokemon
router.get("/:pokemonName", async (req, res) => {
    res.send(`Get information about ${req.params.pokemonName}`);
});

module.exports = router;