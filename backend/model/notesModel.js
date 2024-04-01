const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  Heading: { type: String, required: true },
  Note: { type: String, required: true },
  Tag: { type: String, required: true },
  userId: { type: String, required: true },
});

const notesModel = mongoose.model("notes", notesSchema);

module.exports = notesModel;
