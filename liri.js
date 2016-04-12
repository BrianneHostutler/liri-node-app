// At the top of the liri.js file make it so you grab the data 
// from keys.js and store it into a variable to use

// Make it so liri.js can take in one of the following arguments

// my-tweets

// spotify-this-song

// movie-this

// do-what-it-says

// node liri.js my-tweets:


var fs = require('fs'); //reads and writes files

fs.readFile(".gitignore/keys.js", "utf8", function(error, data) {
    var keys= data;
    console.log(keys);
});


var request = require('request');

movie = process.argv[2];

request('http://www.omdbapi.com/?t='+movie+'&y=&plot=short&r=json"', function (error, response, body) {
  if (!error && response.statusCode == 200) { //200 = successful request
    console.log(body); // Show the text in the terminal
	}
});


// var request = require('request');

// request('', function (error, response, body) {
//   if (!error && response.statusCode == 200) { //200 = successful request
//     console.log(body); // Show the HTML for the homepage.
// 	}
// });



