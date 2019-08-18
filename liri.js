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