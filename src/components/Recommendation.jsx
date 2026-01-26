import { mockData } from '../data/mockData.js';
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
            <a href={`/blog/${blog.id}`}>
                <img src={blog.hero} alt="" loading="lazy" />
                <div className="cardInfo">
                    <h3>{blog.title}{blog.day > 0 ? `: Day ${blog.day}` : null}</h3>
                    <p>{blog.city}, {blog.country}</p>
                    <p>{blog.year}/{blog.month}/{blog.date}</p>
                </div>
            </a>
        </div>
    )
}

/**
 * 
 * @param {*} param0 data: blog data,type: type of recommendation
 * @returns html group of blog link cards with header
 */
function Recommendation ({data, type}) {
    console.log(type);
    // find recommended blogs 
    let blogs = [];
    if (type === "map") blogs = data;
    else {
        mockData.map((d) => {
            if (type === "related" && d.tripId === data.tripId && d.id !== data.id) {
                blogs.push(d)
            } else if (type === "similar" && d.country === data.country && d.id !== data.id && d.tripId !== data.tripId) {
                blogs.push(d)
            };
        });
    }

    // display recommendation if found
    if (blogs.length) {
        let blogsHeader;
        switch (type) {
            case "related":
                blogsHeader = "Related blogs";
                break;
            case "similar":
                blogsHeader = `More travel blogs in ${data.country}`;
                break;
            case "map":
                blogsHeader = blogs[0].region;
            default:
                break;
        }

        return (
            <div className="recommended">
                <h2>{blogsHeader}</h2>
                <div className="recommendedCards">
                    {blogs.map((blog, idx) => {
                        return blogCardMaker(blog, idx, type);
                    })}
                </div>
            </div>
        )
    }
}

export default Recommendation