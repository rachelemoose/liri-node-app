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
var userinput = process.argv[3];

//variable for file system
var fs = require("file-system");

//variable to require request npm
var request = require("request");

//variable to require moment npm
var moment = require("moment");
moment().format();

//Get user input for song/artist/movie name
//Loop starting at process.argv[3] because [2] is the command
// for (var i = 3; i < nodeArgs.length; i++) {
//     //If userInput is more than 1 word
//     if (i > 3 && i < nodeArgs.length) {
//         userinput = userinput + "%20" + nodeArgs[i];
//     }
//     //If userInput is only 1 word
//     else {
//         userinput += nodeArgs[i];
//     }
//  }

//make overall liri function using switch commands 
function runLiri() {
    switch (command) {
        //concert-this funtion first 
        case "concert-this":
    }
}

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
            var date = data[i].datetime
            date = moment(date).format("MM/DD/YYYY")
            console.log("Concert Date and Time: " + date);
            //error handler 
            if (error) {
                console.log(error);
            }
        }
    }
});
