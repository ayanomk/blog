import { useParams } from "react-router-dom"
import { useContext, useEffect, useState } from 'react';
import './Blog.css';
import Recommendation from '../components/Recommendation.jsx'
import { getBlogById, getBlogsByFilter } from "../services/blogService.js";
import { useNavigate } from 'react-router-dom';
import { deleteBlog } from "../services/blogService.js";

import { AuthContext } from "../context/AuthContext";

// Create HTML
const htmlRenderer = (block, blockIdx) => {
    switch (block.type) {
        case "header1":
            return (
                <h2 key={blockIdx}>{block.content}</h2>
            )
        case "header2":
            return (
                <h3 key={blockIdx}>{block.content}</h3>
            )
        case "text":
            return <p key={blockIdx}>{block.content}</p>
        case "table":
            return (
                <table key={blockIdx}>
                    <thead>
                        <tr>
                            {block.content.header.map((el, elIdx) => (
                                <th key={elIdx}>{el}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {block.content.rows.map((row, rowIdx) => (
                            <tr key={rowIdx}>
                                {row.map((el, cellIdx) => (
                                    <td key={cellIdx}>{el}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
        case "img":
            return (
                <div className="imgBlock">
                    {block.content.src.map((el, elIdx) => (
                        <img key={elIdx} className={block.content.dir} src={el.url} alt="" loading="lazy" />
                    ))}
                </div>
            )
        default:
            return null
    }
}

const submitDeleteBlog = async (blog) => {
    const {_id, sections, hero} = blog;
    const deletes = {
        deleteImages: [hero.publicId]
    };
    sections.forEach(section => {
        section.blocks.forEach(block => {
            if (block.type === 'img') {
                block.content.src.forEach((img) => deletes.deleteImages.push(img.publicId));
            }
        })
    })

    try {
        const res = await deleteBlog(_id, deletes);
        navigate(`/adventures`)
    } catch (err) {
        console.log(err);
    }

}

// JSX
function Blog() {
    const {isLoggedIn} = useContext(AuthContext);
    const navigate = useNavigate();

    // get id and blog data for that id
    const { id } = useParams();

    // get blog data
    const [blogData, setBlogData] = useState();
    const [relatedBlogData, setRelatedBlogData] = useState();
    const [similarBlogData, setSimilarBlogData] = useState();
    useEffect(() => {
        setBlogData(null);
        setRelatedBlogData([]);
        setSimilarBlogData([]);

        getBlogById(id)
            .then(setBlogData)
            .catch(err => console.log(err));
    }, [id]);

    // get relevant blog data
    useEffect(() => {
        if (!blogData) return;
        const isPublish = isLoggedIn ? "" : "Publish";

        getBlogsByFilter({ excludeId: id, tripId: blogData.tripId, state: isPublish })
            .then(setRelatedBlogData)
            .catch(err => console.log(err));
            
        getBlogsByFilter({ excludeId: id, excludeTripId: blogData.tripId, country: blogData.country, state: isPublish })
            .then(setSimilarBlogData)
            .catch(err => console.log(err));
    }, [blogData])
        
    // FIXME! how to handle error case?
    if (!blogData) return <p>Blog not found...</p>

    return (
        <article className="blog">
            {isLoggedIn ? <div className="adminButtons"><button onClick={() => navigate(`/admin/blogs/${blogData._id}/edit`)}>Edit</button><button onClick={() => submitDeleteBlog(blogData)}>Delete</button></div> : null}
            <header>
                <div className="title">
                    <div className='mainTitle'>
                        <h1>{blogData.title}</h1>
                        <p>{blogData.description}</p>
                    </div>
                    <div className='dateLocation'>
                        <p>{`${blogData.city}, ${blogData.country}`}</p>
                        <p>{`${blogData.year}/${blogData.month}/${blogData.date}`}</p>
                    </div>
                </div>
                <img className='heroImg' src={blogData.hero.url} alt="" loading="lazy" />
            </header>

            <main>
                
                {blogData.sections.map((section, idx) => {
                    // left side info panel
                    if (section.sectionType == "info") {
                        return (
                        <aside className={section.sectionType} key={idx}>
                            {section.blocks && section.blocks.map((block, blockIdx) => {
                                return (
                                    <div className='mainBlock' key={blockIdx}>
                                        {htmlRenderer(block, blockIdx)}
                                    </div>
                                    )
                            })}
                        </aside>
                        )

                    // main content
                    } else if (section.sectionType == "content") {
                        return (
                            <section className={section.sectionType} key={idx}>
                                {section.blocks && section.blocks.map((block, blockIdx) => (
                                    <div className='mainBlock' key={blockIdx}>
                                        {htmlRenderer(block, blockIdx)}
                                    </div>
                                    ))}
                            </section>
                        )
                    }
                })}
            </main>
            <Recommendation blogs={relatedBlogData} type="related" />
            <Recommendation blogs={similarBlogData} type="similar" />
        </article>
    )
}

export default Blog