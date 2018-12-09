# liri-node-app
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data. LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

# Functionality 
Include screenshots (or a GIF/Video) of the typical user flow of your application. Make sure to include the use of Spotify, Bands in Town, and OMDB.
Include any other screenshots you deem necessary to help someone who has never been introduced to your application understand the purpose and function of it. This is how you will communicate to potential employers/other developers in the future what you built and why, and to show how it works.

# Commands and What They Do
1. node liri.js concert-this <artist/band name here>

This searches the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:
* Name of the venue
* Venue location
* Date of the Event (use moment to format this as "MM/DD/YYYY")

2. node liri.js spotify-this-song '<song name here>'

This shows the following information about the song in your terminal/bash window using Spotify's API to find the song. 
Artist(s)
* The song's name
* A preview link of the song from Spotify
* The album that the song is from

If no song is provided then the program will default to "The Sign" by Ace of Base.

3. node liri.js movie-this '<movie name here>'

This command outputs the following information to your terminal/bash window using axios and the OMBD API.
  * Title of the movie.
  * Year the movie came out.
  * IMDB Rating of the movie.
  * Rotten Tomatoes Rating of the movie.
  * Country where the movie was produced.
  * Language of the movie.
  * Plot of the movie.
  * Actors in the movie.


If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

4. node liri.js do-what-it-says

Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

# Video Demonstration
https://drive.google.com/file/d/1QXW0fWqYgOfDFWj1S9RKdHNzDbEhbox1/view?usp=sharing
