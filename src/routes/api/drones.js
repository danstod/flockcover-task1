"use strict";

const cache = require('../../cache/cacheUtil');
const apiUtil = require('../api/apiUtil');
const updateCache = false;

async function getAllDrones(req, res) {

    try {
        let dataRes = await getDataResponse('/drones');
        sendResponse(res, dataRes);

    } catch (error) {
        console.error('getAllDrones.error', error);
        res.status(400).send('service not available Stod');
    }
}

async function getDrone(req, res) {
    let id = req.params.id;

    try {
        let route = `/drone/${id}`;
        let dataRes = await getDataResponse(route);
        sendResponse(res, dataRes);

    } catch (error) {
        console.error(`getDrone id:${id}.error`, error.response);
        res.status(400).send('service not available Stod');
    }
}

async function getDataResponse(route) {
    let dataRes = {};
    let result = await cache.get(route);

    if(result.connected && result.cacheHit) {
        console.log('data retrieved from cache');
        dataRes = {statusCode: 200, data: JSON.parse(result.val)};
    }
    else {
        dataRes = await apiUtil.getAxiosResponse(route, 0);
        if(updateCache) {
            await cache.update(route, JSON.stringify(dataRes.data));
        }
    }

    return dataRes;
}

function sendResponse(res, dataRes) {
    res.status(dataRes.statusCode).json(dataRes.data);
}

module.exports = {
    getAllDrones,
    getDrone
};
