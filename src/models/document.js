const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId
const mixiedType = mongoose.Schema.Types.Mixed
const Schema = mongoose.Schema(
    {
        name: { type: String, required: true },
        university: { type: objectId, required: true, ref: 'university' },
        author: { type: String, required: true },
        content: { type: mixiedType },
        field: { type: objectId, ref: 'field' },
    },
    { timestamps: { createdAt: 'created_at' } }
)
 const documentSchema = mongoose.model('document', Schema)
 module.exports =documentSchema