const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const keys = require("../../config/keys")

router.post("/register", (req, res) => {
    User.findOne({ username: req.body.username })
        .then(user => {
            if (user) {
                return res.status(400).json({ username: "A user has already registered with this username" })
            } else {
                const newUser = new User({
                    username: req.body.username,
                    password: req.body.password
                })

                bcrypt.genSalt(10, (error, salt) => {
                    bcrypt.hash(newUser.password, salt, (error, hash) => {
                        if (error) throw error;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                const payload = { id: user.id, username: user.username };

                                jwt.sign(
                                    payload,
                                    keys.secretOrKey,
                                    { expiresIn: 3600 }, // key expires in one hour
                                    (err, token) => {
                                        res.json({
                                            success: true,
                                            token: "Bearer " + token
                                        });
                                    }
                                );
                            })
                            .catch(res.status(422).json({ error: "Unprocessable Entity"}));
                    })
                })

            }
        })
})

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username })
        .then(user => {
            if (!user) return res.status(404).json({ username: "This user does not exist" });

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = { id: user.id, username: user.username };

                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn: 3600 }, // key expires in one hour
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                });
                            }
                        );
                    } else {
                        return res.status(400).json({ password: "Incorrect password" })
                    }
                })
        })
})

module.exports = router;