
const express = require("express");
const router = express.Router();

const accountController = require("../controllers/accountController");

router.get("/data", accountController.getAccountData);
router.post("/register", accountController.registAccount);
// router.get("/summary", accountController.getAccountSum);

module.exports = router;