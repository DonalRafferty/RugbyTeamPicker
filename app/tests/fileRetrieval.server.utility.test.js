'use strict';

var expect = require('chai').expect,
    request = require('supertest'),
    app = require('../../server'),
    agent = request.agent(app),
    fileRetrieval = require('../utilities/fileRetrieval.server.utility');

/**
 * File retrieval utility tests
 */

describe('File retrieval utility tests', function () {

    it('should return the file list', function (done) {
        fileRetrieval.retrieveSquadFile(function (file) {
            expect(file).to.not.be.empty;
            expect(file).to.be.ok;
            done();
        });
    });
    it('should return the file list as JSON', function (done) {
        fileRetrieval.retrieveSquadFile(function (file) {
            expect(typeof file).to.equal('object');
            done();
        });
    });
    it('should return the file list as JSON with athletes and squads', function (done) {
        fileRetrieval.retrieveSquadFile(function (file) {
            expect(file).to.include.keys('athletes');
            expect(file).to.include.keys('squads');
            done();
        });
    });
    it('should return the file list as JSON with athletes and squads in array format', function (done) {
        fileRetrieval.retrieveSquadFile(function (file) {
            expect(file.athletes).to.be.instanceof(Array);
            expect(file.squads).to.be.instanceof(Array);
            done();
        });
    });
    it('should return the file list as JSON with athletes having a specific structure', function (done) {
        fileRetrieval.retrieveSquadFile(function (file) {
            expect(file.athletes[0]).to.include.keys('avatar_url', 'squad_id', 'country', 'last_played', 'name', 'position', 'is_injured', 'id');
            done();
        });
    });
    it('should return the file list as JSON with sqauds having a specific structure', function (done) {
        fileRetrieval.retrieveSquadFile(function (file) {
            expect(file.squads[0]).to.include.keys('club', 'name', 'id');
            done();
        });
    });

});