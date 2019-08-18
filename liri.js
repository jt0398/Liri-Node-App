require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var moment = require('moment');

var command = process.argv[2].toLowerCase();
var searchText = process.argv.slice(3).join("+");
var searchTextSpace = process.argv.slice(3).join(" ");

runCommand(command, searchText);

function runCommand(commandName, searchValue) {
    switch (commandName) {
        case "concert-this":
            console.log("\nSEARCHING concert for " + searchValue + "....\n");
            searchConcert(searchValue);
            break;
        case "spotify-this-song":
            console.log("\nSEARCHING song " + searchValue + "....\n");
            searchSpotify(searchValue);
            break;
        case "movie-this":
            console.log("\nSEARCHING movie " + searchValue + "....\n");
            searchMovie(searchValue);
            break;
        case "do-what-it-says":
            readTextFile();
            break;
    }
}

function logSearch(result) {

    const logFilename = "log.txt";

    fs.writeFile(logFilename, result + "\n\n", function(err) {
        if (err) {
            console.log("Error occurred " + err);
        }
    });
}

function searchConcert(artist) {
    const queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(queryUrl)
        .then(function(response) {

            var data = response.data;

            for (let i = 0; i < data.length; i++) {
                let result = `Venue: ${data[i].venue.name}\nLocation: ${data[i].venue.city},${data[i].venue.region}\nEvent Date: ${moment.utc(data[i].datetime).format("MM/DD/YYYY")}\n-----------------------------------------`;

                console.log(result);

                logSearch(result);
            }

        })
        .catch(function(err) {
            console.log("Error occurred " + err);
        });
}

function searchSpotify(song) {
    if (song === "") {
        song = "Ace+of+Base+The+Sign";
    }

    var spotify = new Spotify(keys.spotify);

    spotify
        .search({ type: 'track', query: song, limit: 5, market: 'CA' })
        .then(function(response) {
            const items = response.tracks.items;

            for (let i = 0; i < items.length; i++) {
                let result = `Artist(s): ${items[i].album.artists[0].name}\nSong: ${items[i].name}\nPreview: ${items[i].preview_url}\nAlbum: ${items[i].album.name}\n-----------------------------------------------------------------------`;

                console.log(result);

                logSearch(result);
            }

        })
        .catch(function(err) {
            console.log("Error occurred " + err);
        });

}

function searchMovie(movie) {
    const queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=" + keys.omdb.secret;

    axios.get(queryUrl)
        .then(function(response) {

            var data = response.data;

            const imdbRating = data.Ratings.find(rating => rating.Source === "Internet Movie Database");
            const rottenRating = data.Ratings.find(rating => rating.Source === "Rotten Tomatoes");

            let result = `Movie: ${data.Title}\Year: ${data.Year}\nIMDB Rating: ${imdbRating.Value}\nRotten Tomatoes Rating: ${rottenRating.Value}\nCountry: ${data.Country}\nLanguage: ${data.Language}\nPlot: ${data.Plot}\nActors: ${data.Actors}`;

            console.log(result);

            logSearch(result);

        })
        .catch(function(err) {
            console.log("Error occurred " + err);
        });
}

function readTextFile() {
    const filename = "random.txt";

    fs.readFile(filename, "utf-8", function(error, data) {
        if (error) {
            return console.log("Error occurred " + error);
        }

        const texts = data.split("\n");

        texts.forEach(function(text) {
            let cmd = text.split(",");


        });
    });
}