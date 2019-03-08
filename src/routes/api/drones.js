"use strict";

const cache = require('../../cache/cacheUtil');
const apiUtil = require('../api/apiUtil');
const updateCache = true;

async function getAllDrones(req, res) {

    try {
        let dataStructureName = 'drones';
        let dataRes = await getDataResponse('/drones', dataStructureName);
        sendResponse(res, dataRes);

    } catch (error) {
        console.error('getAllDrones.error', error);
        res.status(400).send('service not available');
    }
}

async function getDrone(req, res) {
    let id = req.params.id;

    try {
        let route = `/drone/${id}`;
        let dataStructureName = 'drone';
        let dataRes = await getDataResponse(route, dataStructureName);
        sendResponse(res, dataRes);

    } catch (error) {
        console.error(`getDrone id:${id}.error`, error.response);
        res.status(400).send('service not available');
    }
}

async function getDataResponse(route, dataName) {
    let dataRes = {};
    let result = await cache.get(route);

    if(result.connected && result.cacheHit) {
        console.log('data retrieved from cache for route: ' + route);
        dataRes = {statusCode: 200, data: JSON.parse(result.val)};
    }
    else {
        dataRes = await apiUtil.getAxiosResponse(route, dataName);
        if(updateCache) {
            await cache.update(route, JSON.stringify(dataRes.data));
        }
    }

    return dataRes;
}

function sendResponse(res, dataRes) {
    res.status(dataRes.data.statusCode).json(dataRes.data);
}

module.exports = {
    getAllDrones,
    getDrone
};
