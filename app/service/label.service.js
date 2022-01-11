const { resolve } = require('bluebird')
const labelmodel = require('../models/label.model')
const nodeRedis = require('../middleware/redis')
class LabelService {
    /**
     * @description Create a new label 
     * @method labelModel.create calls model class method
     */
     addLabel = (labelInfo, callback) => {
        labelmodel.addLabel(labelInfo, (error, data) => {
            if (!data) {
                return callback(error, data)
            }
            return callback(null, data)
        })
    }
     // Retrieve all labels
     getLabel = async (userId) => {
            let result = await labelmodel.getLabel(userId)
           try{
               if(!result){
                   return false;
               }
               return result;
            }catch(error){
                reject(error)
            }
        }
    
    // Retrieve all labels by Id
    findLabelById = async (id) => {
        try{

        let getId = await nodeRedis.findAllData('fetchRedisById');
        if (!getId) {
          getId = await labelmodel.findLabelById(id);
          
          if(!getId){
              return false;
          }
          nodeRedis.setData("fetchRedisById", 60, JSON.stringify(getId));
          
          return getId;
        }
        return getId;
    }catch(error){
        return error;
    }
      };
    
    updatelabelById = async (updatelabel) => {
    let updateLabel = await labelmodel.updatelabelById(updatelabel)
    if(!updatelabel){
        return false;
    }
    return updatelabel;
    }


    
    deleteLabel = async (credential) => {
        let deletelabel = await labelmodel.deleteLabel(credential)
        if(!deletelabel){
            return false;
        }
        return deletelabel;
    }
}

module.exports = new LabelService();