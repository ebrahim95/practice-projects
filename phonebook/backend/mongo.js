const mongoose = require('mongoose');
const nodemon = require('nodemon');

if (process.argv.length < 3) {
    console.log(
      "Please provide the password as an argument: node mongo.js <password>"
    );
    process.exit(1);
  }
  

const password = process.argv[2]
const inputPerson = [process.argv[3], process.argv[4]]

const url = `mongodb+srv://fullstack:${password}@cluster0.9sqz1nn.mongodb.net/phonebook?retryWrites=true&w=majority`

const phoneSchema = new mongoose.Schema({
    name: String, 
    number: String, 
})

const Person = mongoose.model('Person', phoneSchema)


mongoose.connect(url)

/* adding persons
let persons =  [
    { 
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

persons.map(person => new Person(person).save()) */

if (process.argv.length < 4) {
    console.log('Phonebook')
    Person.find({}).then(result => {
        result.forEach(person => console.log(person.name, person.number))
        return mongoose.connection.close()
    })
    return 
}


const person = new Person({
    name: inputPerson[0],
    number: inputPerson[1],
})

person
    .save()
    .then(() => {
        console.log(`added ${inputPerson[0]} number ${inputPerson[1]} to phonebook`)
        return mongoose.connection.close()
    }).catch((err) => console.log(err))