const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Task = require("../../models/Task");
const Board = require("../../models/Board");
const User = require("../../models/User");

router.get("/", (req, res) => {
    const { taskId } = req.body;

    Task.findById(taskId)
        .then(task => res.json(task))
        .catch(res.status(404).json({ error : "Task not found" }))
})

router.post("/", (req, res) => {
    const { boardId, bucket, assignedId } = req.body.task;

    const newTask = new Task({
        board_id: boardId,
        bucket,
        assigned_id: assignedId
    })

    newTask.save()
        .then(task => {
            res.json(task);
        })
        .catch(res.status(422).json({ error: "Unprocessable Entity" }))
})