import './CreateBlog.css';
import BlogTable from '../components/BlogTable';
import BlogParagraph from '../components/BlogParagraph';
import { useState } from 'react';

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
    const addMain = (type, content) => {
        setMainOption(false);

        const newBlock = {
            type: type,
            content: content
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

    // ASIDE TABLE DATA
    const addSideTable = (table) => {
        // CLOSE ASIDE BLOCK OPTION
        setAsideOption(false);

        setFormData(prev => {
            const updatedSections = [...prev.sections];
            updatedSections[0] = {
                ...updatedSections[0],
                blocks: [...updatedSections[0].blocks, table]
            }

            return {
                ...prev,
                sections: updatedSections
            }
        })
    }
    const deleteSideTable = (sideBidx) => {
        setFormData(prev => {
            const updatedSections = [...prev.sections];
            updatedSections[0] = {
                ...updatedSections[0],
                blocks: updatedSections[0].blocks.filter((_, idx) => idx !== sideBidx)
            }

            return{
                ...prev,
                sections: updatedSections
            }
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
    // TABLE
    const tableBlock = {
        type: "table",
        title: "",
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
                                    <BlogTable tableData={block} setTableData={(newData) => {
                                        setFormData(prev => {
                                            const updatedSections = [...prev.sections];
                                            updatedSections[0].blocks[sideBidx] = newData;

                                            return {...prev, sections: updatedSections}
                                        })}}
                                    />
                                    <img src="../icon/delete-02-stroke-rounded.svg" alt="" onClick={() => deleteSideTable(sideBidx)} />
                                </div>
                            }
                        })}

                        <div className='inputAdd'>
                            <button type='button' onClick={toggleAsideOption}>
                                <img src="../icon/plus-sign-circle-stroke-rounded.svg" alt="" className={asideOption ? "rotate" : ""} />
                            </button>
                            <div className={`asideInputOptions ${asideOption ? "" : "hidden"}`}>
                                <button value="" >Paragraph</button>
                                <button value="" type='button' onClick={() => {addSideTable(tableBlock)}}>Table</button>
                            </div>
                        </div>
                    </aside>

                    <main className='mainInput'>
                        {formData.sections[1].blocks?.map((block, mainBidx) => {
                            if (block.type === 'text') {
                                return <div key={mainBidx}>
                                        <BlogParagraph />
                                        <img src="../icon/delete-02-stroke-rounded.svg" alt=""/>
                                    </div>
                            }
                        })}

                        <div className='inputAdd'>
                            <button type='button' onClick={toggleMainOption}>
                                <img src="../icon/plus-sign-circle-stroke-rounded.svg" alt="" className={mainOption ? "rotate" : ""} />
                            </button>
                            <div className={`asideInputOptions ${mainOption ? "" : "hidden"}`}>
                                <button value="" type='button'>Header</button>
                                <button value="" type='button'>Header 2</button>
                                <button value="" type='button' onClick={() => {addMain("text", "asdfasdf;asfn;askdnf;kadnk")}}>Paragraph</button>
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