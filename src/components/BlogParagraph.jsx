import './BlogParagraph.css';

function BlogParagraph({paragraphData, setParagraphData}) {
    const handleParagraphChange = (e) => {
        const newData = {...paragraphData, content: e.target.value}
        setParagraphData(newData)

        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    }

    // JSX
    return <div className="blogParagraph">
            <textarea name="" id="" rows={(paragraphData.content.length / window.innerWidth) * 20} style={{overflow:'hidden', resize:'none'}} onChange={handleParagraphChange} value={paragraphData.content} />
        </div>
}

export default BlogParagraph