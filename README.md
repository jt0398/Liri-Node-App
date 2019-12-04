# LIRI BOT

Liri will search Spotify for songs, Bands in Town for concerts, and OMDB for movies. It also reads input from a text file called random.txt and executes all of instruction in the file. For every search, the results are logged into a file called log.txt.

<h3>View demo - https://jt0398.github.io/Liri-Node-App/</h3>

## Tech Stack

The application uses the following technologies to provide search results to the user:

- Axios - to perform RESTFUL request
- Node-Spotify-Api - to get information about a specific song
- OMDB API - to get information about a specific movie
- Bands In Town API - to get information about an artist's upcoming concerts

## How It Works

Liri takes in one of the following commands:

- `concert-this`

  ```
  node liri concert-this bruno mars
  ```

- `spotify-this-song`

  ```
  node liri spotify-this-song man in the mirror
  ```

- `movie-this`

  ```
  node liri movie-this forrest gump
  ```

- `do-what-it-says`

  ```
  node liri do-what-it-says
  ```

## How to Install

To run Liri, you will first need to clone the repository to your local machine.

    HTTPS:
    ```
    $ git clone https://github.com/jt0398/Liri-Node-App.git
    ````
    SSH:
    ````
    $ git clone git@github.com:jt0398/Liri-Node-App.git
    ````

Signup to [Spotify](https://developer.spotify.com/documentation/web-api/quick-start/) and [OMDB](http://www.omdbapi.com/apikey.aspx?__EVENTTARGET=freeAcct&__EVENTARGUMENT=&__LASTFOCUS=&__VIEWSTATE=%2FwEPDwUKLTIwNDY4MTIzNQ9kFgYCAQ9kFgICBw8WAh4HVmlzaWJsZWhkAgIPFgIfAGhkAgMPFgIfAGhkGAEFHl9fQ29udHJvbHNSZXF1aXJlUG9zdEJhY2tLZXlfXxYDBQtwYXRyZW9uQWNjdAUIZnJlZUFjY3QFCGZyZWVBY2N0x0euvR%2FzVv1jLU3mGetH4R3kWtYKWACCaYcfoP1IY8g%3D&__VIEWSTATEGENERATOR=5E550F58&__EVENTVALIDATION=%2FwEdAAU5GG7XylwYou%2BzznFv7FbZmSzhXfnlWWVdWIamVouVTzfZJuQDpLVS6HZFWq5fYpioiDjxFjSdCQfbG0SWduXFd8BcWGH1ot0k0SO7CfuulN6vYN8IikxxqwtGWTciOwQ4e4xie4N992dlfbpyqd1D&at=freeAcct&Email=) to get an API key.

In the project root folder, create an .env file with the following entries.

```
SPOTIFY_ID=<Replace this with Spotify ID>
SPOTIFY_SECRET=<Replace this with Spotify secret key>

OMDB_SECRET=<Replace this with OMDB secret key>
```

Open a new terminal and browser to the folder where the project is cloned. Run the command.

    ````
    $ node liri.js
    ````
