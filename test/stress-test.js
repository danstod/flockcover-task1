const requestAsync = require('request-promise-native');
let baseUrl = 'http://localhost:5000';
let numOfReqs = 12;

/*
    Instructions:

    - Start redis by running `redis-server`
    (To clear the redis cache run: `redis-cli FLUSHALL`)

    - Start the server locally using `npm start`
    - Uncomment runStress(numOfReqs)
    - Run `node test/stress-test.js` in another terminal

 */

// uncomment to run
// runStress(numOfReqs);

function runStress(numOfReqs) {
    for(let i=1; i<=numOfReqs; i++) {
        runSingle(`${baseUrl}/drones/${i}`, i);
    }
}

function runSingle(url, counter) {
    let req = {
        url: url,
        method: 'get'
    };

    requestAsync(req).then(function (body) {
        let b = JSON.parse(body);
        console.log(new Date(), counter, b);

    }).catch(err => {
        console.log('err:', counter, err.statusCode);
    });
}
