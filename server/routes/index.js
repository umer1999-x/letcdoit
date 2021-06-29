const router = require("express").Router();
require("../db/connection.js");

router.use(require("./api/get.js"));
router.use(require("./api/post.js"));



module.exports = router;