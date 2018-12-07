//code to read and set any environment variables with a dotenv package
require("dotenv").config();

//code required to import the keys.js file and store it in a variable
var keys = require("./keys.js");

//npm module used to access Spotify API
var Spotify = require("node-spotify-api");

//variable to access spotify keys
var spotify = new Spotify(keys.spotify);

//variable for argument inputs
var nodeArgs = process.argv;

//variable for the commands (pre-defined)
var command = process.argv[2];

//variable for user inputs that come after the command
var userinput = process.argv.slice(3).join("+");

//variable for file system
var fs = require("file-system");

//variable to require request npm
var request = require("request");

//variable to require moment npm
var moment = require("moment");
moment().format();

//make overall liri function using switch commands 
function runLiri() {
    switch (command) {
        //concert-this funtion first 
        case "concert-this":
        concertThis(userinput);
        break;
        case "spotify-this-song":
        spotifyThis(userinput);
        break;
        case "movie-this":
        movieThis(userinput);
        break;
        case "do-what-it-says":
        dowhatitsays();
        break;
    }
}

//concertThis function using Bands in Town
function concertThis(userinput) {
//query url for bands in town
var queryurl = "https://rest.bandsintown.com/artists/" + userinput + "/events?app_id=codingbootcamp";
//check to make sure query url looks correct
console.log(queryurl)
//call bands in town API 
request(queryurl, function (error, response, body) {
    //log bands in town response data if status is 200 ok
    if (!error && response.statusCode === 200) {
        var data = JSON.parse(body); 
        for (var i = 0; i < data.length; i++) {
            //log venue information 
            console.log("Name of the Venue: " + data[i].venue.name);
            //log venue location information
            console.log("Venue Location: " + data[i].venue.city + ", " + data[i].venue.country);
            //log concert date and time in MM/DD/YYYY
            var date = data[i].datetime;
            date = moment(date).format("MM/DD/YYYY")
            console.log("Concert Date and Time: " + date);
            //error handler 
            if (error) {
                console.log(error);
            }
        }
    }
});
}
runLiri();

//SpotifyThis function calling Spotify API and using Spotify keys
function spotifyThis(userinput) {

    //spotify search query from node documentation
    spotify.search({
        type: 'track',
        query: userinput
    }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        //data drilled down to a managable level to see the songs and artists
        data = data.tracks.items[0];
        console.log("Song title: " + data.name);
        console.log("Artist: " + data.artists[0].name);
        console.log("Album: " + data.album.name);
        console.log("Preview link: " + data.preview_url);
    });
}