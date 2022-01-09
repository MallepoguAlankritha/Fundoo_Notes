const noteModel = require("../models/note.model").UserModel;
const { logger } = require("../../logger/logger");
const nodeRedis = require("../middleware/redis");
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
    console.log("sugd",id);
    nodeRedis.findAllData('fetchRedisById')
      .then(data=>{
        if(!data){
          noteModel.getNoteById(id, (err, data) => {
            if (data) {
              return callback(null, data)
            } else {
              logger.error(error);
              return callback(err, null)
            }
          });
        }
        else if (data) {
          nodeRedis.setData('fetchRedisById', 60, JSON.stringify(data))
          return callback(null, data)
        }
      }).catch(error=>{
        return callback(error,null)
      })
  }
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