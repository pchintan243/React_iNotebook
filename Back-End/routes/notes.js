const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { useInsertionEffect } = require("react");
var fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');

// Route1: Get All the Notes using: GET "/api/notes/getuser". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {

        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error")
    }
})

// Route2: Add a new Notes using: POST "/api/notes/getuser". Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must at least 5 character').isLength({ min: 5 }),
], async (req, res) => {

    try {
        const { title, description, tag } = req.body;
        // If there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        });
        const savedNote = await note.save();

        res.json(savedNote)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error")
    }
})

// Route3: Update an existing Note using: POST "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {


    const { title, description, tag } = req.body;

    // Create a newNote object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    //Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
        return res.status(404).send("Not Found")
    }
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json(note);
})

module.exports = router