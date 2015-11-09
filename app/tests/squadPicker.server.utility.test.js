'use strict';

var expect = require('chai').expect,
    request = require('supertest'),
    app = require('../../server'),
    agent = request.agent(app),
    squadPicker = require('../utilities/squadPicker.server.utility'),
    rewire = require('rewire'),
    squadPickerMock, getSquadInfoMock, pickGameDay15Mock;

/**
 * SquadPicker utility tests
 */

describe('SquadPicker tests', function () {

    beforeEach(function (done) {
        squadPickerMock = rewire('../utilities/squadPicker.server.utility');
        getSquadInfoMock = squadPickerMock.__get__('getSquadInfo');
        pickGameDay15Mock = squadPickerMock.__get__('pickGameDay15');
        done();
    });

    describe('Positive tests', function () {

        it('should return the team squad list', function (done) {
            squadPicker.pickSquad(function (completeTeam) {
                expect(completeTeam).to.not.be.empty;
                expect(completeTeam).to.be.ok;
                done();
            });
        });
        it('should return the team list with the squad info attached', function (done) {
            squadPicker.pickSquad(function (completeTeam) {
                expect(completeTeam.props[0]).to.include.keys('squad');
                expect(completeTeam.hooker).to.include.keys('squad');
                expect(completeTeam.locks[0]).to.include.keys('squad');
                expect(completeTeam.flankers[0]).to.include.keys('squad');
                expect(completeTeam.numEight).to.include.keys('squad');
                expect(completeTeam.scrumHalf).to.include.keys('squad');
                expect(completeTeam.outHalf).to.include.keys('squad');
                expect(completeTeam.centres[0]).to.include.keys('squad');
                expect(completeTeam.wingers[0]).to.include.keys('squad');
                expect(completeTeam.fullBack).to.include.keys('squad');
                done();
            });
        });
        it('should append the correct squad info to the player object', function (done) {
            var mockSquadArray = [{
                'club': 'Kenegy',
                'name': 'Squad 3',
                'id': 3
            }];
            var mockPlayer = {
                'avatar_url': 'https://kitmanlabs.com/avatars/athletes/38.jpg',
                'squad_id': 3,
                'country': 'Saint Vincent and The Grenadines',
                'last_played': 'Sun May 10 2015 09:47:43 GMT+0000 (UTC)',
                'name': 'Mercedes Whitehead',
                'position': 'prop',
                'is_injured': false,
                'id': 38
            };

            expect(getSquadInfoMock(mockSquadArray, mockPlayer)).to.deep.equal({
                'avatar_url': 'https://kitmanlabs.com/avatars/athletes/38.jpg',
                'squad_id': 3,
                'country': 'Saint Vincent and The Grenadines',
                'last_played': 'Sun May 10 2015 09:47:43 GMT+0000 (UTC)',
                'name': 'Mercedes Whitehead',
                'position': 'prop',
                'is_injured': false,
                'id': 38,
                'squad': {
                    'club': 'Kenegy',
                    'name': 'Squad 3',
                    'id': 3
                }
            });
            done();
        });
        it('return with an object with player positions mapped out correctly', function (done) {
            var mockPlayerArray = [
                {
                    'avatar_url': 'https://kitmanlabs.com/avatars/athletes/0.jpg',
                    'squad_id': 5,
                    'country': 'Korea (North)',
                    'last_played': 'Sun Mar 15 2015 15:58:00 GMT+0000 (UTC)',
                    'name': 'Meagan Gill',
                    'position': 'prop',
                    'is_injured': true,
                    'id': 0
                },
                {
                    'avatar_url': 'https://kitmanlabs.com/avatars/athletes/1.jpg',
                    'squad_id': 2,
                    'country': 'Falkland Islands (Malvinas)',
                    'last_played': 'Thu Mar 05 2015 19:46:18 GMT+0000 (UTC)',
                    'name': 'Hillary Wiggins',
                    'position': 'full-back',
                    'is_injured': false,
                    'id': 1
                },
                {
                    'avatar_url': 'https://kitmanlabs.com/avatars/athletes/2.jpg',
                    'squad_id': 8,
                    'country': 'Bulgaria',
                    'last_played': 'Fri Sep 11 2015 14:52:35 GMT+0000 (UTC)',
                    'name': 'Bright Hicks',
                    'position': 'centre',
                    'is_injured': true,
                    'id': 2
                }];
            var mockSquadArray = [{
                'club': 'Namebox',
                'name': 'Squad 2',
                'id': 2
            }, {
                'club': 'Fossiel',
                'name': 'Squad 5',
                'id': 5
            }, {
                'club': 'Comvey',
                'name': 'Squad 8',
                'id': 8
            }];
            expect(pickGameDay15Mock(mockSquadArray, mockPlayerArray)).to.deep.equal({'props':[],'hooker':{},'locks':[],'flankers':[],'numEight':{},'scrumHalf':{},'outHalf':{},'centres':[],'wingers':[],'fullBack':{'avatar_url':'https://kitmanlabs.com/avatars/athletes/1.jpg','squad_id':2,'country':'Falkland Islands (Malvinas)','last_played':'Thu Mar 05 2015 19:46:18 GMT+0000 (UTC)','name':'Hillary Wiggins','position':'full-back','is_injured':false,'id':1,'squad':{'club':'Namebox','name':'Squad 2','id':2}}});
            done();
        });
    });

});