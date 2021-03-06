const NoteRegister = require('./note.model').User;
const mongoose = require('mongoose');
const { logger } = require('../../logger/logger')

const labelSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Registeruser' },

    noteId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NoteBook'
    }],

    labelName: {
        type: String,
        unique: true,
        required: true
    },

}, {
    timestamps: true
})

const label = mongoose.model('label', labelSchema);

class LabelModel {

    /**
     * @description Create a new label
     * @method  finds note with specific Id
     */

    addLabel = (labelInfo, callback) => {
        const findNotes = NoteRegister.find({ email: labelInfo.email, _id: labelInfo.noteId })
        if (findNotes.length === 0) {
            return callback('This note is not exist ', null);
        }
        label.find({ userId: labelInfo.userId, labelName: labelInfo.labelName }, (error, data) => {
            if (!data || data.length === 0) {
                
                const labelmodel = new label({
                    userId: labelInfo.userId,
                    noteId: [labelInfo.userId],
                    labelName: labelInfo.labelName,
                });
                labelmodel.save((error, data))
                    .then((data) => {
                        logger.info('Successfully added label !');
                        return callback(null, data)
                    }).catch((error) => {
                        logger.info('Some error occurred while adding label');
                        
                        callback(error, null)
                    })
            } else if (data) {
                label.findOneAndUpdate({ userId: labelInfo.userId, labelName: labelInfo.labelName }, { $addToSet: { noteId: [labelInfo.noteId] } })
                    .then(data=>{
                        return callback(null, data)
                    }).catch(error=>{
                        return callback(error,null)
                    })
                }
        })
    }
    // Retrieve all labels
    getLabel = (userId) => {
        return new Promise((resolve, reject) => {
            label.find({ userId: userId.id })
                .then((data) => {
                    resolve(data)
                }).catch((error) => {

                    reject(error)
                })
        })
    }
   // Retrieve all labels
   findLabelById = async (userId) => {
    let findlabel = await label.find({ $and: [{ _id: userId.labelId }, { userId: userId.userId }] });
    try {
        if (!findlabel) {
            return false;
        }
        
        return findlabel;
    }
    catch (error) {
        logger.error("Error Occured while finding Label");
    }
    }
    // update label byid api
    updatelabelById = (updatelabel) => {
        return new Promise((resolve, reject) => {
            label.findByIdAndUpdate(updatelabel.id , { labelName: updatelabel.labelName }, { new: true })
            .then(data=>{
                resolve(data)
            }).catch(error=>{
                reject(error)
            })
        })
    }
        deleteLabel  = (credential)=>{
            return new Promise((resolve, reject) => {
            if(credential){
               resolve(credential)
        }
        reject(null)
    })
    }
}

    module.exports = new LabelModel();