const labelmodel = require('../models/label.model')
class LabelService {
    /**
     * @description Create a new label 
     * @method labelModel.create calls model class method
     */
    addLabel = (labelInfo, callback) => {
        labelmodel.addLabel(labelInfo, (error, data) => {
            if (!data) {
                return callback(null, data)
            }
            return callback(null, data)
        })
    }
    getLabel = (labelId, callback) => {
        if (labelId) {
            labelmodel.getLabel(labelId, (error, data) => {
                if (error) {
                    return callback(error, null)
                }
                else {
                    return callback("Service layer is not giving response", data)
                }
            })
}
    }
}

module.exports = new LabelService();