const express = require("express");
const notesModel = require("../model/notesModel");
require("dotenv").config();

const notesController = express.Router();

notesController.get("/", async (req, res) => {
  const notes = await notesModel.find({ userId: req.body.userId });
  res.send(notes);
});

notesController.post("/create", async (req, res) => {
  const { Heading, Note, Tag, userId } = req.body;
  const note = new notesModel({
    Heading,
    Note,
    Tag,
    userId,
  });
  try {
    await note.save();
    res.send("note created");
  } catch (error) {
    res.send("something went wrong");
  }
});

notesController.delete("/delete/:noteId", async (req, res) => {
  const { noteId } = req.params;
  const deleteNote = await notesModel.findOneAndDelete({
    _id: noteId,
    userId: req.body.userId,
  });
  console.log(deleteNote);
  if (!deleteNote) {
    res.send("not a authorised user to delete this note");
  }
  res.send("deleted");
});

notesController.patch("/edit/:noteId", async (req, res) => {
  const { noteId } = req.params;
  const { userId, ...updateData } = req.body;
  try {
    const edit = await notesModel.findOneAndUpdate(
      { _id: noteId, userId: userId },
      updateData
    );
    res.send("editing has been done");
  } catch (error) {
    console.log(error);
  }
});



module.exports = notesController;