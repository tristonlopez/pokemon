const express = require('express');
const request = require('request');
const port = process.env.PORT || 8001;
const pokeAPI = "https://pokeapi.co/api/v2/pokemon/";

const app = express();

let pokemon;
function getPokemon(req, res, next) {
    const pokemonId = Math.floor(Math.random() * 965) + 1;
    const options = {
        url: `${pokeAPI}${pokemonId}`
    };
    request(options, function (err, res, body) {
        if (err) {
            console.error('request got an error: ', err);
            return next();
        }
        if (res.statusCode !== 200) {
            console.log(`Attempted to get Pokemon #${pokemonId}`);
            console.error(`Request was not succesful ${res, body}`);
            return next();
        }
        pokemon = JSON.parse(body);
        console.log(`Setting global pokemon to ${pokemon.name}`);
        next();
    });
}

app.use(getPokemon);
function pn(str) {
    return str[0].toUpperCase() + str.slice(1);
};

app.get('/', function (req, res) {
    if (typeof pokemon.name !== 'string' || pokemon.name === '') {
        res.send('invalid pokemon');
        return;
    };


    const body = `<div>
    <img src="${pokemon.sprites.front_default}">
    <ul>Stats
      <li>name: ${pn(pokemon.name)}</li>
      <li>height: ${pokemon.height}</li>
      <li>weight: ${pokemon.weight}</li>
    </ul>
  </div>
  `;
    res.send(body);
});




app.listen(port, function (err) {
    if (err) {
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

