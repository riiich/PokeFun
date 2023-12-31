const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3001;

//  middleware that parses incoming requests with JSON payloads and is based on body-parser
app.use(express.json());     //express.json is ONLY used for POST and PUT requests, not GET and DELETE requests
app.use(express.urlencoded({limit: '50mb'}));

app.use(
    cors({
        // origin: "*",
        origin: ["https://poke-fun-six.vercel.app/"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true, // make this true to have allow cookies
    })
);

const searchPokemon = require('./routes/pokemonSearch');
app.use('/searchPokemon', searchPokemon);

app.get("/", (req, res) => {
    res.json({
        msg: "Welcome to the Pokemon's searched backend!",
    });
});

app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
});