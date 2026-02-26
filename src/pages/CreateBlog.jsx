import './CreateBlog.css';
import BlogTable from '../components/BlogTable';
import BlogParagraph from '../components/BlogParagraph';
import BlogHeaderBlock from '../components/BlogHeaderBlock';
import BlogImageBlock from '../components/BlogImageBlock';
import { useState } from 'react';

import { createBlog } from '../services/blogService.js';

function CreateBlog() {
    // form data
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        locationInput: '',
        dateInput: '',
        day: 1,
        hero: '',
        sections: [
            {
                sectionType: "info",
                blocks: []
            },
            {
                sectionType: "content",
                blocks: []
            }
        ]
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        // validation
        if (value.length === 0 || value == 0) e.target.classList.add("missingForm");
        else e.target.classList.remove("missingForm");

        setFormData({
            ...formData,
            [name]: value
        });
    };

    // SUBMIT BLOG
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createBlog(formData);
            console.log("Blog created");
        } catch (err) {
            console.log(err);
        }
    }

    // BLOCK MANAGEMENTS
    const addBlock = (sct, block) => {
        setMainOption(false);
        setAsideOption(false);

        setFormData(prev => {
            const updatedSections = [...prev.sections];
            updatedSections[sct] = {
                ...updatedSections[sct],
                blocks: [...updatedSections[sct].blocks, block]
            };

            return {...prev, sections: updatedSections}
        })
    }

    const deleteBlock = (sct, delIdx) => {
        // free image URL memory
        formData.sections[sct].blocks[delIdx].src?.forEach(url => {
            URL.revokeObjectURL(url);
        });
        
        // remove block
        setFormData(prev => {
            const updatedSections = [...prev.sections];
            updatedSections[sct] = {
                ...updatedSections[sct],
                blocks: updatedSections[sct].blocks.filter((_, idx) => idx !== delIdx)
            }

            return {
                ...prev,
                sections: updatedSections
            }
        })
    }

    const updateBlock = (sct, newData, mainBidx) => {
        setFormData(prev => {
            const updatedSections = [...prev.sections];
            updatedSections[sct].blocks[mainBidx] = newData;

            return {...prev, sections: updatedSections}
        })
    }

    // hero image preview
    const handleHeroImagePreviewChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith("image/")) {
                URL.revokeObjectURL(formData.hero);

                const img = new Image();
                const url = URL.createObjectURL(file);

                img.onload = () => {                    
                    setFormData(prev => {
                        return {
                            ...prev,
                            hero: url
                        }
                    })
                }
                img.src = url;
            }
        }
    };

    // SIDE Block option
    const [asideOption, setAsideOption] = useState(false);
    const toggleAsideOption = () => {
        setAsideOption(!asideOption);
    }
    // MAIN Block option
    const [mainOption, setMainOption] = useState(false);
    const toggleMainOption = () => {
        setMainOption(!mainOption);
    }

    // BLOCKS
    const headerBlock = {
        type: "header1",
        content: ""
    }
    const header2Block = {
        type: "header2",
        content: ""
    }
    const paragraphBlock = {
        type: "text",
        content: ""
    }
    const tableBlock = {
        type: "table",
        content: {
            header: ["", ""],
            rows: [
                ["", ""]
            ]
        }
    }
    const imageBlock = {
        type: "img",
        content: {
            dir: "",
            src: []
        }
    }

    // JSX
    return (
        <div className="createBlog">

            <form action="">
                <div className="titleInput">
                    <div className='mainTitle'>
                        <input type="text" className='title' name="title" value={formData.title} onChange={handleChange} placeholder='Title' required />
                        <input type="text" className='description' name="description" value={formData.description} onChange={handleChange} placeholder='Description' required />
                    </div>
                    <div className='dateLocation'>
                        <input type="text" name="locationInput" value={formData.locationInput} onChange={handleChange} placeholder='Location' required />
                        <div style={{display:"flex",}}>
                            <input type="date" name="dateInput" value={formData.dateInput} onChange={handleChange} placeholder='Date' required />
                            <input type="number" name="day" value={formData.day} onChange={handleChange} placeholder='Day' min={1} style={{width: "30%", marginLeft:"15px"}} required />
                        </div>
                    </div>
                </div>
                <div className='heroInput'>
                    {formData.hero != '' ? <img src={formData.hero} alt="" /> : ""}
                    <input className='hero' type="file" name="hero" onChange={handleHeroImagePreviewChange} />
                </div>

                <div className="contentInput">

                    <aside className='asideInput'>
                        {formData.sections[0].blocks?.map((block, sideBidx) => {
                            let content;
                            switch (block.type) {
                                case 'table':
                                    content = <BlogTable tableData={block} setTableData={(newData) => updateBlock(0, newData, sideBidx)} />
                                    break;
                                case 'header1':
                                    content = <BlogHeaderBlock headerType={'h1'} headerData={block} setHeaderData={(newData) => updateBlock(0, newData, sideBidx)} />
                                    break;
                                case 'text':
                                    content = <BlogParagraph paragraphData={block} setParagraphData={(newData) => updateBlock(0, newData, sideBidx)}/>
                                    break;
                                default:
                                    content = null;
                            }

                            return <div key={sideBidx} className='block'>
                                {content}
                                <img className='deleteButton' src="../icon/delete-02-stroke-rounded.svg" alt="" onClick={() => deleteBlock(0, sideBidx)} />
                            </div>
                        })}

                        <div className='inputAdd'>
                            <button type='button' onClick={toggleAsideOption}>
                                <img src="../icon/plus-sign-circle-stroke-rounded.svg" alt="" className={asideOption ? "rotate" : ""} />
                            </button>
                            <div className={`inputOptions ${asideOption ? "" : "hidden"}`}>
                                <button value="" type='button' onClick={() => {addBlock(0, headerBlock)}}>Header 1</button>
                                <button value="" type='button' onClick={() => {addBlock(0, paragraphBlock)}}>Paragraph</button>
                                <button value="" type='button' onClick={() => {addBlock(0, tableBlock)}}>Table</button>
                            </div>
                        </div>
                    </aside>

                    <main className='mainInput'>
                        {formData.sections[1].blocks?.map((block, mainBidx) => {
                            let content;
                            switch (block.type) {
                                case 'text':
                                    content = <BlogParagraph paragraphData={block} setParagraphData={(newData) => updateBlock(1, newData, mainBidx)}/>
                                    break;
                                case 'header1':
                                    content = <BlogHeaderBlock headerType={'h1'} headerData={block} setHeaderData={(newData) => updateBlock(1, newData, mainBidx)} />
                                    break;
                                case 'header2':
                                    content = <BlogHeaderBlock headerType={'h2'} headerData={block} setHeaderData={(newData) => updateBlock(1, newData, mainBidx)} />
                                    break;
                                case 'img':
                                    content = <BlogImageBlock imgData={block} setImgData={(newData) => updateBlock(1, newData, mainBidx)} />
                                    break;
                                default:
                                    content = null;
                            }
                            return <div key={mainBidx} className='block'>
                                {content}
                                <img className='deleteButton' src="../icon/delete-02-stroke-rounded.svg" alt="" onClick={() => deleteBlock(1, mainBidx)}/>
                            </div>
                        })}

                        <div className='inputAdd'>
                            <button type='button' onClick={toggleMainOption}>
                                <img src="../icon/plus-sign-circle-stroke-rounded.svg" alt="" className={mainOption ? "rotate" : ""} />
                            </button>
                            <div className={`inputOptions ${mainOption ? "" : "hidden"}`}>
                                <button value="" type='button' onClick={() => {addBlock(1, headerBlock)}}>Header 1</button>
                                <button value="" type='button' onClick={() => {addBlock(1, header2Block)}}>Header 2</button>
                                <button value="" type='button' onClick={() => {addBlock(1, paragraphBlock)}}>Paragraph</button>
                                <button value="" type='button' onClick={() => {addBlock(1, imageBlock)}}>Images</button>
                            </div>
                        </div>

                    </main>
                </div>


            </form>

            <div className="submitButtons">
                <button type='button'>Save Draft</button>
                <button type='button' onClick={handleSubmit}>Publish</button>
            </div>

        </div>
    )
}

export default CreateBlog