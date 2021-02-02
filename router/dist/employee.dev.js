"use strict";

var router = require('express').Router();

var verfied = require('./verifyToken');

var _require = require('../controller/employee.controller'),
    allEmployee = _require.allEmployee,
    singleEmployee = _require.singleEmployee,
    addEmployee = _require.addEmployee,
    deleteEmployee = _require.deleteEmployee,
    editEmployee = _require.editEmployee,
    addUserAccount = _require.addUserAccount;

router.get('/', verfied, allEmployee);
router.get('/:id', verfied, singleEmployee);
router.post('/', verfied, addEmployee);
router.post('/:id/user', verfied, addUserAccount);
router["delete"]("/:id", verfied, deleteEmployee);
router.put('/:id', verfied, editEmployee);
module.exports = router;