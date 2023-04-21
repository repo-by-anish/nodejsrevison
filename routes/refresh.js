const express = require("express");
const refreshConntroller = require("../controllers/refreshTokenController");
const router=express.Router();

router.get("/",refreshConntroller.handleRefreshToken);

module.exports = router;