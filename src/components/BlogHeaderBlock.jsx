import './BlogHeaderBlock.css';

function BlogHeaderBlock({headerData, setHeaderData, headerType}) {
    const handleHeaderChange = (e) => {
        setHeaderData(e.target.value);
    }
    return <div className={headerType == 'h1' ? 'headerBlock' : 'header2Block'}>
        <input type="text" value={headerData} onChange={handleHeaderChange} placeholder={headerType == 'h1' ? "Header" : "Sub header"} />
    </div>
}

export default BlogHeaderBlock