const labelModel = require('../models/label.model')
class LabelService {
    /**
     * @description Create a new label 
     * @method labelModel.create calls model class method
     */
     addLabel = (labelInfo,callback) => {
        labelModel.addLabel(labelInfo,(error,data)=>{
            if(error){
                return callback(error,null)
            }
            else if(!data){
                return callback(null,data)
            }
            return callback(null,data)
        })
    }
}
module.exports = new LabelService();