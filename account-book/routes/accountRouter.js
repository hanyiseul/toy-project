
const express = require("express");
const router = express.Router();

const accountController = require("../controllers/accountController");
const authMidleware = require("../midleware/authMidleware");

router.get("/data", accountController.getAccountData);
router.get("/:id", authMidleware, accountController.getAccountDetail);
router.post("/register", authMidleware, accountController.registAccount);
router.put("/:id", authMidleware, accountController.updateAccount);
router.delete("/delete/:id", accountController.deleteAccount);
// router.get("/summary", accountController.getAccountSum);

module.exports = router;