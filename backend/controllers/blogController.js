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
 * Upload image files to cloudinary and get url/publicId
 * @param {*} files files passed from req.files
 * @returns array of data for uploaded images
 */
const uploadToCloudinary = async (files) => {
    try {
        return await Promise.all(
            files.map((file) => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        {folder: "blog_images"},
                        (error, result) => {
                            if (error) reject(error);
                            else resolve({url: result.secure_url, publicId: result.public_id});
                        }
                    );
                    stream.end(file.buffer);
                });
            })
        )
    } catch (err) {
        throw new AppError("Image upload failed: " + err.message, 500);
    }
}

/**
 * Convert text to title case
 * @param {string} text 
 * @returns String Of Text
 */
const toTitleCase = (text) => {
    let splitStr = text.split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
}

/**
 * Get latitude and longitude of a location
 * @param {string} cityInput String of city
 * @param {string} countryInput String of country
 * @returns {object} {latitude, longitude}
 */
const getLatLng = async (cityInput, countryInput) => {
    const city = cityInput.charAt(0).toUpperCase() + cityInput.substring(1);
    const country = countryInput.charAt(0).toUpperCase() + countryInput.substring(1);
    let lat, lng;

    try {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(`${city}, ${country}`)}&format=json`,
            {
                headers: {
                    "User-Agent": process.env.NOMINATIM_USER_AGENT,
                    "Accept-Language": "en"
                }
            }
        )

        if (!res.ok) {
            throw new AppError("API failed to get Lat/Lng: " + res.statusText, 500, {location: "Invalid location for latitute and longitude"});
        } 

        const data = await res.json();
        if (data.length > 0) {
            lat = parseFloat(data[0].lat);
            lng = parseFloat(data[0].lon);
        } else {
            throw new AppError(`No Lat/Lng found for ${city}, ${country}`, 404, {location: "Invalid location for latitute and longitude"});
        }

        return {lat, lng};

    } catch (err) {
        throw new AppError("Unable to get latitude and longitude from location input: " + err.message, err.statusCode || 500, {location: "Invalid location for latitute and longitude"})
    }
}

/**
 * Get region from country
 * @param {string} countryInput string of country
 * @returns {string} region that country belongs to
 */
const getRegion = (countryInput) => {
    const country = countryInput.toLowerCase();
    // !FIXME Find region
    const worldCountry = countries.find(c => c.name.common.toLowerCase() == country);
    if (worldCountry === undefined) {
        throw new AppError('Invalid input', 400, {country: "Invalid country"});
    }
    return worldCountry.region;
}

/**
 * Convert Date (input) into year, month, date
 * @param {*} dateInput date
 * @returns {object} {year, month, date} strings
 */
const convertDateInput = (dateInput) => {
    // !FIXME USE DATE
    let year, month, day;
    const d = new Date(dateInput);
    year = d.getFullYear();
    month = d.getMonth() + 1;
    day = d.getDate();

    return {year, month, day};
}

/**
 * Get tripId used for multiple-day trip
 * @param {string} title title
 * @param {string} year year
 * @returns {string} tripId title-in-lowercase_year-month
 */
const getTripId = (title, year, month) => {
    let titleTripId = title.toLowerCase().replaceAll(' ', '-');
    return titleTripId + '_' + year + '-' + month;
}

/**
 * Replace image placeholders (null) with cloudinary url and publicId
 * @param {array of objects} sections {type: '', blocks: []} 
 * @param {array of objects} cloudinaryImages {url: '', publicId: ''}
 * @returns {object} {hero, replacedSections}
 */
const replaceNullImagePlaceholders = (sections, cloudinaryImages) => {
    let imgFileIdx = 0;
    // hero image
    const hero = cloudinaryImages[imgFileIdx];
    imgFileIdx++;
    // content images
    const replacedSections = sections.map(section => ({
        ...section,
        blocks: section.blocks.map(block => {
            if (block.type === 'img') {
                return {
                    ...block,
                    content: {
                        ...block.content,
                        src: block.content.src.map(() => {
                            const img = cloudinaryImages[imgFileIdx];
                            imgFileIdx++;
                            return img;
                        })
                    }
                };
            }
            return block;
        })
    }))
    return {hero, replacedSections};
}

/**
 * POST SINGLE BLOG
 * @param {*} req 
 * @param {*} res 
 */
const createBlog = async (req, res) => {
    const blogData = JSON.parse(req.body.data);
    const { title, location, date, sections, ...rest } = blogData;

    // upload images
    const cloudinaryImages = await uploadToCloudinary(req.files);
    // replace null images with cloudinary
    const {hero, replacedSections} = replaceNullImagePlaceholders(sections, cloudinaryImages);
    // format title
    const titleCased = toTitleCase(title);

    const [city, country] = location.split(",").map(s => {
        s = s.trim();
        s = s.charAt(0).toUpperCase() + s.slice(1);
        return s;
    });

    const {lat, lng} = await getLatLng(city, country);

    const region = getRegion(country);

    const {year, month, day} = convertDateInput(date);

    const tripId = getTripId(title, year, month);

    try {
        const newPost = await Post.create({
            ...rest,
            title: titleCased,
            tripId: tripId,
            region: region,
            lat: lat,
            lng: lng,
            city,
            country,
            year,
            month,
            date: day,
            hero,
            sections: replacedSections
        });
        successResponse(res, "Blog created successfully", newPost);
    } catch (err) {
        throw new AppError("Failed to create new blog : " + err.message, err.statusCode || 500);
    }
}

/**
 * PATCH BLOG
 * @param {*} req 
 * @param {*} res 
 */
const patchBlog = async (req, res) => {
    const blogData = JSON.parse(req.body.data);
    const previousImages = JSON.parse(req.body.previousImages);
    let { title, location, date, sections, hero, ...rest } = blogData;

    // upload images
    const cloudinaryImages = await uploadToCloudinary(req.files);

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
    try {
        if (previousImages.hero) await cloudinary.uploader.destroy(previousImages.hero);
        for (const img of previousImages.content) await cloudinary.uploader.destroy(img);
    } catch (delCloudinaryImageErr) {
        throw new AppError("Failed to delete images from Cloudinary: " + delCloudinaryImageErr.message, delCloudinaryImageErr.statusCode || 500);
    }

    const titleCased = toTitleCase(title);

    const [city, country] = location.split(",").map(s => {
        s = s.trim();
        s = s.charAt(0).toUpperCase() + s.slice(1);
        return s;
    });

    const {lat, lng} = await getLatLng(city, country);

    const region = getRegion(country);

    const {year, month, day} = convertDateInput(date);

    const tripId = getTripId(title, year, month);

    try {
        const newPost = await Post.findByIdAndUpdate(req.params.id, {
            ...rest,
            title: titleCased,
            tripId: tripId,
            region: region,
            lat: lat,
            lng: lng,
            city,
            country,
            year,
            month,
            date: day,
            hero,
            sections
        }, {returnDocument: 'after', runValidators: true});
        successResponse(res, "Blog patched successfully", newPost);
    } catch (err) {
        throw new AppError("Failed to patch a blog: " + err.message, err.statusCode || 500);
    }
}

/**
 * Delete a single blog
 * @param {*} req 
 * @param {*} res 
 */
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