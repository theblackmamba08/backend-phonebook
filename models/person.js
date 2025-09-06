const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
    },
    number: {
        type: String,
        required: true,
        minLength: 8,
        validate: {
            validator: function (v) {
                // Regex : 2 ou 3 chiffres, un tiret, puis une suite de chiffres
                return /\d{2,3}-\d+/.test(v)
            },
            message: (props) =>
                `${props.value} is not a valid phone number! It must be in the format XX-XXXXXXX or XXX-XXXXXXX`,
        },
    },
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person
