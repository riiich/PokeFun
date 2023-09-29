const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');

app.use(express.json());    //  need this middleware so that express is able to parse json that is passed to server
app.use(express.json({limit: '50mb'}));

app.use(
    cors({
        origin: ["https://poke-fun-six.vercel.app"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true, // make this true to have allow cookies
    })
);

const searchPokemon = require('./routes/pokemonSearch');
app.use('/searchPokemon', searchPokemon);

app.get("/hi", (req, res) => {
    res.json({
        msg: "hi"
    });
})

app.listen(port, () => {
    console.log(`Listening on Port ${port}`)
})