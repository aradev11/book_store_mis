const router = require("express").Router();
const verfied = require("../middleware/protect");

const {
    allContract,
    getSingleContract,
    addContract,
    deleteContract,
    editContract
} = require("../controller/contract.controller");

router.get('/', verfied, allContract);
router.get('/:id', verfied, getSingleContract);
router.post('/', verfied, addContract);
router.delete('/:id', verfied, deleteContract);
router.put('/:id', verfied, editContract);

