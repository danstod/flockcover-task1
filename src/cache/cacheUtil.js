const asyncRedis = require("async-redis");
let client = asyncRedis.createClient(process.env.REDIS_URL);
client.on('error', function(err) {
    console.error('Error connecting to redis', err);
});

function getClient() {
    return client;
}
function isConnected() {
    return client.connected;
}

//default expiry is 30 minutes (1800 seconds)
async function update(key, val, expiry = 1800) {
    await client.set(key, val, 'EX', expiry);
}

async function get(key) {

    if(client.connected) {
        let val = await client.get(key);
        return getResponse(true, val);
    }
    else {
        return {connected: false, cacheHit: false};
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
    getClient,
    isConnected,
    update,
    get,
    flush
};
