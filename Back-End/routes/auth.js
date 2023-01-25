const express = require("express");
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'chintanisgoodb$oy';

// Create a user using: POST "/api/auth/createuser", No login require
router.post('/createuser', [

    // Set the length of name, email and password
    // If length is not fulfill then --> name: 'Enter a valid name' (you can see this message when data length is not fulfill)
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must at least 5 character').isLength({ min: 5 }),
], async (req, res) => {

    // If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check whether email is already exist
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email is already exists" })
        }

        // Secure the password using jwt
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        // Create a new user
        user = await User.create({
            // Get the name, email and password
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });

        const data = {
            user: {
                id: user.id
            }
        }

        // Token generate
        const authToken = jwt.sign(data, JWT_SECRET);


        res.json({ authToken });
        // res.json(user);
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error")
    }
})



// Authenticate a user using: GET "/api/auth/login", No login require
router.get('/login', [

    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be null').exists(),
], async (req, res) => {

    // If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }

        const data = {
            user: {
                id: user.id
            }
        }

        // Token generate
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken });
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error")
    }
})
module.exports = router