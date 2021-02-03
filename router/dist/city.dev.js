"use strict";

var router = require('express').Router();

var verfied = require('../middleware/protect');

var _require = require("../controller/city.controller"),
    allCity = _require.allCity,
    singleCity = _require.singleCity,
    addCity = _require.addCity,
    deleteCity = _require.deleteCity,
    editCity = _require.editCity;

router.get('/', allCity);
router.get('/:id', singleCity);
router.post('/', verfied, addCity);
router["delete"]('/:id', verfied, deleteCity);
router.put('/:id', verfied, editCity);
module.exports = router;