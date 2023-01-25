const express = require("express");
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

// Create a user using: POST "/api/auth", Doesn't require auth
router.post('/', [
    // Set the length of name, email and password
    // If length is not fulfill then --> name: 'Enter a valid name' (you can see this message when data length is not fulfill)
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must at least 5 character').isLength({ min: 5 }),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        // Get the name, email, password
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }).then(user => res.json(user))
        .catch(err => {
            console.log(err)
            // When error occurs at that time you will see the message or error content
            res.json({ error: 'Please enter a unique email value', message: err.message })
        });

})

module.exports = router