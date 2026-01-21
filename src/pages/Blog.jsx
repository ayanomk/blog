import { useParams } from "react-router-dom"
// const { id } = useParams();
import './Blog.css';
import { mockData } from '../data/mockData.js';

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
            return <img key={blockIdx} className={block.dir} src={block.src} alt="" />
        default:
            return null
    }
}

// JSX
function Blog() {
    const { id } = useParams();
    const data = mockData.find(d => d.id === parseInt(id));
    if (!data) return <p>Blog not found...</p>
    console.log(data);

    return (
        <article className="blog">
            <header>
                <div className="title">
                    <div className='mainTitle'>
                        <h1>{data.title}</h1>
                        <p>{data.description}</p>
                    </div>
                    <div className='dateLocation'>
                        <p>{`${data.city}, ${data.country}`}</p>
                        <p>{`${data.year}/${data.month}/${data.date}`}</p>
                    </div>
                </div>
                <img className='heroImg' src={data.hero} alt="" />
            </header>

            <main>
                
                {data.sections.map((section, idx) => {
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
        </article>
    )
}

export default Blog