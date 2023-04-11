const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const actorsSchema = new Schema(
  {
    nameActor: String,
    lastnameActor: String,
    country: String,
    birthday: String,
  },
  { collection: 'actors' }
);
const Actor = mongoose.model('actors', actorsSchema);
module.exports = Actor;