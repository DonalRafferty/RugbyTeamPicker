'use strict';

/**
 * Module dependencies.
 */
var squadPicker = require('./../utilities/squadPicker.server.utility'); //Reference the squadPicker utility class

/**
 * A function that gets called from the /squads
 * API route, calls the squadPicker helper class to
 * pick 15 players in correct positions for a rugby team
 * else
 * send back a generic error message
 * @param req
 * @param res
 * @returns {*}
 */
exports.list = function (req, res) {
    squadPicker.pickSquad(function(data){
        res.jsonp(data);
    });
};