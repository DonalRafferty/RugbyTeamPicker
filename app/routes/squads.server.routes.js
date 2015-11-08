'use strict';

module.exports = function(app){
    var squads = require('../../app/controllers/squads.server.controller');

    // Routes for getting the squad
    app.route('/squads')
        .get(squads.list); //Call the list function from the squad controller on a GET

};
