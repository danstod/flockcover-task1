//https://www.npmjs.com/package/redis-mock
const asyncRedis = require("async-redis");
let client = asyncRedis.createClient();
client.on('error', function(err) {
    console.error('Error connecting to redis', err);
});

// client.flushall( function (err, succeeded) {
//     console.log(succeeded); // will be true if successfull
// });

// this key will expire after 10 seconds
// client.set('key', 'value!', 'EX', 10);

async function update(key, val) {
    await client.set(key, val);
}

async function get(key) {

    if(client.connected) {
        let val = await client.get(key);
        return getResponse(true, val);
    }
    else {
        return {connected: false};
    }
}

function getResponse(connected, val) {
    let res = { connected: connected, val: val, cacheHit: true };

    if(!val) {
        res.cacheHit = false;
    }

    return res;
}

async function flush(key) {
    await client.del(key);
}

module.exports = {
    update,
    get,
    flush
};
