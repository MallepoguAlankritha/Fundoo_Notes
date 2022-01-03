const validation = require('../utilities/validation')
const service = require('../service/label.service')
class Label {
    /**
     * @description function written to Added Label into the database
     * @param {*} a valid req body is expected
     * @param {*} res
     * @returns response
     */
     addLabelById = (req, res) => {
        try {
            if (req.user) {
                const labelName = req.body.labelName
                const validateResult = validation.labelValidation.validate(labelName);
                if (validateResult.error) {
                    const response = { sucess: false, message: "Wrong Input Vaidation" }
                    return res.status(422).json(response)
                }
                const labelInfo = {
                    labelName: req.body.labelName,
                    userId: req.user.dataForToken.id,
                    noteId : req.params.id
                }
                service.addLabel(labelInfo, (error, data) => {
                    if (error) {
                        const response = {sucess : true , message : error.message}
                       return res.status(401).send(response)
                    }
                    else if (!data){
                        const response = {sucess : true , message : data.message }
                       return res.status(400).send(response)
                    }
                    const response = {sucess : true ,message :"Valid Entry of Token"}
                    return res.status(200).json(response)
            })
        }
                
            else {
                const response = {sucess : false ,message :"Invalid Entry of Token"}
                return res.status(400).json(response)
            }
            
        } catch (err) {
            return res.status(500).json({
              message: 'Internal server Error'
            });
        }
        }
    }
    module.exports = new Label(); 