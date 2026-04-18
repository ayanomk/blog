import { Link } from 'react-router-dom';
import './Recommendation.css';

/**
 * 
 * @param {*} blog 
 * @param {*} idx 
 * @returns html blog link card 
 */
const blogCardMaker = (blog, idx) => {
    return (
        <div className={blog.state === 'Draft' ? 'card draftCard' : 'card'} key={idx}>
            <Link to={`/blogs/${blog._id}`}>
                <img src={blog.hero.url} alt="" loading="lazy" />
                <div className="cardInfo">
                    <h3>{blog.title}{blog.day > 0 ? `: Day ${blog.day}` : null}</h3>
                    <p>{blog.city}, {blog.country}</p>
                    <div className='dateTagContainer'>
                        <p>{blog.year}/{blog.month}/{blog.date}</p>
                        {blog.state === 'Draft' ? <p className='draftTag'>Draft</p> : null}
                    </div>
                </div>
            </Link>
        </div>
    )
}

/**
 * 
 * @param {*} param0 blogs: blog data,type: type of recommendation
 * @returns html group of blog link cards with header
 */
function Recommendation ({blogs = [], type}) {
    // display recommendation cards if found
    if (blogs.length) {
        let blogsHeader;
        switch (type) {
            case "related":
                blogsHeader = "Related blogs";
                break;
            case "similar":
                blogsHeader = `More travel blogs in ${blogs[0].country}`;
                break;
            case "map":
                blogsHeader = "";
            default:
                break;
        }

        return (
            <div className="recommended">
                <h2>{blogsHeader}</h2>
                <div className="recommendedCards">
                    {blogs.map((blog, idx) => {
                        return blogCardMaker(blog, idx);
                    })}
                </div>
            </div>
        )
    }
}

export default Recommendation