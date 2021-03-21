const express = require("express");
const router = express.Router();
const Board = require("../../models/Board");
const User = require("../../models/User");

router.get("/", (req, res) => {
    const boardId = req.body.boardId;

    Board.findById(boardId)
        .then(board => res.json(board))
        .catch(error => res.status(404).json())
})

router.post("/", (req, res) => {
    const userId = req.body.userId;

    const newBoard = new Board({
        user_id: userId,
        buckets: ["Todo", "In Progress", "Done"],
        tasks: []
    })

    newBoard.save()
        .then(board => {
            User.findById(userId)
                .then(user => {
                    user.boards.push(board.id)
                    user.save()
                        .then(res.json(board))
                })

        })
        .catch(error => console.log(error))
})

router.delete("/", (req, res) => {
    const boardId = req.body.boardId;

    Board.findByIdAndDelete(boardId)
        .then(() => res.status(200).json({ success: "Board successfully removed" }))
        .catch(error => console.log(error));
})

module.exports = router;