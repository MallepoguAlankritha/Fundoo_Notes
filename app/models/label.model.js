const NoteRegister = require('../models/note.model').Note;
const mongoose = require('mongoose');

const labelSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },

    noteId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'note'
        }],

    labelName: {
        type: String,
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
        const findNotes = NoteRegister.find({ email: labelInfo.email,_id: labelInfo.noteId });
        if (findNotes.length === 0) {
            return callback('This note is not exist or this belongs to another user',null);
        }
        return callback ('This note belongs to same user',labelInfo.noteId)
    }
}

module.exports = new LabelModel();
