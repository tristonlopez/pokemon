const express = require('express');
const request = require('request');
const port = process.env.PORT || 8001;
const pokeAPI = "https://pokeapi.co/api/v2/pokemon/";

const app = express();

let pokemon;
function getPokemon(req, res,next)
{
    const pokemonId = Math.floor(Math.random() * 965) +1;
    const options = {
        url: `${pokeAPI}${pokemonId}`
    };
    request(options, function(err, res, body)
    {
        if (err)
        {
            console.error('request got an error: ', err);
            return next();
        }
        pokemon = JSON.parse(body);
        console.log(`Setting global pokemon to ${pokemon.name}`);
        next();
    });
}

app.use(getPokemon);

app.get('/', function(req, res)
{
    res.send(pokemon.name);
});




app.listen(port, function(err)
{
    if (err)
    {
        console.error("Error starting the server: ", err);
    }
    console.log(`Server is runnig at port ${port}`);
});
/*
request(pokeAPI, function(err, res, body)
{    console.log('err', err);
console.log('res', res);
console.log('body', body);
}); */

