const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Note = require('../models/Notes');


// route for fetching all notes

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const note = await Note.find({ user: req.user.id });
        res.json(note)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some unknown error occured");
    }

})
// route for adding a note
router.post('/addnote', fetchuser, [
    body('title', 'Enter a title').isLength({ min: 3 }),
    body('description', 'Enter description ').isLength({ min: 5 })], async (req, res) => {

        const { title, description, tag } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const note = new Note({
                title, description, tag, user: req.user.id
            })

            const savednote = await note.save()
            res.json(savednote)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some unknown error occured");
        }
    })

// update note route
router.put('/updatenote/:id', fetchuser, [
    body('title', 'Enter a title').isLength({ min: 3 }),
    body('description', 'Enter description ').isLength({ min: 5 })], async (req, res) => {
        try {
            //checking for same user and note id
            const noteId = await Note.findById(req.params.id);
            if (!noteId) { return res.status(404).send("not found") }
            if (noteId.user.toString() !== req.user.id) { return res.status(401).send("Access denied") }
            // updating the note
            const updatedNote = req.body;
            const result = await Note.findByIdAndUpdate(noteId, updatedNote, { new: true });
            res.json(result);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some unknown error occured");
        }
    })

//route to delete a note
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //checking for same user and note id
        const noteId = await Note.findById(req.params.id);
        if (!noteId) { return res.status(404).send("Note not found") }
        if (noteId.user.toString() !== req.user.id) { return res.status(401).send("Access denied") }
        // deleting a note
        const result = await Note.findByIdAndDelete(noteId);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});
module.exports = router