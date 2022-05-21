const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId
const Schema = mongoose.Schema(
    {
        name: { type: String, required: true },
        author: { type: String, required: true },
        source: { type: String, required: true },
        field: { type: objectId, ref: 'field' },
        college: { type: objectId, ref: 'college' },
    },
    { timestamps: { createdAt: 'created_at' } }
)
const documentSchema = mongoose.model('document', Schema)
module.exports = documentSchema
