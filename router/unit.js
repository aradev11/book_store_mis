const router =  require('express').Router();
const verfied = require("../middleware/protect");

const {
    getSingleUnit,
    getAllUnit,
    addUnit,
    deleteUnit,
    updateUnit
 } = require("../controller/unit.controller");

router.get("/",  verfied, getAllUnit);
router.get("/:id", verfied, getSingleUnit);
router.post("/", verfied, addUnit);
router.delete("/:id", verfied, deleteUnit);
router.put("/:id", verfied, updateUnit);

module.exports = router;
