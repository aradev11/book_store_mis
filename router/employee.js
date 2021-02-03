const router = require('express').Router();
const verfied = require('../middleware/protect');

const {
    allEmployee,
    singleEmployee,
    addEmployee,
    deleteEmployee,
    editEmployee,
    addUserAccount
} = require('../controller/employee.controller');

router.get('/', verfied, allEmployee);
router.get('/:id', verfied, singleEmployee);
router.post('/', verfied, addEmployee);
router.post('/:id/user', verfied, addUserAccount);
router.delete("/:id", verfied, deleteEmployee);
router.put('/:id', verfied, editEmployee);


module.exports = router;