const router = require("express").Router();
const verfied = require('../middleware/protect');

const {
    getAllPublisher,
    getSinglePublisher,
    addPublisher,
    deletePublisher,
    updatePublisher
} = require("../controller/publisher.controller.js");

router.get("/", verfied, getAllPublisher);
router.get("/:id", verfied, getSinglePublisher);
router.post("/", verfied, addPublisher);
router.delete('/:id', verfied, deletePublisher);
router.put("/:id", verfied, updatePublisher);

module.exports = router;