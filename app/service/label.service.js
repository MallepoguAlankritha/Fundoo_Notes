const { resolve } = require('bluebird')
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
     // Retrieve all labels
     getLabel = (userId) => {
        return new Promise((resolve, reject) => {
            let result = labelmodel.getLabel(userId)
            result.then((data) => {
                resolve(data)
            }).catch((error) => {
                reject(error)
            })
        })
    }
    // Retrieve all labels by Id
    getlabelById = (credential) => {
        return new Promise((resolve, reject) => {
            labelmodel.getlabelById(credential)
                .then(data => {
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
        })
    }
    updatelabelById = (updatelabel) => {
        return new Promise((resolve, reject) => {
            if (updatelabel) {
                resolve(updatelabel)
            }
            reject("Some error occured")
        })
    }
}

module.exports = new LabelService();