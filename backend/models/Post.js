const mongoose = require('mongoose');

// BLOCK SCHEMA
const blockSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, "Block type is required"]
    },
    content: {
        type: mongoose.Schema.Types.Mixed, //flexible data type (string, array, number etc)
        required: [true, "Block content is required"]
    },
}, {_id: false});

// SECTION SCHEMA
const sectionSchema = new mongoose.Schema({
    sectionType: {
        type: String,
        required: [true, "Section type is required"]
    },
    blocks: [blockSchema]
}, {_id: false});

// HERO IMAGE SCHEMA
const heroImageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: [true, "Hero image url is required"]
    },
    publicId: {
        type: String,
        required: [true, "Hero image publicId is required"]
    }
}, {_id: false});


const postSchema = new mongoose.Schema({
    tripId: {
        type: String,
        required: [true, "tripId is required"],
        trim: true
    },
    day: {
        type: Number,
        required: [true, "Day is required"]
    },
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true
    },
    city: {
        type: String,
        required: [true, "City is required"],
        trim: true
    },
    country: {
        type: String,
        required: [true, "Country is required"],
        trim: true
    },
    region: {
        type: String,
        required: [true, "Region is required"],
        trim: true
    },
    lat: {
        type: Number,
        required: [true, "Latitude is required"]
    },
    lng: {
        type: Number,
        required: [true, "Longitude is required"]
    },
    year: {
        type: Number,
        required: [true, "Year is required"]
    },
    month: {
        type: Number,
        required: [true, "Month is required"]
    },
    date: {
        type: Number,
        required: [true, "Date is required"]
    },
    hero: {
        type: heroImageSchema,
        required: [true, "Hero image is required"]
    },
    sections: [sectionSchema],
    state: {
        type: String,
        enum: ['Draft', 'Publish'],
        default: "Draft",
        required: [true, "State must be either Draft or Publish"]
    }
})

module.exports = mongoose.model("Post", postSchema);