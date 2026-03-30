const AppError = require("../utils/AppError");
const { successResponse } = require("../utils/response.js");
const countries = require("world-countries");
const Post = require("../models/Post.js");

/**
 * GET ALL BLOGS
 * @returns all blogs data
 */
const getAllBlogs = async (req, res) => {
    const data = await Post.find();

    // fail
    if (!data || data.length === 0) throw new AppError("No blogs found", 404);
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
    const {excludeId, tripId, excludeTripId, country, regions, years} = req.query;
    
    let data = await Post.find();
    if (regions) data = data.filter(p => regions.includes(p.region));
    if (years) data = data.filter(p => years.includes(p.year));
    if (excludeId) data = data.filter(p => p._id.toString() !== excludeId);
    if (tripId) data = data.filter(p => p.tripId === tripId);
    if (excludeTripId) data = data.filter(p => p.tripId !== excludeTripId)
    if (country) data = data.filter(p => p.country === country );

    // fail
    if (!data || data.length === 0) throw new AppError("No blogs found", 404);
    // success
    successResponse(res, `All blog fetched successfully`, data);
}

/**
 * POST SINGLE BLOG
 * @param {*} req 
 * @param {*} res 
 */
const createBlog = async (req, res) => {
    console.log(req.body);
    console.log(req.files);
    // const { title, locationInput, dateInput, ...rest } = req.body;

    // // !FIXME Capitalise title
    // let splitStr = title.split(' ');
    // for (let i = 0; i < splitStr.length; i++) {
    //     splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    // }
    // const formattedTitle = splitStr.join(' ');

    
    // // !FIXME LAT LNG Modify to handle errors
    // let lat, lng;
    // const latLngRes = await fetch(
    //     `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationInput)}&format=json`
    // )
    // const latLngData = await latLngRes.json();
    // if (latLngData.length > 0) {
    //     lat = parseFloat(latLngData[0].lat);
    //     lng = parseFloat(latLngData[0].lon);
    // }

    // // !FIXME Find region
    // const [city, country] = locationInput.split(",").map(s => s.trim());
    // const worldCountry = countries.find(c => c.name.common == country);
    // if (worldCountry === undefined) {
    //     throw new AppError('Invalid country');
    // }
    // const region = worldCountry.region;

    // // !FIXME USE DATE
    // let year, month, date;
    // const d = new Date(dateInput);
    // year = d.getFullYear();
    // month = d.getMonth() + 1;
    // date = d.getDate();

    // let tripId = title.replaceAll(' ', '-');
    // tripId = tripId + '-' + year;

    // const newPost = await Post.create({
    //     ...rest,
    //     title: formattedTitle,
    //     tripId: tripId,
    //     region: region,
    //     lat: lat,
    //     lng: lng,
    //     city,
    //     country,
    //     year,
    //     month,
    //     date
    // });

    // successResponse(res, "Blog created successfully", newPost);

}

module.exports = {
    getAllBlogs,
    getBlogById,
    getBlogsByFilter,
    createBlog
};