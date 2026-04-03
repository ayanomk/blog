import './CreateBlog.css';
import BlogTable from '../components/BlogTable';
import BlogParagraph from '../components/BlogParagraph';
import BlogHeaderBlock from '../components/BlogHeaderBlock';
import BlogImageBlock from '../components/BlogImageBlock';
import SubmitFormMessage from '../components/SubmitFormMessage.jsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom"
import { editBlog, getBlogById } from "../services/blogService.js";

import { createBlog } from '../services/blogService.js';
import ProcessPopupMsg from '../components/ProcessPopupMsg.jsx';

function CreateBlog({isEdit}) {
    const navigate = useNavigate();

    // form data
    const initialForm = {
        title: '',
        description: '',
        locationInput: '',
        dateInput: '',
        day: 0,
        hero: "",
        sections: [
            {
                sectionType: "info",
                blocks: []
            },
            {
                sectionType: "content",
                blocks: []
            }
        ],
        state: 'Draft'
    }
    const [formData, setFormData] = useState(initialForm)

    const [previousImages, setPreviousImages] = useState({
        hero: "",
        content: []
    })

    const { id } = useParams();
    useEffect(() => {
        if (isEdit && id) {
            getBlogById(id)
                .then((d) => {
                    const {city, country, year, month, date, lat, lng, region, hero, sections, ...rest} = d;
                    const editForm = {
                        ...rest,
                        hero,
                        sections,
                        locationInput: `${city}, ${country}`,
                        dateInput: `${year}-${String(month).padStart(2, "0")}-${String(date).padStart(2, "0")}`
                    };

                    const preImg = {
                        hero: hero.publicId,
                        content: []
                    }
                    sections.forEach(section => {
                        section.blocks.forEach(block => {
                            if (block.type === 'img') {
                                block.content.src.forEach((i) => preImg.content.push(i.publicId))
                            }
                        })
                    })
                    setPreviousImages(preImg)

                    setFormData(editForm)
                })
                .catch(err => console.log(err));
        } else {
            setFormData(initialForm)
        }
    }, [isEdit, id])

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
    const [isInProcess, setIsInProcess] = useState(false);
    const [isDraft, setIsDraft] = useState(true);
    const [invalidForm, setInvalidaForm] = useState([]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setInvalidaForm([])

        // Check for missing required fields
        const missingFields = [];
        Object.entries(formData).forEach(([key, val]) => {
            if (val.length === 0) {
                document.querySelector(`.${key}`).classList.add('missingForm');
                missingFields.push(key)
            }
        })

        // Remove empty blocks
        const deleteBlocks = {};
        formData.sections.map((section, sIdx) => {
            deleteBlocks[sIdx] = [];
            section.blocks.map((block, bIdx) => {
                if (block.type === 'table' && block.content.header[0] === '') {
                    deleteBlocks[sIdx].push(bIdx);
                } else if (block.type === 'img' && block.content.dir === '') {
                    deleteBlocks[sIdx].push(bIdx);
                } else if (block.content === '') {
                    deleteBlocks[sIdx].push(bIdx);
                }
            })
        })

        const updatedSections = [...formData.sections];
        Object.keys(deleteBlocks).forEach((sIdx) => {
            updatedSections[sIdx] = {
                ...updatedSections[sIdx],
                blocks: updatedSections[sIdx].blocks.filter((_, idx) => !deleteBlocks[sIdx].includes(idx))
            }
        });
        const updatedFormData = {
            ...formData,
            sections: updatedSections
        }

        setFormData(updatedFormData);


        // Create blog if no missing fields
        if (missingFields.length === 0) {
            try {

                const images = [];
                const cleanData = JSON.parse(JSON.stringify(updatedFormData));

                // separate image file and replace with null
                if (updatedFormData.hero.file) {
                    images.push(updatedFormData.hero.file);
                    cleanData.hero = null;
                }
                updatedFormData.sections.forEach((section, sidx) => {
                    section.blocks.forEach((block, bidx) => {
                        if (block.type === 'img') {
                            block.content.src.forEach((file, fidx) => {
                                if (file.file) {
                                    images.push(file.file);
                                    cleanData.sections[sidx].blocks[bidx].content.src[fidx] = null;
                                }
                            });
                        }
                    })
                })

                if (e.target.id === 'publishButton') {
                    cleanData.state = 'Publish'
                    setIsDraft(false);
                };

                const finalFormData = new FormData();
                finalFormData.append("data", JSON.stringify(cleanData));
                images.forEach(image => finalFormData.append("images", image));

                let res;
                if (isEdit) {
                    finalFormData.append("previousImages", JSON.stringify(previousImages));
                    setIsInProcess(true);
                    res = await editBlog(id, finalFormData);
                } else {
                    setIsInProcess(true);
                    res = await createBlog(finalFormData);
                }
                navigate(`/blogs/${res._id}`);
            } catch (err) {
                if (err.message.includes("country")) {
                    document.querySelector(`.locationInput`).classList.add('missingForm');
                    missingFields.push('locationInput');
                }
                if (err.message == "No token") navigate("/admin/login");
                console.log(err);
            }
        }

        setInvalidaForm(missingFields);

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
                e.target.classList.remove("missingForm");

                URL.revokeObjectURL(formData.hero.previewUrl);

                const img = new Image();
                const url = URL.createObjectURL(file);

                img.onload = () => {                    
                    setFormData(prev => {
                        return {
                            ...prev,
                            hero: {
                                file: file,
                                previewUrl: url
                            }
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
                        <input type="text" name="locationInput" className='locationInput' value={formData.locationInput} onChange={handleChange} placeholder='Location' required />
                        <div style={{display:"flex",}}>
                            <input type="date" name="dateInput" className='dateInput' value={formData.dateInput} onChange={handleChange} placeholder='Date' required />
                            <input type="number" name="day" className='day' value={formData.day} onChange={handleChange} placeholder='Day' min={0} style={{width: "30%", marginLeft:"15px"}} required />
                        </div>
                    </div>
                </div>
                <div className='heroInput'>
                    {formData.hero != "" ? <img src={formData.hero.url? formData.hero.url : formData.hero.previewUrl} alt="" /> : ""}
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
                                <img className='deleteButton' src="/icon/delete-02-stroke-rounded.svg" alt="" onClick={() => deleteBlock(0, sideBidx)} />
                            </div>
                        })}

                        <div className='inputAdd'>
                            <button type='button' onClick={toggleAsideOption}>
                                <img src="/icon/plus-sign-circle-stroke-rounded.svg" alt="" className={asideOption ? "rotate" : ""} />
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
                                <img className='deleteButton' src="/icon/delete-02-stroke-rounded.svg" alt="" onClick={() => deleteBlock(1, mainBidx)}/>
                            </div>
                        })}

                        <div className='inputAdd'>
                            <button type='button' onClick={toggleMainOption}>
                                <img src="/icon/plus-sign-circle-stroke-rounded.svg" alt="" className={mainOption ? "rotate" : ""} />
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
                <button type='button' id='saveDraftButton' onClick={handleSubmit}>Save Draft</button>
                <button type='button' id='publishButton' onClick={handleSubmit}>Publish</button>
            </div>

            {invalidForm.length !== 0 && <SubmitFormMessage missingFormList={invalidForm} setMissingFormList={() => setInvalidaForm([])} />}
            {isInProcess ? <ProcessPopupMsg msg={isDraft ? `Saving draft: ${formData.title} ...` : `Publishing blog: ${formData.title} ...`} /> : null}
        </div>
    )
}

export default CreateBlog