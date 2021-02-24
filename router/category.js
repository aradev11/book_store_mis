const router = require('express').Router();
const verfied = require('../middleware/protect');

const {
    getAllCat,
    getSingleCat,
    addCat,
    deleteCat,
    updateCat
} = require("../controller/category.controller");

// GET ALL CATEGORIES FROM DB
router.get("/", verfied, getAllCat);
// GET SINGLE CATEGORY FRO DB
router.get("/:id", verfied, getSingleCat);
// POST CATEGORY TO DB
router.post("/", verfied, addCat);
// EDIT CATEGORY FROM DB
router.put("/:id", verfied, updateCat);
// DELETE CATEGORY FROM DB
router.delete("/:id", verfied, deleteCat);

module.exports = router;