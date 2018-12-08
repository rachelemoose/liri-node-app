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
var fs = require("fs");

//variable to require request npm
var request = require("request");

//variable to require moment npm
var moment = require("moment");
moment().format();

//variable to require axios
var axios = require("axios");

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
console.log(queryurl);
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
    //first create a function that searches "The Sign" if there is no song
    if (!userinput) {
        userinput = "The Sign";
        console.log(userinput);
    }
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
//MovieThis fucntion calling OMDB API using trilogy keys when using movie-this command
function movieThis(userinput) {
    //if there is no userinput pull the movie Mr. Nobody 
    if (!userinput) {
      userinput = "Mr. Nobody";
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + userinput + "&y=&plot=short&apikey=trilogy";
    //use axios to call OMDB api 
    axios.get(queryUrl).then(function(response) {
        //store response data in a variable - do not need to parse it, response is in JSON
        jsonData = response.data;
        //display movie info 
        console.log("Movie Title: ", jsonData.Title);
        console.log("Release Year: ", jsonData.Year);
        console.log("IMDB Rating: ", jsonData.imdbRating);
        if (jsonData.Ratings[2]) {
          console.log("Rotten Tomatoes Score: ", jsonData.Ratings[2].Value);
        }
        console.log("Country: ", jsonData.Country);
        console.log("Language: ", jsonData.Language);
        console.log("Plot: ", jsonData.Plot);
        console.log("Actors: ", jsonData.Actors);
      });
    }

    // DoWhatItSays function LIRI will take the text inside of random.txt 
    // and then use it to call one of LIRI's commands
    //will not use user input because it needs to read from the file
    function dowhatitsays() {
        fs.readFile("random.txt", "utf8", function(error, data) {
            if (error) {
              return console.log(error);
            } 
            //Split data into array
            var textArr = data.split(",");
            command = textArr[0];
            userinput = textArr[1];
            runLiri();
    });
}