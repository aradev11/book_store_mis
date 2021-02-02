const router = require('express').Router();
const verfied = require('./verifyToken');

const {
    allCity,
    singleCity,
    addCity,
    deleteCity,
    editCity
} = require("../controller/city.controller");

router.get('/', allCity);
router.get('/:id', singleCity);
router.post('/', verfied, addCity);
router.delete('/:id', verfied, deleteCity);
router.put('/:id', verfied, editCity);
    

module.exports = router;