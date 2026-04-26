// todoRouter.js : 할일 api 라우터 관리

const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const authToken = require("../middleware/authMiddleware");

// todo router
router.get("/get", authToken, todoController.getTodo);
router.post("/create", authToken, todoController.createTodo);
router.put("/update", authToken, todoController.updateTodo);
router.delete("/delete", authToken, todoController.deleteTodo);

module.exports = router;