const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const documentSchema = new mongoose.Schema({

    hId: Number,
    _id: Schema.Types.ObjectId,
    title: String,
    desc: String,
    content: String,
    image: {type:Schema.Types.ObjectId, ref:'image'},
    tags: []


})

module.exports = mongoose.model('document',documentSchema);