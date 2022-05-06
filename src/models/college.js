const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId

const schema = mongoose.Schema({
    name: { type: String, required: true },
    field: { type: objectId, ref: 'field', required: true },
})
const collegeModel = mongoose.model('college', schema)
module.exports = collegeModel
