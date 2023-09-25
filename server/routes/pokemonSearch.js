const router = require('express').Router();
const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pokemon",
});

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

// get the list of amount of times a pokemon has been searched
router.get('/pokemonList', async (req, res) => {
    const allPokemonQuery = "SELECT * FROM POKEMON";

    db.query(allPokemonQuery, (err, result) => {
        if(err){
            console.err(err);
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
                pokemon: pokemonName
            });
        }
        else{
            pokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);   // capitalize the first letter of pokemon name before storing
            const checkPokemon = `SELECT * FROM POKEMON WHERE name='${pokemonName}'`;
            db.query(checkPokemon, (err, checkResult) => {
                if(err){
                    console.log(err);
                }
                else{
                    if(checkResult.length > 0){
                        console.log(`${pokemonName} EXISTS in the database`);
                        const updateQuery = `UPDATE POKEMON SET searchCount = searchCount + 1, image='${pokemonImg}' WHERE name='${pokemonName}' and image is not null`;

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
                        const addPokemonQuery = `INSERT INTO POKEMON (name, image) values('${pokemonName}', '${pokemonImg}')`;

                        db.query(addPokemonQuery, [pokemonName, pokemonImg], (err, result) => {
                            if(err){
                                console.log(err);
                            }
                            else{
                                res.json({
                                    message: "Added Pokemon!",
                                    pokemon: pokemonName,
                                    image: pokemonImg,
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