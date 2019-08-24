const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const imageSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    imageType: String,
    data: Buffer

})

module.exports = mongoose.model('image',imageSchema);