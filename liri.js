const dotenv = require("dotenv").config();
var keys = require("./keys.js");
var spotifyKey = new spotifyKey(keys.spotify);
var omdbKey = keys.omdb.api_key;gffff
var axios = require('axios');

//var movieName = process.argv[2];

var url = `http://www.omdbapi.com/?t=${ movieName }&y=&plot=short&apikey=trilogy`;


axios.get(url).then(function(response) {
    console.log(response.data.imdbRating);
});