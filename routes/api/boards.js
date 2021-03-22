const express = require("express");
const router = express.Router();
const Board = require("../../models/Board");
const User = require("../../models/User");

router.get("/", (req, res) => {
    const boardId = req.body.boardId;
    Board.findById(boardId)
        .then(board => res.json(board))
        .catch(error => console.log(error))
})

router.post("/", (req, res) => {
    const { name, userId } = req.body;

    const newBoard = new Board({
        name,
        user_id: userId,
        buckets: ["Todo", "In Progress", "Done"],
        tasks: []
    })

    newBoard.save()
        .then(board => {
            User.findById(userId)
                .then(user => {
                    const boardId = board.id
                    user.boards.push(boardId);
                    user.save()
                        .then(res.json(board))
                })

        })
        .catch(error => console.log(error))
})

router.delete("/", (req, res) => {
    const boardId = req.body.boardId;

    Board.findByIdAndDelete(boardId)
        .then(board => {
            User.findById(board.user_id)
                .then(user => {
                    user.boards.splice(user.boards.indexOf(boardId), 1)
                    user.save()
                        .then(() => {
                            res.status(200).json({ success: "Board successfully removed" })
                        })
                        .catch(error => console.log(error));
                })
        })
        .catch(error => console.log(error));
})

module.exports = router;