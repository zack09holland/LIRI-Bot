var fs = require('fs');
require("dotenv").config();
var moment = require('moment');
var keys = require("./keys.js");

var axios = require('axios');

var Spotify = require('node-spotify-api');
var spotifyKey = new Spotify(keys.spotify);

var omdbKey = keys.omdb.api_key;

var actionArg = process.argv[2];
var valueLookup = process.argv.slice(3).join(" ");

switch (actionArg) {
    case ('concert-this'):
         concertThis(valueLookup);
    break;
    case ('spotify-this-song'):
        if(valueLookup){
            spotifyThisSong(valueLookup);
         } else{
            spotifyThisSong("the sign ace of base");
         }
    break;
    case ('movie-this'):
        if(valueLookup){
            omdb(valueLookup);
        } else{
            console.log("If you haven't watched 'Mr. Nobody' then you should: http://www.imdb.com/title/tt0485947/")
            console.log("Its on Netflix! Here is some info about it: \n")
            omdb("Mr. Nobody")
        }
    break;
    case ('do-what-it-says'):
         doThing();
    break;
    default:
        console.log('Try again');
};


function concertThis(artist){
    var BITurl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    axios.get(BITurl).then(function(response) {
        //console.log(response.data);
        for(var i = 0; i<response.data.length; i++){
            console.log("Name of venue: " + response.data[i].venue.name)
            console.log("Venue location: " + response.data[i].venue.city+", "+response.data[i].venue.country)
            console.log("Date of event: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
            console.log("-----------------------");
        }
    });
}

function spotifyThisSong(song){
    spotifyKey.search({ type: 'track', query: song, limit: 1}, function(err,data){   
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        else{
            for(var i = 0; i < data.tracks.items.length; i++){
                var spotifyOutput = data.tracks.items[i];
                console.log("Artist(s): " + spotifyOutput.artists[0].name);
                console.log("Song name: " + spotifyOutput.name);
                console.log("Preview link: " + spotifyOutput.preview_url);
                console.log("Album Song is From: " + spotifyOutput.album.name);
                console.log("-----------------------");
            }
        } 
    });
}

function omdb(movie){
    var url = 'http://www.omdbapi.com/?t=' + movie + '&apikey=' + omdbKey + '&plot=short&tomatoes=true';
    axios.get(url).then(function(response) {
        //console.log(response);
        console.log("Title: " + response.data.Title);
        console.log("Release Year: " + response.data.Year);
        console.log("IMdB Rating: " + response.data.imdbRating);
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
        console.log("Rotten Tomatoes Rating: " + response.data.tomatoRating);
        console.log("Rotten Tomatoes URL: " + response.data.tomatoURL);
    });
}

function doThing(){
    fs.readFile('random.txt', "utf8", function(data){
        var txt = data.split(',');

        spotifyThisSong(txt[1]);
    });
}