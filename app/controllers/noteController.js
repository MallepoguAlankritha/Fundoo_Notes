const validation = require("../utilities/validation");
const { createNoteValidation } = require("../utilities/validation");
const noteService = require("../service/note.service");
const { logger } = require("../../logger/logger");
class NoteController {
  createNote = async (req, res) => {
    try {
      const note = {
        userId: req.user.dataForToken.id,
        title: req.body.title,
        description: req.body.description
      };
      const createNoteValidation = validation.notesCreationValidation.validate(note);
      if (createNoteValidation.error) {
        logger.error(createNoteValidation.error);
        return res.status(400).send({
          success: false,
          message: "Wrong Input Validations",
          data: createNoteValidation
        });
      }
      const notes = await noteService.createNote(note);
      if (!notes) {
        return res.status(400).send({
          success: false,
          message: "error in  creating note"
        });
      } else {
        return res.status(201).send({

          success: true,
          message: "Successfully....  creating note",
          data: notes
        });
      }
    } catch (error) {
      logger.error("Internal server error");
      return res.status(500).send({
        success: false,
        message: "Internal server error"
      });
    }
  }
  getNote = (req, res) => {
    try {
      const id = { id: req.user.dataForToken.id };
      const getNoteValidation = validation.noteIDValidation.validate(id);
      if (getNoteValidation.error) {
        logger.error(getNoteValidation.error);
        return res.status(400).send({
          success: false,
          message: "Wrong Input Validations",
          data: getNoteValidation
        });
      }
      noteService.getNote(id, (error, data) => {
        if (error) {
          logger.error(error);
          return res.status(400).json({
            message: "failed to get all notes",
            success: false
          });
        } else {

          return res.status(201).json({
            message: " Successfully !!! retrieve all notes.....",
            success: true,
            data: data
          });
        }
      });
    } catch (error) {
      logger.error(error);
      return res.status(500).json({
        message: "Internal Server Error",
        success: false
      });
    }
  }
  getNoteById = (req, res) => {
    try {
      console.log("33",req.user)
      const id = { userId: req.user.dataForToken.id, noteId: req.params.id };
      const getNoteValidation = validation.getNoteByIDValidation.validate(id);
      if (getNoteValidation.error) {
        logger.error(getNoteValidation.error);
        return res.status(400).send({
          success: false,
          message: "Wrong Input Validations",
          error: getNoteValidation.error
        });
      }
      noteService.getNoteById(id)
        .then(data => {
          console.log("555",data);
          logger.info(data);
          return res.status(201).json({
            message: " Successfully !! retreive given note",
            success: true,
            data: data
          });
        }).catch(error => {
          console.log("44",error)
          return res.status(400).json({
            message: "failed to get given notes",
            success: false
          });
        })
    } catch (error) {
      console.log("123",error);
      logger.error(error);
      return res.status(500).json({
        message: "Internal server error",
        success: false
      });
    }
  }
  updateNoteById = (req, res) => {
    try {
      const updateNote = {
        id: req.params.id,
        userId: req.user.dataForToken.id,
        title: req.body.title,
        description: req.body.description
      };
      const updateNoteValidation = validation.noteUpdateValidation.validate(updateNote);
      if (updateNoteValidation.error) {
        logger.error(updateNoteValidation.error);
        return res.status(400).send({
          success: false,
          message: "Wrong Input Validations",
          data: updateNoteValidation
        });
      }
      noteService.updateNoteById(updateNote, (error, data) => {
        if (error) {

          logger.error(error);
          return res.status(400).json({
            message: "Failed to update note",
            success: false
          });
        } else {
          logger.info("Succefully updated..");
          return res.status(201).send({
            message: "Successfully updated....",
            success: true,
            data: data
          });
        }
      });
    } catch (error) {
      logger.error(error);
      return res.status(500).json({
        message: "Internal server error",
        success: false
      });
    }
  }
  deleteNoteById = (req, res) => {
    try {
      const id = { userId: req.user.dataForToken.id, noteId: req.params.id };
      const deleteNoteValidation = validation.validateDeleteNote.validate(id);
      if (deleteNoteValidation.error) {
        logger.error(deleteNoteValidation.error);
        return res.status(400).send({
          success: false,
          message: "Wrong Input Validations",
          data: deleteNoteValidation
        });
      }
      noteService.deleteNoteById(id, (error, data) => {
        if (error) {
          logger.error(error);
          return res.status(400).json({
            message: "Note not found",
            success: false
          });
        }
        logger.info("successfully deleted..");
        return res.status(201).send({
          message: "Successfully Deleted note",
          success: true,
          data: data
        });
      });
    } catch {
      logger.error(error);
      return res.status(500).json({
        message: "Internal server error",
        success: false
      });
    }
  }
}
module.exports = new NoteController();