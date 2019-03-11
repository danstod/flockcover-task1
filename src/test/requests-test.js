const expect = require('chai').expect;
const requestAsync = require('request-promise-native');
const _ = require('lodash');

// let baseUrl = 'http://localhost:5000';
let baseUrl = 'https://flock.herokuapp.com';


describe('GET Requests', () => {

    it('Get all drone with malformed id: request failure', (done) => {

        let url = `${baseUrl}/drones/abc!`;
        let req = {
            url: url,
            method: 'get'
        };

        requestAsync(req).then(function (body) {

        }).catch(err => {

            let b = JSON.parse(err.response.body);
            expect(b.message).to.deep.equal('the id param is not valid');
            expect(err.statusCode).to.equal(400);
        }).finally(() => {
            done();
        });
    });

    it('Get all drones: request success', (done) => {

        let url = `${baseUrl}/drones`;
        let req = {
            url: url,
            method: 'get'
        };

        let hasError = false;

        requestAsync(req).then(function (body) {
            let b = JSON.parse(body);
            // console.log(new Date(), b);
            expect(b.statusCode).to.equal(200);
            expect(_.isArray(b.drones)).to.equal(true);
            expect(b.drones.length).to.equal(12);

        }).catch(err => {

            hasError = true;
        }).finally(() => {
            expect(hasError).to.equal(false);
            done();
        });
    });

    it('Get drone with id = 1: request success', (done) => {

        let url = `${baseUrl}/drones/1`;
        let req = {
            url: url,
            method: 'get'
        };

        let hasError = false;

        requestAsync(req).then(function (body) {
            let b = JSON.parse(body);
            // console.log(new Date(), b);
            expect(b.statusCode).to.equal(200);
            expect(_.isObject(b.drone)).to.equal(true);
            expect(b.drone.name).to.equal('Retro Encabulator');

        }).catch(err => {

            hasError = true;
        }).finally(() => {
            expect(hasError).to.equal(false);
            done();
        });

    });

    it('Get drone with id = 100: request failure and returns empty drone data', (done) => {

        let url = `${baseUrl}/drones/100`;
        let req = {
            url: url,
            method: 'get'
        };

        requestAsync(req).then(function (body) {
            let b = JSON.parse(body);
            console.log(new Date(), b);

        }).catch(err => {

            let b = JSON.parse(err.response.body);
            expect(b.drone).to.deep.equal({});
            expect(err.statusCode).to.equal(404);

        }).finally(() => {
            done();
        });

    });

    it('Get unsupported route: request failure', (done) => {

        let url = `${baseUrl}/dronesAreTakingOver`;
        let req = {
            url: url,
            method: 'get'
        };

        requestAsync(req).then(function (body) {
            let b = JSON.parse(body);
            // console.log(new Date(), b);

        }).catch(err => {
            let b = JSON.parse(err.response.body);
            expect(b.message).to.deep.equal('No GET available for /dronesAreTakingOver');
            expect(err.statusCode).to.equal(400);

        }).finally(() => {
            done();
        });
    });

});
