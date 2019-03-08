const droneBaseUrl = 'https://bobs-epic-drone-shack-inc.herokuapp.com/api/v0/';
const axios = require('axios');

const axiosInstance = axios.create({
    baseURL: droneBaseUrl,
    timeout: 10000,
});

const retries = 10;
const initialDelay = 500;

const expectedData = {
    'drones': {
        dataName: 'drones',
        defaultEmptyData: []
    },
    'drone': {
        dataName: 'drone',
        defaultEmptyData: {}
    }
};

async function getAxiosResponse(route, dataName, counter = 0, retry = true) {

    let response;
    try {
        console.log(`try ${route} counter: ${counter}, dataName: ${dataName}, retry: ${retry}`);
        response = await axiosInstance.get(route);
    }
    catch (err) {
        // console.log('getAxiosResponse.err:', err);
        if(retry) {
            counter++;
            if (counter > retries) {
                return getNoDataResponse(dataName);
            }
            else {
                await new Promise((resolve, reject) => setTimeout(resolve, initialDelay));
                return await getAxiosResponse(route, dataName, counter);
            }
        }
    }

    let dataRes = {};

    if(!isEmpty(response.data)) {
        console.log('data retrieved from service for route:' + route);
        dataRes = getDataResponse(dataName, response.data, 200);
    }
    else {
        console.log('null data retrieved from service for route:' + route);
        dataRes = getNoDataResponse(dataName);
    }

    return dataRes;
}

function getDroneBaseUrl() {
    return droneBaseUrl;
}

function getNoDataResponse(dataName) {
    return getDataResponse(dataName, expectedData[dataName].defaultEmptyData, 404);
}
function getDataResponse(dataName, data, statusCode) {

    let ds = expectedData[dataName];
    let dataResponse = {};
    dataResponse[ds.dataName] = data;
    dataResponse['statusCode'] = statusCode;

    return { data: dataResponse };
}

function isEmpty(value){
    return  value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0) ||
        (typeof value === 'array' && value.length === 0)
}

module.exports = {
    getAxiosResponse,
    getDroneBaseUrl
};