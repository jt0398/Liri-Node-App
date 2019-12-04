# LIRI BOT

Liri will search Spotify for songs, Bands in Town for concerts, and OMDB for movies. It also reads input from a text file called random.txt and executes all of instruction in the file. For every search, the results are logged into a file called log.txt.

<h3>View (demo) [https://jt0398.github.io/Liri-Node-App/]</h3>

## Tech Stack

The application uses the following technologies to provide search results to the user:

- Axios - to perform RESTFUL request
- Node-Spotify-Api - to get information about a specific song
- OMDB API - to get information about a specific movie
- Bands In Town API - to get information about an artist's upcoming concerts

## How It Works

Liri takes in one of the following commands:

- `concert-this`

  **node liri concert-this bruno mars**

- `spotify-this-song`

  **node liri spotify-this-song man in the mirror**

- `movie-this`

  **node liri movie-this forrest gump**

- `do-what-it-says`

  **node liri do-what-it-says**


      ![](images/concert.jpg)
