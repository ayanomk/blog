import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Recommendation.css';

import { getBlogsByFilter } from '../services/blogService.js';

/**
 * 
 * @param {*} blog 
 * @param {*} idx 
 * @param {*} type type of recommendation
 * @returns html blog link card 
 */
const blogCardMaker = (blog, idx, type) => {
    return (
        <div className="card" key={idx}>
            <Link to={`/blog/${blog.id}`}>
                <img src={blog.hero} alt="" loading="lazy" />
                <div className="cardInfo">
                    <h3>{blog.title}{blog.day > 0 ? `: Day ${blog.day}` : null}</h3>
                    <p>{blog.city}, {blog.country}</p>
                    <p>{blog.year}/{blog.month}/{blog.date}</p>
                </div>
            </Link>
        </div>
    )
}

/**
 * 
 * @param {*} param0 blog: blog data,type: type of recommendation
 * @returns html group of blog link cards with header
 */
function Recommendation ({blog, type}) {

    const query = {
        excludeId: blog.id,
        tripId: blog.tripId,
        country: blog.country
    };

    const [filteredBlogs, setFilteredBlogs] = useState([]);

    if (type === "related") {
        const { country, ...related } = query;
        useEffect(() => {
            getBlogsByFilter(related)
                .then(setFilteredBlogs);
        }, [])
    }
    if (type === "similar") {
        useEffect(() => {
            getBlogsByFilter(query)
                .then(setFilteredBlogs);
        }, [])
    }
    // map: all blog posts provided in param (already filtered list)
    if (type === "map") {
        useEffect(() => {
            getBlogsByFilter({ region: "Oceania" })
                .then(setFilteredBlogs);
        }, [])
    }

    // display recommendation cards if found
    if (filteredBlogs.length) {
        let blogsHeader;
        switch (type) {
            case "related":
                blogsHeader = "Related blogs";
                break;
            case "similar":
                blogsHeader = `More travel blogs in ${blog.country}`;
                break;
            case "map":
                blogsHeader = filteredBlogs[0].region;
            default:
                break;
        }

        return (
            <div className="recommended">
                <h2>{blogsHeader}</h2>
                <div className="recommendedCards">
                    {filteredBlogs.map((blog, idx) => {
                        return blogCardMaker(blog, idx, type);
                    })}
                </div>
            </div>
        )
    }
}

export default Recommendation