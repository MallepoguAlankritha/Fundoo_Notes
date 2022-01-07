const noteModel = require("../models/note.model").UserModel;
const { logger } = require("../../logger/logger");
class NoteService {
  createNote = async (note) => {
    const success = noteModel.createNote(note);
    if (!success) {
      return false;
    }
    return success;
  }

    getNote = (id, callback) => {
        noteModel.getNote(id, (error, data) => {
            if (data) {
                logger.info(data);
              callback(null, data);
            } else {
                logger.error(error);
              callback(error, null);
            }
          });
      };
      getNoteById = (id, callback) => {
        noteModel.getNoteById(id, (err, data) => {
          if (data) {
            logger.info(data);
            return callback(null, data);
          } else {
            logger.error(err);
            return callback(err, null);
          }
        });
      };
      updateNoteById = (updateNote, callback) => {
  
        noteModel.updateNoteById(updateNote, (error, data) => {
          if (error) {
            logger.error(error);
            return callback(error, null);
          } else {
            
            logger.info("successfully updated....");
            return callback(null, data);
          }
        });
      };
      deleteNoteById = (id, callback) => {
        noteModel.deleteNoteById(id, (error, data) => {
          if (error) {
            logger.error(error);
            return callback(error, null);
          }
          logger.info("deleted...");
          return callback(null, data);
        });
      };
      
}
module.exports = new NoteService();