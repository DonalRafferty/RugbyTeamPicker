'use strict';

var expect = require('chai').expect,
    request = require('supertest'),
    app = require('../../server'),
    agent = request.agent(app);

/**
 * Squad routes tests
 */
describe('Squad route tests', function () {

    describe('Positive cases', function () {
        it('should 200 with a non empty body response', function (done) {
            agent.get('/squads')
                .expect(200)
                .end(function (custSaveErr, custSaveRes) {
                    expect(custSaveRes.body).to.not.be.empty;
                    expect(custSaveRes.body).to.be.ok;
                    // Call the assertion callback
                    done(custSaveErr);
                });
        });
        it('should return a list of athletes in each of the positions required on a rugby team', function (done) {
            agent.get('/squads')
                .expect(200)
                .end(function (custSaveErr, custSaveRes) {
                    expect(custSaveRes.body).to.include.keys('props');
                    expect(custSaveRes.body).to.include.keys('hooker');
                    expect(custSaveRes.body).to.include.keys('locks');
                    expect(custSaveRes.body).to.include.keys('flankers');
                    expect(custSaveRes.body).to.include.keys('numEight');
                    expect(custSaveRes.body).to.include.keys('scrumHalf');
                    expect(custSaveRes.body).to.include.keys('outHalf');
                    expect(custSaveRes.body).to.include.keys('centres');
                    expect(custSaveRes.body).to.include.keys('wingers');
                    expect(custSaveRes.body).to.include.keys('fullBack');
                    // Call the assertion callback
                    done(custSaveErr);
                });
        });
        it('should return with 2 props, 1 hooker, 2 locks, 2 flankers, 1 number 8, 1 scrum half, 1 out half, 2 centres, 2 wingers, 1 full back', function (done) {
            agent.get('/squads')
                .expect(200)
                .end(function (custSaveErr, custSaveRes) {
                    expect(custSaveRes.body.props.length).to.equal(2);
                    expect(typeof custSaveRes.body.hooker).to.equal('object');
                    expect(custSaveRes.body.locks.length).to.equal(2);
                    expect(custSaveRes.body.flankers.length).to.equal(2);
                    expect(typeof custSaveRes.body.numEight).to.equal('object');
                    expect(typeof custSaveRes.body.scrumHalf).to.equal('object');
                    expect(typeof custSaveRes.body.outHalf).to.equal('object');
                    expect(custSaveRes.body.centres.length).to.equal(2);
                    expect(custSaveRes.body.wingers.length).to.equal(2);
                    expect(typeof custSaveRes.body.fullBack).to.equal('object');
                    // Call the assertion callback
                    done(custSaveErr);
                });
        });
        it('should return with players in a particular JSON structure', function (done) {
            agent.get('/squads')
                .expect(200)
                .end(function (custSaveErr, custSaveRes) {
                    expect(custSaveRes.body.props[0]).to.include.keys('avatar_url', 'squad_id', 'country', 'last_played', 'name', 'position', 'is_injured', 'id', 'squad');
                    expect(custSaveRes.body.hooker).to.include.keys('avatar_url', 'squad_id', 'country', 'last_played', 'name', 'position', 'is_injured', 'id', 'squad');
                    expect(custSaveRes.body.locks[0]).to.include.keys('avatar_url', 'squad_id', 'country', 'last_played', 'name', 'position', 'is_injured', 'id', 'squad');
                    expect(custSaveRes.body.flankers[0]).to.include.keys('avatar_url', 'squad_id', 'country', 'last_played', 'name', 'position', 'is_injured', 'id', 'squad');
                    expect(custSaveRes.body.numEight).to.include.keys('avatar_url', 'squad_id', 'country', 'last_played', 'name', 'position', 'is_injured', 'id', 'squad');
                    expect(custSaveRes.body.scrumHalf).to.include.keys('avatar_url', 'squad_id', 'country', 'last_played', 'name', 'position', 'is_injured', 'id', 'squad');
                    expect(custSaveRes.body.outHalf).to.include.keys('avatar_url', 'squad_id', 'country', 'last_played', 'name', 'position', 'is_injured', 'id', 'squad');
                    expect(custSaveRes.body.centres[0]).to.include.keys('avatar_url', 'squad_id', 'country', 'last_played', 'name', 'position', 'is_injured', 'id', 'squad');
                    expect(custSaveRes.body.wingers[0]).to.include.keys('avatar_url', 'squad_id', 'country', 'last_played', 'name', 'position', 'is_injured', 'id', 'squad');
                    expect(custSaveRes.body.fullBack).to.include.keys('avatar_url', 'squad_id', 'country', 'last_played', 'name', 'position', 'is_injured', 'id', 'squad');
                    // Call the assertion callback
                    done(custSaveErr);
                });
        });
    });
});