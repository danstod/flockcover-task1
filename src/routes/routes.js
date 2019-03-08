const drones = require('./api/drones');
let router = require('express').Router();

router.get("/drones", drones.getAllDrones);
router.get("/drones/:id", drones.getDrone);

router.post('/*', async function (req, res, next) {
    res.send({statusCode: 400, message: 'No POST available for ' + req.url});
});

router.put('/*', async function (req, res, next) {
    res.send({statusCode: 400, message: 'No PUT available for ' + req.url});
});

router.get('/*', async function (req, res, next) {
    res.send({statusCode: 400, message: 'No GET available for ' + req.url});
});

module.exports = router;