const mongoose = require("mongoose");
const Post = require("../models/Post.js");

const User = require("../models/User.js");
const { createUser } = require("../controllers/authenticationController.js");

const { connectDB } =require("../config/db.js");

const seed = async () => {
    try {
        await connectDB();
        await Post.deleteMany({});

        // await Post.create({
        //     "tripId": "the-ghan-2025",
        //     "day": 1,
        //     "title": "The Ghan",
        //     "description": "First day of The Ghan journey. Boarded the train in Adelaide and headed non-stop to Marla.",
        //     "city": "Adelaide",
        //     "country": "Australia",
        //     "region": "Oceania", 
        //     "lat": -34.9285, 
        //     "lng": 138.6007,
        //     "year": 2025,
        //     "month": 11,
        //     "date": 23,
        //     "hero": "/img/DSCF1375.webp",
        //     "sections": [
        //         {
        //             "sectionType": "info",
        //             "blocks": [
        //                 {
        //                     "type": "header1",
        //                     "content": "Schedule of the Day"
        //                 },
        //                 {
        //                     "type": "table",
        //                     "content": {
        //                         "header": ["Time", "Activity"],
        //                         "rows": [
        //                             ["10:00", "Arrive at Adelaide Parklands Terminal"],
        //                             ["11:30", "Board train"],
        //                             ["12:15", "Departure"],
        //                             ["13:30", "Lunch"],
        //                             ["19:15", "Dinner"]
        //                         ]
        //                     }
        //                 }
        //             ]
        //         },
        //         {
        //             "sectionType": "content",
        //             "blocks": [
        //                 {
        //                     "type": "header1",
        //                     "content": "The Day"
        //                 },
        //                 {
        //                     "type": "header2",
        //                     "content": "Morning"
        //                 },
        //                 {
        //                     "type": "text",
        //                     "content": "We left Tonsley at around 9:30 so that we can reach Adelaide Parklands Terminal 2 hours before departure, just as we were instructed on the travel document. When we got there, a lot of people were queuing up for check in and even more people were chilling in the lounge. Once we checked in, we got a welcome drink (tea) with a couple of muffins and relaxed for a bit."
        //                 }
        //             ]
        //         }
        //     ]
        // });

        await User.deleteMany({});
        await createUser("ayano", "icecreammonster");

        console.log("Seeded");
    } catch (err) {
        console.log(err);
    } finally {
        mongoose.connection.close();
    }
}

seed();