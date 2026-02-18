import './CreateBlog.css';
import BlogTable from '../components/BlogTable';
import BlogParagraph from '../components/BlogParagraph';
import { useState } from 'react';
import BlogHeaderBlock from '../components/BlogHeaderBlock';

function CreateBlog() {
    // form data
    const [formData, setFormData] = useState({
        titleInput: '',
        descriptionInput: '',
        locationInput: '',
        dateInput: '',
        heroImageInput: '',
        sections: [
            {
                section: "Information",
                sectionType: "info",
                blocks: []
            },
            {
                section: "The Day",
                sectionType: "content",
                blocks: []
            }
        ]
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // ADD MAIN PARAGRAPH
    const addMain = (block) => {
        setMainOption(false);

        const newBlock = {
            type: block.type,
            content: block.content
        }

        setFormData(prev => {
            const updatedSections = [...prev.sections];
            updatedSections[1] = {
                ...updatedSections[1],
                blocks: [...updatedSections[1].blocks, newBlock]
            };

            return {...prev, sections: updatedSections}
        })
    }
    const deleteMainBlock = (delIdx) => {
        setFormData(prev => {
            const updatedSections = [...prev.sections];
            updatedSections[1] = {
                ...updatedSections[1],
                blocks: updatedSections[1].blocks.filter((_, idx) => idx !== delIdx)
            }

            return {
                ...prev,
                sections: updatedSections
            }
        })
    }
    const updateMain = (newData, mainBidx) => {
        setFormData(prev => {
            const updatedSections = [...prev.sections];
            updatedSections[1].blocks[mainBidx] = newData;

            return {...prev, sections: updatedSections}
        })
    }

    // ASIDE
    const addSide = (block) => {
        setAsideOption(false);

        setFormData(prev => {
            const updatedSections = [...prev.sections];
            updatedSections[0] = {
                ...updatedSections[0],
                blocks: [...updatedSections[0].blocks, block]
            };

            return {...prev, sections: updatedSections}
        })
    }
    const deleteSideBlock = (sideBidx) => {
        setFormData(prev => {
            const updatedSections = [...prev.sections];
            updatedSections[0] = {
                ...updatedSections[0],
                blocks: updatedSections[0].blocks.filter((_, idx) => idx !== sideBidx)
            }

            return{...prev, sections: updatedSections}
        })
    }
    const updateSide = (newData, sideBIdx) => {
        setFormData(prev => {
            const updatedSections = [...prev.sections];
            updatedSections[0].blocks[sideBIdx] = newData;

            return {...prev, sections: updatedSections}
        })
    }

    // hero image preview
    const [heroImage, setHeroImage] = useState(null);
    const handleHeroImagePreviewChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setHeroImage(reader.result);
                };
                reader.readAsDataURL(file);
                handleChange(e);
            }
        }
    };

    // Add SIDE Block option
    const [asideOption, setAsideOption] = useState(false);
    const toggleAsideOption = () => {
        setAsideOption(!asideOption);
    }
    // Add MAIN Block option
    const [mainOption, setMainOption] = useState(false);
    const toggleMainOption = () => {
        setMainOption(!mainOption);
    }

    // BLOCKS
    // HEADER
    const headerBlock = {
        type: "header",
        content: ""
    }
    const header2Block = {
        type: "header2",
        content: ""
    }
    // PARAGRAPH
    const paragraphBlock = {
        type: "text",
        content: ""
    }
    // TABLE
    const tableBlock = {
        type: "table",
        // title: "",
        header: ["", ""],
        rows: [
            ["", ""]
        ]
    }

    // JSX
    return (
        <div className="createBlog">

            <form action="">
                <div className="title">
                    <div className='mainTitle'>
                        <input type="text" className='titleInput' name="titleInput" value={formData.titleInput} onChange={handleChange} placeholder='Title' />
                        <input type="text" className='descriptionInput' name="descriptionInput" value={formData.descriptionInput} onChange={handleChange} placeholder='Description' />
                    </div>
                    <div className='dateLocation'>
                        <input type="text" name="locationInput" value={formData.locationInput} onChange={handleChange} placeholder='Location' />
                        <input type="date" name="dateInput" value={formData.dateInput} onChange={handleChange} placeholder='Date' />
                    </div>
                </div>
                <div className='heroInput'>
                    {heroImage != null ? <img src={heroImage} alt="" /> : ""}
                    <input className='heroImageInput' type="file" name="heroImageInput" value={formData.heroImageInput} onChange={handleHeroImagePreviewChange} />
                </div>

                <div className="contentInput">

                    <aside className='asideInput'>
                        {formData.sections[0].blocks?.map((block, sideBidx) => {
                            if (block.type === 'table') {
                                return <div key={sideBidx} >
                                    <BlogTable tableData={block} setTableData={(newData) => updateSide(newData, sideBidx)} />
                                    <img src="../icon/delete-02-stroke-rounded.svg" alt="" onClick={() => deleteSideBlock(sideBidx)} />
                                </div>
                            }
                        })}

                        <div className='inputAdd'>
                            <button type='button' onClick={toggleAsideOption}>
                                <img src="../icon/plus-sign-circle-stroke-rounded.svg" alt="" className={asideOption ? "rotate" : ""} />
                            </button>
                            <div className={`asideInputOptions ${asideOption ? "" : "hidden"}`}>
                                <button value="" type='button' >Header 1</button>
                                <button value="" type='button' >Paragraph</button>
                                <button value="" type='button' onClick={() => {addSide(tableBlock)}}>Table</button>
                            </div>
                        </div>
                    </aside>

                    <main className='mainInput'>
                        {formData.sections[1].blocks?.map((block, mainBidx) => {
                            let content;
                            switch (block.type) {
                                case 'text':
                                    content = <BlogParagraph paragraphData={block} setParagraphData={(newData) => updateMain(newData, mainBidx)}/>
                                    break;
                                case 'header':
                                    content = <BlogHeaderBlock headerType={'h1'} headerData={block} setHeaderData={(newData) => updateMain(newData, mainBidx)} />
                                    break;
                                case 'header2':
                                    content = <BlogHeaderBlock headerType={'h2'} headerData={block} setHeaderData={(newData) => updateMain(newData, mainBidx)} />
                                    break;
                            }
                            return <div key={mainBidx}>
                                {content}
                                <img src="../icon/delete-02-stroke-rounded.svg" alt="" onClick={() => deleteMainBlock(mainBidx)}/>
                            </div>
                        })}

                        <div className='inputAdd'>
                            <button type='button' onClick={toggleMainOption}>
                                <img src="../icon/plus-sign-circle-stroke-rounded.svg" alt="" className={mainOption ? "rotate" : ""} />
                            </button>
                            <div className={`asideInputOptions ${mainOption ? "" : "hidden"}`}>
                                <button value="" type='button' onClick={() => {addMain(headerBlock)}}>Header</button>
                                <button value="" type='button'onClick={() => {addMain(header2Block)}}>Header 2</button>
                                <button value="" type='button' onClick={() => {addMain(paragraphBlock)}}>Paragraph</button>
                                <button value="" type='button'>Image Horizontal</button>
                                <button value="" type='button'>Image Vertical x 2</button>
                                <button value="" type='button'>Image Vertical x 3</button>
                                {/* <button value="" type='button'>Table</button> */}
                            </div>
                        </div>

                    </main>
                </div>

            </form>

        </div>
    )
}

export default CreateBlog