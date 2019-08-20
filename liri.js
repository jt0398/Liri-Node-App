//Add required modules
require("dotenv").config(); //loads environment variables from a .env file into process.env
var keys = require("./keys.js"); //exported objects of the API keys
var fs = require("fs"); //node file system module
var axios = require("axios"); //module for Promise API
var Spotify = require('node-spotify-api'); //module for Spotify REST API
var moment = require('moment'); //ECMAScript 6 modules of Moment library (Date manipulation)

if (process.argv.length < 3) {
    return console.log("1) Please choose one of the commands:\n concert-this\n spotify-this-song\n movie-this\n do-what-it-says\n2) Specify a search text\n\nFor example node liri spotify-this-song I believe");
}

var command = process.argv[2].toLowerCase(); //Get command type input
var searchText = process.argv.slice(3).join("+"); //Get search value from input

runCommand(command, searchText);

//Calls different function based on the command name provided
function runCommand(commandName, searchValue) {
    switch (commandName) {
        case "concert-this":
            //Searches concert          
            searchConcert(searchValue);
            break;
        case "spotify-this-song":
            //Searches Spotify
            searchSpotify(searchValue);
            break;
        case "movie-this":
            //Searches Movies
            searchMovie(searchValue);
            break;
        case "do-what-it-says":
            //Loads list of commands from file
            readTextFile();
            break;
        default:
            console.log("Please choose one of the commands:\nconcert-this\nspotify-this-song\nmovie-this\ndo-what-it-says");
    }
}

//Logs search result into a file called log.txt
function logSearch(result) {

    const logFilename = "log.txt";

    //Appends text to file content
    fs.appendFile(logFilename, result + "\n\n", function(err) {
        if (err) {
            console.log("Error occurred " + err);
        }
    });
}

//Searches Bands In Town API for an artist's concert events
function searchConcert(artist) {
    if (!artist) {
        artist = "bruno+mars";
    }

    const queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    //Calls API
    axios.get(queryUrl)
        .then(function(response) {

            //API returned result
            const data = response.data;

            if (data.length === 0) {
                return console.log("No results");
            }

            //Loops thru the result set
            for (let i = 0; i < data.length; i++) {
                let result = `Venue: ${data[i].venue.name}\nLocation: ${data[i].venue.city},${data[i].venue.region}\nEvent Date: ${moment.utc(data[i].datetime).format("MM/DD/YYYY")}\n-----------------------------------------`;

                console.log(result);

                //Logs result to log file
                logSearch(result);
            }

        })
        .catch(function(err) {
            console.log("Error occurred " + err);
        });
}

//Searches Spotify for a song
function searchSpotify(song) {

    //If there's no song provided, default song is The Sign
    if (!song) {
        song = "Ace+of+Base+The+Sign";
    }

    //Creates a new Spotify object with client ID and key from environment variables
    var spotify = new Spotify(keys.spotify);

    /* Searches Spotify with 'track' type
        Limits the count of result to 5 and market to Canadian */
    spotify
        .search({ type: 'track', query: song, limit: 5, market: 'CA' })
        .then(function(response) {

            //API returned result
            const items = response.tracks.items;

            if (items.length === 0) {
                return console.log("No results");
            }

            //Loops thru the result set
            for (let i = 0; i < items.length; i++) {
                let result = `Artist(s): ${items[i].album.artists[0].name}\nSong: ${items[i].name}\nPreview: ${items[i].preview_url}\nAlbum: ${items[i].album.name}\n-----------------------------------------------------------------------`;

                console.log(result);

                //Logs result to file
                logSearch(result);
            }

        })
        .catch(function(err) {
            console.log("Error occurred " + err);
        });

}

//Searches OMDB for movie
function searchMovie(movie) {
    if (!movie) {
        movie = "forrest+gump";
    }

    const queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=" + keys.omdb.secret;

    //Calls API
    axios.get(queryUrl)
        .then(function(response) {

            //API returned result
            const data = response.data;

            let imdbRating;
            let rottenRating;

            if (!data.Title) {
                return console.log("No results");
            }

            if (data.Ratings != null) {
                //Gets the IMDB rating object
                imdbRating = data.Ratings.find(rating => rating.Source === "Internet Movie Database");

                //Gets the Rotten Tomato rating object
                rottenRating = data.Ratings.find(rating => rating.Source === "Rotten Tomatoes");
            } else {
                imdbRating = { Value: "Not Available" };
                rottenRating = { Value: "Not Available" };
            }

            let result = `Movie: ${data.Title}\nYear: ${data.Year}\nIMDB Rating: ${imdbRating.Value}\nRotten Tomatoes Rating: ${rottenRating.Value}\nCountry: ${data.Country}\nLanguage: ${data.Language}\nPlot: ${data.Plot}\nActors: ${data.Actors}\n-----------------------------------------------------------------------`;

            console.log(result);

            logSearch(result);

        })
        .catch(function(err) {
            console.log("Error occurred " + err);
        });
}

//Loads list of commands from file
function readTextFile() {
    const filename = "random.txt";

    fs.readFile(filename, "utf-8", function(error, data) {
        if (error) {
            return console.log("Error occurred " + error);
        }

        //Splits text by newline
        const texts = data.split("\n");

        texts.forEach(function(text) {

            //Splits command by comma
            let cmd = text.split(",");

            //Run command if it's not 'do-what-it-says'
            //Prevent infinite recursive call to same function
            if (cmd[0] != "do-what-it-says") {
                runCommand(cmd[0], cmd[1].split(" ").join("+"));
            }

        });
    });
}