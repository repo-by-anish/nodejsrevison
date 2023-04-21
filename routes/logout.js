const express = require("express");
const logoutConntroller = require("../controllers/logoutController");
const router=express.Router();

router.get("/",logoutConntroller.handleLogout);

module.exports = router;