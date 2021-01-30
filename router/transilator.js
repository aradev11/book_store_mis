const router = require("express").Router();
const verfied = require('./verifyToken');

const {
    allTransilator,
    singleTransilator,
    addTransilator,
    deleteTransilator,
    editTransilator
} = require('../controller/transilator.controller');

router.get('/', allTransilator);
router.get("/:id", singleTransilator);
router.post("/", addTransilator);
router.delete("/:id", deleteTransilator);
router.put("/:id", verfied, editTransilator);

module.exports = router;