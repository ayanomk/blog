const AppError = require("../utils/AppError");
const { successResponse } = require("../utils/response.js");
const countries = require("world-countries");
const Post = require("../models/Post.js");

const cloudinary = require('../config/cloudinary.js');

/**
 * GET ALL BLOGS
 * @returns all blogs data
 */
const getAllBlogs = async (req, res) => {
    const data = await Post.find();

    // fail
    if (!data) throw new AppError("Database Error", 500);
    // success
    successResponse(res, `All blog fetched successfully`, data);
};

/**
 * GET SINGLE BLOG DATA BY ID
 * @param {*} req params.id of blog
 * @param {*} res 
 * @returns single blog data
 */
const getBlogById = async (req, res) => {
    const id = req.params.id;
    // FIXME! switch after connecting to db
    const data = await Post.findById(id);

    // fail
    if (!data) throw new AppError(`Blog ID: ${id} not found`, 404);
    // success
    successResponse(res, `Blog ID: ${id} fetched successfully`, data);
};

/**
 * GET FILTERED BLOGS BY QUERY
 * @param {*} req query
 * @param {*} res 
 * @returns filtered (multiple) blog data 
 */
const getBlogsByFilter = async (req, res) => {
    const {excludeId, tripId, excludeTripId, country, regions, years, state} = req.query;

    // Build query object
    const query = {};
    if (state) query.state = { $in: state.split(',') };
    if (regions) query.region = { $in: regions.split(',') };
    if (years) query.year = { $in: years.split(',') };
    if (tripId) query.tripId = tripId;
    if (excludeTripId) query.tripId = { $ne: excludeTripId };
    if (country) query.country = country;

    let data = await Post.find(query);
    // excludeId in JS
    if (excludeId) data = data.filter(p => p._id.toString() !== excludeId);

    // fail
    if (!data) throw new AppError("Database Error", 500);
    // success
    successResponse(res, `All blog fetched successfully`, data);
}

/**
 * POST SINGLE BLOG
 * @param {*} req 
 * @param {*} res 
 */
const createBlog = async (req, res) => {
    try {
        // upload image files to cloudinary
        const cloudinaryImages = [];
        for (let file of req.files) {

            const uploadedResult = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {folder: "blog_images"},
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                stream.end(file.buffer);
            })

            cloudinaryImages.push({
                url: uploadedResult.secure_url,
                publicId: uploadedResult.public_id
            });
        }

        // string data
        const blogData = JSON.parse(req.body.data);
        const { title, locationInput, dateInput, sections, ...rest } = blogData;

        // replace null image placeholder with url and id
        let imgFileIdx = 0;
        // hero image
        const hero = cloudinaryImages[imgFileIdx];
        imgFileIdx++;
        // content images
        sections.forEach(section => {
            section.blocks.forEach(block => {
                if (block.type === 'img') {
                    block.content.src = block.content.src.map(_ => {
                        const img = cloudinaryImages[imgFileIdx];
                        imgFileIdx++;

                        return img
                    })
                }
            })
        })
        

        // !FIXME Capitalise title
        let splitStr = title.split(' ');
        for (let i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        const formattedTitle = splitStr.join(' ');

        
        // !FIXME LAT LNG Modify to handle errors
        let lat, lng;

        const [city, country] = locationInput.split(",").map(s => {
            s = s.trim();
            s = s.charAt(0).toUpperCase() + s.slice(1);
            return s;
        });

        try {
            const latLngRes = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(`${city}, ${country}`)}&format=json`,
                {
                    headers: {
                        "User-Agent": process.env.NOMINATIM_USER_AGENT,
                        "Accept-Language": "en"
                    }
                }
            )

            if (!latLngRes.ok) {
                console.log("nominatim API error", latLngRes.statusText);
            } else {
                const text = await latLngRes.text();
                try {
                    const latLngData = JSON.parse(text);
                    if (latLngData.length > 0) {
                        lat = parseFloat(latLngData[0].lat);
                        lng = parseFloat(latLngData[0].lon);
                    }
                } catch (jsonErr) {
                    console.log(text);
                } 
            }
            // const latLngData = await latLngRes.json();
        } catch (err) {
            console.log(err);
            throw new AppError("Unable to get latitude and longitude from location input")
        }

        // !FIXME Find region
        const worldCountry = countries.find(c => c.name.common == country);
        if (worldCountry === undefined) {
            throw new AppError('Invalid country');
        }
        const region = worldCountry.region;

        // !FIXME USE DATE
        let year, month, date;
        const d = new Date(dateInput);
        year = d.getFullYear();
        month = d.getMonth() + 1;
        date = d.getDate();

        let tripId = title.replaceAll(' ', '-');
        tripId = tripId + '-' + year;

        const newPost = await Post.create({
            ...rest,
            title: formattedTitle,
            tripId: tripId,
            region: region,
            lat: lat,
            lng: lng,
            city,
            country,
            year,
            month,
            date,
            hero,
            sections
        });

        successResponse(res, "Blog created successfully", newPost);

    } catch (err) {
        console.log(err);
        throw new AppError("Failed to create a blog", 500);
    }
}

/**
 * PATCH BLOG
 * @param {*} req 
 * @param {*} res 
 */
const patchBlog = async (req, res) => {
    try {
        // upload image files to cloudinary
        const cloudinaryImages = [];
        for (let file of req.files) {
            const uploadedResult = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {folder: "blog_images"},
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                stream.end(file.buffer);
            })

            cloudinaryImages.push({
                url: uploadedResult.secure_url,
                publicId: uploadedResult.public_id
            });
        }

        // string data
        const blogData = JSON.parse(req.body.data);
        const previousImages = JSON.parse(req.body.previousImages);
        let { title, locationInput, dateInput, sections, hero, ...rest } = blogData;

        // replace null image placeholder with url and id
        let imgFileIdx = 0;
        // hero image
        if (hero == null) {
            hero = cloudinaryImages[imgFileIdx];
            imgFileIdx++;
        } else {
            previousImages.hero = previousImages.hero == hero.publicId ? "" : previousImages.hero;
        }
        
        // content images
        sections.forEach(section => {
            section.blocks.forEach(block => {
                if (block.type === 'img') {
                    block.content.src = block.content.src.map(src => {
                        if(src == null) {
                            const img = cloudinaryImages[imgFileIdx];
                            imgFileIdx++;
                            return img
                        } else {
                            previousImages.content = previousImages.content.filter(prev => prev != src.publicId);
                            return src
                        }
                    })
                }
            })
        })

        // destroy previouse images
        if (previousImages.hero) await cloudinary.uploader.destroy(previousImages.hero);
        for (const img of previousImages.content) await cloudinary.uploader.destroy(img);

        // !FIXME Capitalise title
        let splitStr = title.split(' ');
        for (let i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        const formattedTitle = splitStr.join(' ');

        
        // !FIXME LAT LNG Modify to handle errors
        let lat, lng;

        const [city, country] = locationInput.split(",").map(s => {
            s = s.trim();
            s = s.charAt(0).toUpperCase() + s.slice(1);
            return s;
        });

        try {
            const latLngRes = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(`${city}, ${country}`)}&format=json`,
                {
                    headers: {
                        "User-Agent": process.env.NOMINATIM_USER_AGENT,
                        "Accept-Language": "en"
                    }
                }
            )

            if (!latLngRes.ok) {
                console.log("nominatim API error", latLngRes.statusText);
            } else {
                const text = await latLngRes.text();
                try {
                    const latLngData = JSON.parse(text);
                    if (latLngData.length > 0) {
                        lat = parseFloat(latLngData[0].lat);
                        lng = parseFloat(latLngData[0].lon);
                    }
                } catch (jsonErr) {
                    console.log(text);
                } 
            }
            // const latLngData = await latLngRes.json();
        } catch (err) {
            console.log(err);
            throw new AppError("Unable to get latitude and longitude from location input")
        }

        // !FIXME Find region
        const worldCountry = countries.find(c => c.name.common == country);
        if (worldCountry === undefined) {
            throw new AppError('Invalid country');
        }
        const region = worldCountry.region;

        // !FIXME USE DATE
        let year, month, date;
        const d = new Date(dateInput);
        year = d.getFullYear();
        month = d.getMonth() + 1;
        date = d.getDate();

        let tripId = title.replaceAll(' ', '-');
        tripId = tripId + '-' + year;

        const newPost = await Post.findByIdAndUpdate(req.params.id, {
            ...rest,
            title: formattedTitle,
            tripId: tripId,
            region: region,
            lat: lat,
            lng: lng,
            city,
            country,
            year,
            month,
            date,
            hero,
            sections
        }, {returnDocument: 'after', runValidators: true});

        successResponse(res, "Blog patched successfully", newPost);

    } catch (err) {
        console.log(err);
        throw new AppError("Failed to create a blog", 500);
    }
}

const deleteBlog = async (req, res) => {
    const delImgs = req.body.deleteImages;
    const id = req.params.id;
    for (const img of delImgs) await cloudinary.uploader.destroy(img);

    const result = await Post.deleteOne({_id: id});
    if (result.deletedCount === 0) {
        throw new AppError("Failed to delete a blog", 404);
    }
    successResponse(res, "Blog deleted successfully", result);

}

module.exports = {
    getAllBlogs,
    getBlogById,
    getBlogsByFilter,
    createBlog,
    patchBlog,
    deleteBlog
};