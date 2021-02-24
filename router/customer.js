const router = require('express').Router();
const verfied = require('../middleware/protect');

const {
    allCustomer,
    singleCustomer,
    addCustomer,
    deleteCustomer,
    editCustomer
} = require("../controller/customer.controller");

router.get('/', verfied, allCustomer);
router.get('/:id', verfied, singleCustomer);
router.post('/', verfied, addCustomer);
router.delete('/:id', verfied, deleteCustomer);
router.put('/:id', verfied, editCustomer);
    

module.exports = router;