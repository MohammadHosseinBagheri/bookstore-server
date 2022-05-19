const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId

const schema = mongoose.Schema(
    {
        name: { type: String, required: true },
        university: { type: objectId, required: true, ref: 'university' },
    },
    {
        timestamps: {
            createdAt: 'created_at',
        },
    }
)
 const fieldModel = mongoose.model('field', schema)
module.exports =fieldModel