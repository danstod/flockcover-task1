require('dotenv').config();
const expect = require('chai').expect;
const api = require('./apiUtil');
const nock = require('nock');
const _ = require('lodash');

let allDrones = {drones: [{"droneId":1,"numFlights":123,"name":"Retro Encabulator","currency":"USD","price":100000,"numCrashes":123},{"droneId":2,"numFlights":666,"name":"Flying Potato 3000","currency":"GBP","price":3000,"numCrashes":0},{"droneId":3,"numFlights":65537,"name":"DroneCat","currency":"EUR","price":10,"numCrashes":1728},{"droneId":4,"numFlights":33,"name":"Bob's favorite drone","currency":"USD","price":200000,"numCrashes":27},{"droneId":5,"numFlights":1729,"name":"O MY GOD IT'S FLYING","currency":"GBP","price":10,"numCrashes":28},{"droneId":6,"numFlights":78557,"name":"Icharus","currency":"EUR","price":100,"numCrashes":691},{"droneId":7,"numFlights":163,"name":"Tau Drone","currency":"USD","price":666,"numCrashes":2},{"droneId":8,"numFlights":0,"name":"Resistance is futile, you will be assimilated","currency":"USD","price":6565,"numCrashes":0},{"droneId":9,"numFlights":1,"name":"R2D2","currency":"Galaxy Credits","price":25,"numCrashes":1},{"droneId":10,"numFlights":4,"name":"Quarter","currency":"USD","price":17,"numCrashes":1},{"droneId":11,"numFlights":2000,"name":"Half","currency":"Monopoly Dollars","price":300,"numCrashes":1000},{"droneId":12,"numFlights":10000,"name":"Most","currency":"Large Rocks","price":999999,"numCrashes":8000}]};
let droneOne = {drone: {"droneId":1,"numFlights":123,"name":"Retro Encabulator","currency":"USD","price":100000,"numCrashes":123}};

const droneDataConfigs = {
    'drones': {
        baseUrl: 'https://bobs-epic-drone-shack-inc.herokuapp.com/api/v0/',
        dataName: 'drones',
        defaultEmptyData: []
    },
    'drone': {
        baseUrl: 'https://bobs-epic-drone-shack-inc.herokuapp.com/api/v0/',
        dataName: 'drone',
        defaultEmptyData: {}
    }
};

// const scope = nock(api.getDroneBaseUrl())
//     .get('/drones')
//     .reply(200, allDrones)
//     .get('/drone/1')
//     .reply(200, droneOne)
//     .get('/drone/2')
//     .reply(404);

describe('apiUtil: AxiosResponse', async () => {

    it('get all drones success', async () => {

        expect(allDrones.drones.length).to.equal(12);
        expect(_.isArray(allDrones.drones)).to.equal(true);

    });

    it('get one drone success', async () => {

        expect(_.isObject(droneOne.drone)).to.equal(true);

    });

    it('get all drones success', async () => {

        let result = await api.getAxiosResponse('/drones', droneDataConfigs['drones']);
        // console.log(result);
        expect(result.data.statusCode).to.equal(200);
        expect(_.isArray(result.data.drones)).to.equal(true);
        expect(result.data.drones.length).to.equal(12);

    });

    it('get drones id = 1 success', async () => {

        let result = await api.getAxiosResponse('/drone/1', droneDataConfigs['drone']);
        // console.log(result);
        expect(result.data.statusCode).to.equal(200);
        expect(_.isObject(result.data.drone)).to.equal(true);
        expect(result.data.drone.name).to.equal('Retro Encabulator');
    });

    it('get drones id = 100 success', async () => {

        let result = await api.getAxiosResponse('/drone/100', droneDataConfigs['drone']);
        // console.log(result);
        expect(result.data.statusCode).to.equal(404);
        expect(_.isObject(result.data.drone)).to.equal(true);
        expect(result.data.drone).to.deep.equal({});
    });
});

describe('apiUtil: AxiosResponse with Cache', async () => {


    it('get all drones success', async () => {

        let result = await api.getResponse('/drones', droneDataConfigs['drones']);
        // console.log(result);
        expect(result.data.statusCode).to.equal(200);
        expect(_.isArray(result.data.drones)).to.equal(true);
        expect(result.data.drones.length).to.equal(12);

    });

    it('get drones id = 1 success', async () => {

        let result = await api.getResponse('/drone/1', droneDataConfigs['drone']);
        // console.log(result);
        expect(result.data.statusCode).to.equal(200);
        expect(_.isObject(result.data.drone)).to.equal(true);
        expect(result.data.drone.name).to.equal('Retro Encabulator');
    });

    it('get drones id = 100 success', async () => {

        let result = await api.getResponse('/drone/100', droneDataConfigs['drone']);
        // console.log(result);
        expect(result.data.statusCode).to.equal(404);
        expect(_.isObject(result.data.drone)).to.equal(true);
        expect(result.data.drone).to.deep.equal({});
    });


});
