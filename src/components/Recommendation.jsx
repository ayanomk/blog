import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Recommendation.css';

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
    // find blogs to display as cards 
    let recommended = [];
    // map: all blog posts provided in param (already filtered list)
    if (type === "map") recommended = blog;
    else {
        const [allBlogs, setAllBlogs] = useState([]);
        useEffect(() => {
            fetch("http://localhost:3000/api/blogs")
                .then((res) => res.json())
                .then(data => setAllBlogs(data))
        }, []);

        allBlogs.map((d) => {
            // related: same tripId as the currently shown blog post
            if (type === "related" && d.tripId === blog.tripId && d.id !== blog.id) {
                recommended.push(d)
            // similar: same country blog post as the currently shown one
            } else if (type === "similar" && d.country === blog.country && d.id !== blog.id && d.tripId !== blog.tripId) {
                recommended.push(d)
            };
        });
    }

    // display recommendation cards if found
    if (recommended.length) {
        let blogsHeader;
        switch (type) {
            case "related":
                blogsHeader = "Related blogs";
                break;
            case "similar":
                blogsHeader = `More travel blogs in ${blog.country}`;
                break;
            case "map":
                blogsHeader = recommended[0].region;
            default:
                break;
        }

        return (
            <div className="recommended">
                <h2>{blogsHeader}</h2>
                <div className="recommendedCards">
                    {recommended.map((blog, idx) => {
                        return blogCardMaker(blog, idx, type);
                    })}
                </div>
            </div>
        )
    }
}

export default Recommendation