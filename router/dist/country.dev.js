"use strict";

var router = require('express').Router();

var verfied = require("./verifyToken");

var _require = require('../controller/country.controller'),
    allCountry = _require.allCountry,
    singleCountry = _require.singleCountry,
    addCountry = _require.addCountry,
    deleteCountry = _require.deleteCountry,
    editCountry = _require.editCountry,
    addNewCityByCountry = _require.addNewCityByCountry;

router.get("/", allCountry);
router.get("/:id", singleCountry);
router.post("/", verfied, addCountry);
router["delete"]("/:id", verfied, deleteCountry);
router.put("/:id", verfied, editCountry);
router.post("/:id/add-city", verfied, addNewCityByCountry);
module.exports = router;