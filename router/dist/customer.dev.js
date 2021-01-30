"use strict";

var router = require('express').Router();

var verfied = require('./verifyToken');

var _require = require("../controller/customer.controller"),
    allCustomer = _require.allCustomer,
    singleCustomer = _require.singleCustomer,
    addCustomer = _require.addCustomer,
    deleteCustomer = _require.deleteCustomer,
    editCustomer = _require.editCustomer;

router.get('/', allCustomer);
router.get('/:id', singleCustomer);
router.post('/', verfied, addCustomer);
router["delete"]('/:id', verfied, deleteCustomer);
router.put('/:id', verfied, editCustomer);
module.exports = router;