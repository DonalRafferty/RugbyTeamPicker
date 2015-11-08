'use strict';

/**
 * Module dependencies.
 */

var fileRetrieval = require('./fileRetrieval.server.utility'), //File Retrieval helper class
    NUMPLAYERS = 2; //Static number for limiting players per position

/**
 * Helper function that appends the sqauad info to the player object
 * based on the squad_id from a player and id from a squad
 * @param squadArray
 * @param player
 * @returns {*}
 */
var getSquadInfo = function(squadArray, player){
    squadArray.forEach(function(squad){
        if(squad.id == player.squad_id){
            player.squad = squad;
            return;
        }
    });
    return player;
};

/**
 * Helper function that makes iterates through the player list
 * It makes sure a player is not injured and then places now injured
 * players into their correct positions to build a team of 15 players
 * TODO: Currently only picks the last x number of players for a position, would be more interesting if it randomly picked a player for a position
 * @param squadArray
 * @param playerArray
 */
var pickGameDay15 = function(squadArray, playerArray){
    var squad = {}; //Start with an empty squad object
    squad.props = [], squad.hooker = {}, squad.locks = [], squad.flankers = [], squad.numEight = {},
        squad.scrumHalf = {}, squad.outHalf = {}, squad.centres = [], squad.wingers = [], squad.fullBack = {}; //Add positons parameters to the squad object
    playerArray.forEach(function(player){ //Iterate over players
        if(!player.is_injured){ //Make sure a player is not injured
            switch(player.position){
                case 'prop': //Check for props
                    if(squad.props.length < NUMPLAYERS) //2 props
                        squad.props.push(getSquadInfo(squadArray, player)); //Add props using getSquadInfo helper function to append squad info
                    break;
                case 'hooker': //Check for hookers
                    squad.hooker = getSquadInfo(squadArray, player); //Add hooker using getSquadInfo helper function to append squad info
                    break;
                case 'lock': //Check for Locks
                    if(squad.locks.length < NUMPLAYERS) //2 Locks
                        squad.locks.push(getSquadInfo(squadArray, player)); //Add Locks using getSquadInfo helper function to append squad info
                    break;
                case 'flanker': //Check for flankers
                    if(squad.flankers.length < NUMPLAYERS) //2 flankers
                        squad.flankers.push(getSquadInfo(squadArray, player)); //Add flankers using getSquadInfo helper function to append squad info
                    break;
                case 'number-eight': //Check for Number 8
                    squad.numEight = getSquadInfo(squadArray, player); //Add number 8 using getSquadInfo helper function to append squad info
                    break;
                case 'scrum-half': //Check for Scrum half
                    squad.scrumHalf = getSquadInfo(squadArray, player); //Add scrum half using getSquadInfo helper function to append squad info
                    break;
                case 'out-half': //Ceck for out half
                    squad.outHalf = getSquadInfo(squadArray, player); //Add out half using getSquadInfo helper function to append squad info
                    break;
                case 'centre': //Check for centre
                    if(squad.centres.length < NUMPLAYERS) //2 centre
                        squad.centres.push(getSquadInfo(squadArray, player)); //Add centres using getSquadInfo helper function to append squad info
                    break;
                case 'winger': //Check for wingers
                    if(squad.wingers.length < NUMPLAYERS) //2 wingers
                        squad.wingers.push(getSquadInfo(squadArray, player)); //Add wingers using getSquadInfo helper function to append squad info
                    break;
                case 'full-back': //Check for full backs
                    squad.fullBack = getSquadInfo(squadArray, player); //Add full back using getSquadInfo helper function to append squad info
                    break;
            }
        }
    });
    return squad;
};

/**
 * Exported function that is called when the API is hit
 * It calls the FileRetrieval helper class to get the list of athletes and squads
 * in JSON format. Then uses helper functions in this class to build a rugby
 * team of 15 players in correct positions
 * @param callback
 */
var pickSquad = function(callback){
    fileRetrieval.retrieveCustomerFile(function(data){ //Get the JSON data
        var squadArray = data.squads;
        var playerArray = data.athletes;
        var squad = pickGameDay15(squadArray, playerArray); //Call helper functions to build 15 team players
        callback(squad); //Send the swaud data back
    })
};

exports.pickSquad = pickSquad;