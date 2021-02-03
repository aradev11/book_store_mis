"use strict";

var router = require("express").Router();

var verfied = require('../middleware/protect');

var _require = require('../controller/transilator.controller'),
    allTransilator = _require.allTransilator,
    singleTransilator = _require.singleTransilator,
    addTransilator = _require.addTransilator,
    deleteTransilator = _require.deleteTransilator,
    editTransilator = _require.editTransilator;

router.get('/', allTransilator);
router.get("/:id", singleTransilator);
router.post("/", addTransilator);
router["delete"]("/:id", deleteTransilator);
router.put("/:id", verfied, editTransilator);
module.exports = router;