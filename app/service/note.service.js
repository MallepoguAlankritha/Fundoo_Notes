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
  getNoteById = (id) => {
    return new Promise((resolve,reject)=>{
    nodeRedis.findAllData('fetchRedisById')
      .then(data=>{
        if(!data){
          noteModel.getNoteById(id)
        .then(data => {
              nodeRedis.setData('fetchRedisById', 60, JSON.stringify(data))
              resolve(data)
      
            }).catch(error =>{
              logger.error(error);
              reject(err)
            
          });
        }
        else{
          resolve(data);
        }
      }).catch(error =>{
        resolve(error)
      })
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