'use strict';

/**
 * Module dependencies.
 */
var https = require('https');

/**
 * Helper function that retrieves the list of squads
 * from the url in JSON format.
 * The injectedCallback is used to asynchronously pass
 * the results to the next part of the chain.
 * @param injectedCallback
 */
exports.retrieveSquadFile = function(injectedCallback){
    var options = { //options object for holding URL data
        host: 'https://gist.githubusercontent.com',
        path: '/colmdoyle/33d1f67043d1333f8786/raw/e78be32d28e96c9888b95461f1ad14ddfc4fc602/athletes.json'
    };

    //Simple HTTP GET to retrieve and append the data to a String
    https.get(options.host + options.path, function(response){
        var str = '';

        //Another chunk of data has been received, so append it to `str`
        response.on('data', function (chunk) {
            str += chunk;
        });

        //the whole response has been received
        response.on('end', function () {
            injectedCallback(JSON.parse(str)); //Send the full String back via the callback
        });
    });
};

