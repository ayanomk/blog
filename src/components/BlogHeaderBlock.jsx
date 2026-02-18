import './BlogHeaderBlock.css';

function BlogHeaderBlock({headerData, setHeaderData, headerType}) {
    const handleHeaderChange = (e) => {
        const newData = {...headerData, content: e.target.value}
        setHeaderData(newData);
    }
    return <div className={headerType == 'h1' ? 'headerBlock' : 'header2Block'}>
        <input type="text" value={headerData.content} onChange={handleHeaderChange} placeholder={headerType == 'h1' ? "Header" : "Sub header"} />
    </div>
}

export default BlogHeaderBlock