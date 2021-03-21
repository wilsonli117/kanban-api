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
    const { title, description, boardId, bucket, assignedId } = req.body;

    const newTask = new Task({
        title,
        description,
        board_id: boardId,
        bucket,
        assigned_id: assignedId 
    })

    newTask.save()
        .then(task => {
            Board.findById(boardId)
                .then(board => {
                    board.tasks.push(task.id)
                    board.save()
                        .then(() => {
                            if(task.assigned_id) {
                                User.findById(assignedId)
                                    .then(user => {
                                        user.assignedTasks.push(task.id)
                                        user.save()
                                            .then(() => res.json(task))
                                    })
                            } else {
                                res.json(task);
                            }
                        })
                        .catch(error => console.log(error))
                })
        })
        .catch(error => console.log(error))
})

router.delete("/", (req, res) => {
    const taskId = req.body.taskId

    Task.findByIdAndDelete(taskId)
        .then((task) => {
            Board.findById(task.board_id)
                .then(board => {
                    board.tasks.splice(board.tasks.indexOf(task.id), 1)
                    board.save()
                        .then(() => {
                            if (task.assigned_id) {
                                User.findById(task.assigned_id)
                                    .then(user => {
                                        user.assignedTasks.splice(user.boards.indexOf(taskId), 1)
                                        user.save()
                                            .then(() => {
                                                res.status(200).json({ success: "Task successfully removed" })
                                            })
                                            .catch(error => console.log(error));
                                    })
                            } else {
                                res.status(200).json({ success: "Task successfully removed" })
                            }
                        })
                })

    
        })
        .catch(error => console.log(error));
})

module.exports = router;