const express = require("express");
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

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
        // Create a new user
        user = await User.create({
            // Get the name, email, password
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        res.json(user);
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Some error occured")
    }
})

module.exports = router