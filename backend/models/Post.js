const mongoose = require('mongoose');

// BLOCK SCHEMA
const blockSchema = new mongoose.Schema({
    type: {type: String, required: true},
    content: mongoose.Schema.Types.Mixed, //flexible data type (string, array, number etc)
}, {_id: false});

// SECTION SCHEMA
const sectionSchema = new mongoose.Schema({
    sectionType: {type: String, required: true},
    blocks: [blockSchema]
}, {_id: false});

// HERO IMAGE SCHEMA
const heroImageSchema = new mongoose.Schema({
    url: {type: String, required: true},
    publicId: { type: String, required: true }
}, {_id: false});


const postSchema = new mongoose.Schema({
    tripId: String,
    day: Number,
    title: String,
    description: String,
    city: String,
    country: String,
    region: String,
    lat: Number,
    lng: Number,
    year: Number,
    month: Number,
    date: Number,
    hero: heroImageSchema,
    sections: [sectionSchema]
})

module.exports = mongoose.model("Post", postSchema);