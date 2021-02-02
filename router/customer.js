const router = require('express').Router();
const verfied = require('./verifyToken');

const {
    allCustomer,
    singleCustomer,
    addCustomer,
    deleteCustomer,
    editCustomer
} = require("../controller/customer.controller");

router.get('/', allCustomer);
router.get('/:id', singleCustomer);
router.post('/', verfied, addCustomer);
router.delete('/:id', verfied, deleteCustomer);
router.put('/:id', verfied, editCustomer);
    

module.exports = router;