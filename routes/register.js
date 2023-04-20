const express = require("express");
const registerControllers=require("../controllers/registerControllers");
const router=express.Router();

router.post("/",registerControllers.handleNewUser);

module.exports = router;