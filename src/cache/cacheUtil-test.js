const expect = require('chai').expect;
const cache = require('./cacheUtil');

describe('cacheUtil', async () => {

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

