"use strict";

const apiUtil = require('../api/apiUtil');

const dataConfigs = {
    'drones': {
        baseUrl: 'https://bobs-epic-drone-shack-inc.herokuapp.com/api/v0/',
        dataName: 'drones',
        defaultEmptyData: []
    },
    'drone': {
        baseUrl: 'https://bobs-epic-drone-shack-inc.herokuapp.com/api/v0/',
        dataName: 'drone',
        defaultEmptyData: {}
    }
};

async function getAllDrones(req, res) {

    try {
        let routePath = `/drones`;
        let dataRes = await apiUtil.getResponse(routePath, dataConfigs['drones']);
        sendResponse(res, dataRes);

    } catch (error) {
        console.error('getAllDrones.error', error);
        res.status(400).send('service not available');
    }
}

async function getDrone(req, res) {
    let id = req.params.id;

    try {
        let routePath = `/drone/${id}`;
        let dataRes = await apiUtil.getResponse(routePath, dataConfigs['drone']);
        sendResponse(res, dataRes);

    } catch (error) {
        console.error(`getDrone id:${id}.error`, error.response);
        res.status(400).send('service not available');
    }
}


function sendResponse(res, dataRes) {
    res.status(dataRes.data.statusCode).json(dataRes.data);
}

module.exports = {
    getAllDrones,
    getDrone
};
