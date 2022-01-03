class LabelModel {

    /**
	 * @description Create a new label
	 * @method  finds note with specific Id
	 */

    addLabel = (labelInfo, callback) => {
        if (labelInfo) {
            return callback(null, labelInfo)
        }
        return callback("label is not found", null)
    }
}

module.exports = new LabelModel();
