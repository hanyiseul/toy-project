// todoRouter.js : 할일 api 라우터 관리

const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController.js");
const authToken = require("../middleware/authToken");

// todo router
router.get("/", authToken, todoController.getTodo);
router.post("/", authToken, todoController.createTodo);
router.put("/:id", authToken, todoController.updateTodo);
router.delete("/:id", authToken, todoController.deleteTodo);