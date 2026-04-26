// todoRouter.js : 할일 api 라우터 관리

const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const authToken = require("../middleware/authMiddleware");

// todo router
router.get("/get", authToken, todoController.getTodo);
router.post("/create", authToken, todoController.createTodo);
router.put("/update/:id", authToken, todoController.updateTodo);
router.delete("/delete/:id", authToken, todoController.deleteTodo);
router.put("/status/:id", authToken, todoController.status);

module.exports = router;