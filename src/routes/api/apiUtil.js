const axios = require('axios');
const cache = require('../../cache/cacheUtil');
const updateCache = true;
const urlMap = new Map();
const retries = 10;
const retryDelay = 500;

function getAxiosInstance(url) {
    if(!urlMap.has(url)) {
        let axiosInstance = axios.create({
            baseURL: url,
            timeout: 10000,
        });
        urlMap.set(url, axiosInstance);
    }

    return urlMap.get(url);
}

function idParamIsValid(id) {

    let num = Number(id);
    return !Number.isNaN(num);
}

async function getResponse(route, dataConfig) {

    let dataRes = {};
    let result = await cache.get(route);

    if(result.connected && result.cacheHit) {
        console.log('data retrieved from cache for route: ' + route);
        dataRes = {statusCode: 200, data: JSON.parse(result.val)};
    }
    else {
        dataRes = await getAxiosResponse(route, dataConfig);
        if(result.connected && updateCache) {
            await cache.update(route, JSON.stringify(dataRes.data));
        }
    }

    return dataRes;
}

async function getAxiosResponse(route, dataConfig, counter = 0, retry = true) {

    let response = {};
    try {
        let axiosInstance = getAxiosInstance(dataConfig.baseUrl);
        console.log(`try ${route} counter: ${counter}, dataName: ${dataConfig.dataName}, retry: ${retry}`);
        response = await axiosInstance.get(route);
    }
    catch (err) {
        // console.log('getAxiosResponse.err:', err);
        if(retry) {
            counter++;
            if (counter > retries) {
                return getNoDataResponse(dataConfig);
            }
            else {
                //increment the delay on each retry
                let delay = retryDelay * counter;
                await new Promise((resolve, reject) => setTimeout(resolve, delay));
                return await getAxiosResponse(route, dataConfig, counter);
            }
        }
    }

    let dataRes = {};

    if(!isEmpty(response.data)) {
        console.log('data retrieved from service for route:' + route);
        dataRes = getDataResponse(dataConfig, response.data, 200);
    }
    else {
        console.log('null data retrieved from service for route:' + route);
        dataRes = getNoDataResponse(dataConfig);
    }

    return dataRes;
}

function getNoDataResponse(dataConfig) {
    return getDataResponse(dataConfig, dataConfig.defaultEmptyData, 404);
}
function getDataResponse(dataConfig, data, statusCode) {

    let dataResponse = {};
    dataResponse[dataConfig.dataName] = data;
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
    getResponse,
    idParamIsValid
};