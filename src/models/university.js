const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId
const Schema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        province: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        fields: [{ type: objectId, required: false, ref: 'field' }],
    },
    {
        timestamps: {
            createdAt: 'created_at',
        },
    }
)
const universityModel = mongoose.model('university', Schema)
module.exports = universityModel
