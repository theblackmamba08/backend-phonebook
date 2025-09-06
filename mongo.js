const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})
const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 3) {
    console.log(
        'Please provide the password as an argument: node mongo.js <password>'
    )
    process.exit(1)
}

if (process.argv.length === 3) {
    const password = process.argv[2]
    const url = `mongodb+srv://theblackmamba08:${password}@cluster0.g0rdjei.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`
    mongoose.set('strictQuery', false)
    mongoose.connect(url).then(() => {
        console.log('connected')
        Person.find({})
            .then((person) => console.log(`${person.name}  ${person.number}`))
            .then(() => {
                mongoose.connection.close()
            })
    })
}

if (process.argv.length === 5) {
    const password = process.argv[2]
    const name = process.argv[3]
    const number = process.argv[4]
    const url = `mongodb+srv://theblackmamba08:${password}@cluster0.g0rdjei.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`
    mongoose.set('strictQuery', false)
    mongoose.connect(url).then(() => {
        const person = new Person({
            name: name,
            number: number,
        })
        person.save().then(() => {
            console.log(`added ${name} number ${number} to phonebook`)
            mongoose.connection.close()
        })
    })
}
