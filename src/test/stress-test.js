const requestAsync = require('request-promise-native');
// let baseUrl = 'http://localhost:5000';
let baseUrl = 'https://flock.herokuapp.com';
let numOfReqs = 12;

/*
    Instructions:

    - Uncomment runStress(numOfReqs)
    - Run `node test/stress-test.js` in another terminal
 */

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

    console.log(`req: ${JSON.stringify(req)}`);

    requestAsync(req).then(function (body) {
        let b = JSON.parse(body);
        console.log(new Date(), counter, b);

    }).catch(err => {
        console.log('err:', counter, err.statusCode);
    });
}
