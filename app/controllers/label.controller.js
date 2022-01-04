const validation = require('../utilities/validation')
const LabelService = require('../service/label.service')
const {logger} = require('../../logger/logger')
class LabelController {
    /**
     * @description function written to Added Label into the database
     * @param {*} a valid req body is expected
     * @param {*} res
     * @returns response
     */
     addLabel = (req, res) => {
        try {
            if (req.user) {
                const labelName ={labelName : req.body.labelName}
                const validateResult = validation.validateLabel.validate(labelName);
                if (validateResult.error) {
                    const response = { success: false, message: "Wrong Input Vaidation" }
                    return res.status(422).json(response)
                }
                const labelInfo = {
                    labelName: req.body.labelName,
                    userId: req.user.dataForToken.id,
                    noteId : req.params.id,
                    email: req.user.dataForToken.email
                
                }
                LabelService.addLabel(labelInfo, (error, data) => {
                    if (error) {
                        logger.error('Some error occurred !')
                        const response = { sucess: false, message: 'Some error occured' }
                        return res.status(404).send(response)
                    }
                    else if (!data) {
                        logger.info('Some error occurred while adding label')
                        const response = { sucess: false, message: "Successfully added label !", data: data }
                        return res.status(400).json(response)
                    }
                    logger.info('Successfully added label !');
                    const response = { sucess: true, message: "Successfully added label !", data: data }
                    return res.status(200).json(response)
                })
            }
            else {
                const response = { sucess: false, message: "Invalid Entry of Token" }
                return res.status(400).json(response)
            }
            
        } catch (err) {
            const response = { sucess: false, message: "Internal  Server error" }
            return res.status(500).json(response);
        }
    }
    getlabel = (req,res)=>{
        try{
            if(req.user){
                const userId = { id: req.user.dataForToken.id }
                const validateResult = validation.validateUserid.validate(userId);
                if (validateResult.error) {
                    console.log(validateResult.error)
                    const response = { sucess: false, message: 'Wrong Input Validation', data: validateResult }
                    return res.status(400).send(response)
                }
                labelService.getLabel(userId, (error, data) => {
                    if (error) {
                        const response = { sucess: false, message: 'Some error occured' }
                        return res.status(400).send(response)
                    }
                    else if(!data){
                        const response = { sucess: false, message: 'data is undefine or null' }
                        return res.status(400).send(response)
                    }
                    const response = { sucess: true, message: 'label is fetched' }
                    return res.status(200).send(response)
                })
            }
            else {
                const response = { sucess: false, message: 'Invalid Token' }
                return res.status(400).send(response)
            }
        }
        catch (error) {
            const response = { sucess: false, message: "Internal  Server error" }
            return res.status(500).json(response)
        }
    }
}
    module.exports = new LabelController(); 