class LabelService {
    /**
     * @description Create a new label 
     * @method labelModel.create calls model class method
     */
     addLabel = (label,callback) => {
        if(!label){
            return callback("label is undefine",null)
        }
        return callback(null,label);    
    }
}
module.exports = new LabelService();