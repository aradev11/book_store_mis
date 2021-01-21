const router = require('express').Router();
const verfied = require('./verifyToken');

router.get('/', verfied, (req, res) => {
    res.send(req.user);
});

module.exports = router;