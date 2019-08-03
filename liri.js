var axios = require('axios');

var movieName = process.argv[2];

var url = `http://www.omdbapi.com/?t=${ movieName }&y=&plot=short&apikey=trilogy`;


axios.get(url).then(function(response) {
    console.log(response.data.imdbRating);
});