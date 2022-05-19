const mongoose = require('mongoose')
const Schema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: false,
        },
        province: {
            type: String,
            required: true,
            unique: false,
        },
        city: {
            type: String,
            required: true,
            unique: false,
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
        },
    }
)
const universityModel = mongoose.model('university', Schema)
module.exports = universityModel
