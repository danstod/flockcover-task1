const droneBaseUrl = 'https://bobs-epic-drone-shack-inc.herokuapp.com/api/v0/';
const axios = require('axios');

let axiosInstance = axios.create({
    baseURL: droneBaseUrl,
    timeout: 10000,
});

function getDroneBaseUrl() {
    return droneBaseUrl;
}

const noData = {};
const retries = 5;
const initialDelay = 500;

async function getAxiosResponse(route, counter) {

    if(!counter) {
        counter = 0;
    }

    let response;
    try {
        console.log(`try ${route} counter ${counter}`);
        response = await axiosInstance.get(route);
    }
    catch (err) {
        // console.log('getAxiosResponse.err:', err);
        counter++;
        if(counter > retries) {
            return { data: noData, statusCode: 404 };
        }
        else {
            await new Promise((resolve, reject) => setTimeout(resolve, initialDelay));
            return await getAxiosResponse(route, counter);
        }
    }

    let dataRes = {};

    if(response.data !== null) {
        console.log('data retrieved from service');
        dataRes['data'] = response.data;
        dataRes['statusCode'] = 200;
    }
    else {
        console.log('null data retrieved from service');
        dataRes['data'] = noData;
        dataRes['statusCode'] = 404;
    }

    return dataRes;
}

module.exports = {
    getAxiosResponse,
    getDroneBaseUrl
};