/**
 * @module       utilities
 * @file         validation.js
 * @description  it contains the validation for register and login
 * @author       Alankritha
 */
const Joi = require('joi');

class Validation {
    authRegister =
        Joi.object({
            firstName: Joi.string()
                .min(3)
                .max(30)
                .required()
                .pattern(new RegExp("^([A-Z]?[a-zA-Z]{1,30}[ ]?[.]?[']?[ ]?[a-zA-Z]{1,30}[ ]?[.]?[']?[ ]?[a-zA-Z]{0,30}[ ]?[a-zA-Z]{0,30}?)")),

            lastName: Joi.string()
                .min(2)
                .max(30)
                .required()
                .pattern(new RegExp("^([A-Z]?[a-zA-Z]{1,30}[ ]?[.]?[']?[ ]?[a-zA-Z]{1,30}[ ]?[.]?[']?[ ]?[a-zA-Z]{0,30}[ ]?[a-zA-Z]{0,30}?)")),



            email: Joi.string()
                .pattern(new RegExp('^[a-zA-z]{3}([+-_ .]*[a-zA-Z0-9]+)*[@][a-zA-z0-9]+(.[a-z]{2,3})*$'))
                .required(),

            password: Joi.string()
                .pattern(new RegExp('(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'))
                .required()
        });

        authLogin =
   
                       Joi.object({
                      email: Joi.string()
                      .pattern(new RegExp('^[a-zA-z]{3}([+-_ .]*[a-zA-Z0-9]+)*[@][a-zA-z0-9]+(.[a-z]{2,3})*$'))
                      .required(),

                      password: Joi.string()
                      .required()
                      .pattern(new RegExp('(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'))
                  });
        validForgotPassword =
            Joi.object({
                      email: Joi.string().required().pattern(new RegExp("^^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"))
              
                  });
                  validResetPassword =
                            Joi.object({
                              email: Joi.string().required().pattern(new RegExp("^^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")),
                              password: Joi.string().required().pattern(new RegExp("(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$")),
                              code: Joi.string().required()

    });
    notesCreationValidation = Joi.object({
        userId: Joi.string(),
        title: Joi.string().min(3).required(),
        description: Joi.string().min(8).required()
      });
      noteIDValidation = Joi.object({
        id: Joi.string()
      });
      getNoteByIDValidation = Joi.object({
        userId: Joi.string(),
        noteId: Joi.string().required()
      });
      noteUpdateValidation = Joi.object({
        id: Joi.string().required(),
        userId: Joi.string(),
        title: Joi.string().min(3),
        description: Joi.string().min(3)
      });
      validateDeleteNote = Joi.object({
        id: Joi.string(),
        noteId: Joi.string().required().min(20),
        userId: Joi.string()
      });
      validateLabel = Joi.object({
        labelName: Joi.string().required()
      });
      validateUserid = Joi.object({
        id: Joi.string()
      });
      labelvalidator = Joi.object({
        userId:Joi.string(),
        labelId
        :Joi.string()
      }); 
      updatelabelbyid =Joi.object({
        userId:Joi.string(),
        id:Joi.string()
      });
      deletelabel = Joi.object({
        userId:Joi.string(),
        id:Joi.string()
      });     
  }
   

module.exports = new Validation();























































































































































































































































































































































































































