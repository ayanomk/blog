import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react';
import './Blog.css';
import Recommendation from '../components/Recommendation.jsx'

// Create HTML
const htmlRenderer = (block, blockIdx) => {
    switch (block.type) {
        case "table":
            return (
                <table key={blockIdx}>
                    <thead>
                        <tr>
                            {block.headers.map((el, elIdx) => (
                                <th key={elIdx}>{el}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {block.rows.map((row, rowIdx) => (
                            <tr key={rowIdx}>
                                {row.map((el, cellIdx) => (
                                    <td key={cellIdx}>{el}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
        case "text":
            return <p key={blockIdx}>{block.content}</p>
        case "img":
            return <img key={blockIdx} className={block.dir} src={block.src} alt="" loading="lazy" />
        default:
            return null
    }
}

// JSX
function Blog() {
    // get id and blog data for that id
    const { id } = useParams();
    const [blogData, setBlogData] = useState();
    useEffect(() => {
        fetch(`http://localhost:3000/api/blogs/${id}`)
            .then(res => res.json())
            .then(result => {
                if (result.status == "success") setBlogData(result.data);
            });
    }, [id])
    // FIXME! how to handle error case?
    if (!blogData) return <p>Blog not found...</p>

    return (
        <article className="blog">
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
                <img className='heroImg' src={blogData.hero} alt="" loading="lazy" />
            </header>

            <main>
                
                {blogData.sections.map((section, idx) => {
                    // left side info panel
                    if (section.sectionType == "info") {
                        return (
                        <aside className={section.sectionType} key={idx}>
                            {section.subsections && section.subsections.map((sub, subIdx) => {
                                return (
                                    <div className='asideSub' key={subIdx}>
                                        <h2>{sub.title}</h2>
                                        {sub.blocks.map((block, blockIdx) => {
                                            return htmlRenderer(block, blockIdx);
                                        })}
                                    </div>
                                )
                            })}
                        </aside>
                        )

                    // main content
                    } else if (section.sectionType == "content") {
                        return (
                            <section className={section.sectionType} key={idx}>
                                <h2>{section.section}</h2> 
                                {section.subsections && section.subsections.map((sub, subIdx) => (
                                    <div className='subsection' key={subIdx}>
                                        <h3>{sub.title}</h3>
                                        {sub.blocks.map((block, blockIdx) => {
                                            return htmlRenderer(block, blockIdx);
                                        })}
                                    </div>
                                ))}
                            </section>
                        )
                    }
                })}
            </main>
            <Recommendation blog={blogData} type="related" />
            <Recommendation blog={blogData} type="similar" />
        </article>
    )
}

export default Blog