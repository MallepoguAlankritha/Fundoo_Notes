const mongoose = require("mongoose");
const UserModel = require("../models/user.model").UserDB;
const { logger } = require("../../logger/logger");
const noteSchema = mongoose.Schema({
  userId: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserInformation" }],
  title: {
    type: String,
    required: true,
    minlength: 2
  },
  description: {
    type: String,
    required: true,
    minlength: 2
  }
}, {
  timestamps: true
});
const NoteRegister = mongoose.model("NoteBook", noteSchema);

class NoteModel {
    createNote = async (note) => {
      const notes = new NoteRegister({
        userId: note.userId,
        title: note.title,
        description: note.description
      });
      const success = await notes.save();
      if (!success) {
        return false;
      }
      return success;
    }

  getNote = (id, callback) => {
    NoteRegister.find({ userId: id.id }, (error, data) => {
      if (data) {
        logger.info("Successfully retrieve all notes.");
      
        callback(null, data);
      } else {
        logger.error(error);
        callback(error, null);
      }
    });
  }

  getNoteById = (id) => {
    return new Promise((resolve,reject)=>{
      NoteRegister.find({ userId: id.userId, _id: id.noteId })
        .then(data=>{
          logger.info(data);
          resolve(data);
        }).catch(error=>{
          logger.error(error);
          reject(error);
        })
  })
}

  updateNoteById = (updatedNote, callback) => {
    NoteRegister.findByIdAndUpdate(updatedNote.id, { title: updatedNote.title, description: updatedNote.description }, { new: true }, (err, data) => {
      if (err) {
        logger.error(err);
        return callback(err, null);
      } else {
        logger.info("updated successfully");
       
        return callback(null, data);
      }
    });
  }
  deleteNoteById = (id, callback) => {
    NoteRegister.findOneAndDelete({ $and: [{ _id: id.noteId }, { userId: id.userId }] }, (error, data) => {
      if (data) {
        logger.info(data);
        return callback(null, data);
      }
      logger.error(error);
      return callback(error, null);
    });
  }
}
module.exports = {
  UserModel: new NoteModel(),
  User: NoteRegister
};