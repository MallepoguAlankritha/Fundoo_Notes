const validation = require('../utilities/validation');
const Validation = require('../utilities/validation')
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
                return res.status(201).json({
                    message: 'Token is Valid'
                });
            } else {
                return res.status(400).json({
                    message: 'Entry of Token is false'
                });
            }
        } catch (err) {
            return res.status(500).json({
              message: 'Internal server Error'
            }
            )}
        }
    }
    module.exports = new Label(); 