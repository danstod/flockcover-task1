require('dotenv').config();
const expect = require('chai').expect;
const cache = require('./cacheUtil');

describe('cacheUtil', async () => {

    it('Is connected to Redis AWS instance', async () => {

        let result = cache.getClient();
        let redisAWSAddress = 'ec2-63-35-89-186.eu-west-1.compute.amazonaws.com:7579';

        if(process.env.hasOwnProperty('REDIS_URL')) {
            expect(result.address).to.equal(redisAWSAddress);
        }
        else {
            expect(result.address).to.equal('127.0.0.1:6379');
        }

    });

    it('no hit on the cache', async () => {

        let result = await cache.get('123');
        if(result.connected) {
            expect(result.cacheHit).to.equal(false);
        }
        else {
            expect(result.connected).to.equal(false);
        }
    });

    it('has hit on the cache', async () => {

        if(cache.isConnected()) {
            await cache.update('stod', 'is dan');
            let result = await cache.get('stod');
            if(result.connected) {
                expect(result.val).to.equal('is dan');
            }
            else {
                expect(result.connected).to.equal(false);
            }
        }


    });

});

