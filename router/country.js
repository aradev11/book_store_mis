const router = require('express').Router();
const verfied = require("../middleware/protect");

const {
    allCountry,
    singleCountry,
    addCountry,
    deleteCountry,
    editCountry,
    addNewCityByCountry
} = require('../controller/country.controller');

router.get("/", allCountry);
router.get("/:id", singleCountry);
router.post("/", verfied ,addCountry);
router.delete("/:id", verfied, deleteCountry);
router.put("/:id", verfied, editCountry);
router.post("/:id/add-city", verfied, addNewCityByCountry);

module.exports = router;