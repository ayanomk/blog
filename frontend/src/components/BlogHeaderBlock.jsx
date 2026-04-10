import './BlogHeaderBlock.css';

function BlogHeaderBlock({headerData, setHeaderData, headerType}) {
    const handleHeaderChange = (e) => {
        const newData = {...headerData, content: e.target.value}
        setHeaderData(newData);

        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    }

    return <div className={`blogHeaderBlock ${headerType == 'h1' ? 'headerBlock' : 'header2Block'}`}>
        <textarea rows={1} value={headerData.content} onChange={handleHeaderChange} placeholder={headerType == 'h1' ? "Header" : "Sub header"} />
    </div>
}

export default BlogHeaderBlock