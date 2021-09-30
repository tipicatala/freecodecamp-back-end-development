require('dotenv').config();
var mongoose = require('mongoose')
mongoose.connect(process.env['MONGO_URI'], { useUnifiedTopology: true }, { useNewUrlParser: true });
const { Schema } = mongoose;


const personSchema = new Schema({
  name: String,
  age: Number,
  favoriteFoods: [String],
})

const Person = mongoose.model('Person', personSchema)

const createAndSavePerson = (done) => {
  const person = new Person({
    name: "Lina",
    age: 19,
    favoriteFoods: [ 'chicken', 'pasta']})
  
  person.save(function(err, data) {
    if (err) return console.error(err)
    return done(null, data);
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
    if (err) return console.error(err)
    return done(null, data);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, data) {
    if (err) return console.error(err)
    return done(null, data);
  })
};

const findOneByFood = (food, done) => {
 Person.findOne({favoriteFoods: food}, function(err, data) {
    if (err) return console.error(err)
    return done(null, data);
  })
};

const findPersonById = (personId, done) => {
 Person.findById({_id: personId}, function(err, data) {
    if (err) return console.error(err)
    return done(null, data);
  })};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id: personId}, function(err, person) {
    if (err) return console.error(err)

    person.favoriteFoods.push(foodToAdd)
    person.save(function(err, data) {
    if (err) return console.error(err)
    return done(null, data);
  })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName},
    { age: ageToSet },
    {new: true},
    (err, data) => {
      if(err) return console.log(err);
      return done(null, data)
    })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(
    personId,
    (err, data) => {
      if (err) return console.error(err)
      return done(null, data);
    } 
  )
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, data) => {
      if (err) return console.error(err)
      return done(null, data);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
  .sort({ name: 'asc' })
  .limit(2)
  .select({ age: 0 })
  .exec(function(error, data) {
    return done(null, data);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
