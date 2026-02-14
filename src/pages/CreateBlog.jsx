import './CreateBlog.css';
import BlogTable from '../components/BlogTable';
import { useState } from 'react';

function CreateBlog() {
    // form data
    const [formData, setFormData] = useState({
        titleInput: '',
        descriptionInput: '',
        locationInput: '',
        dateInput: '',
        heroImageInput: '',
        sections: []
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        console.log(formData);
    };

    // ADD SECTION
    const addSection = (newSectionType) => {
        if (formData.sections.every(section => section.sectionType != newSectionType.type)) {
            const newSection = {
                section: newSectionType.title,
                sectionType: newSectionType.type,
                subsections: [
                ]
            }
            setFormData(prev => ({
                ...prev,
                sections: [...prev.sections, newSection]
            }));
        }
    }

    // ASIDE TABLE DATA
    const addSideTable = (table) => {
        // CLOSE ASIDE BLOCK OPTION
        setAsideOption(false);
        // ADD SECTION TO DATA IF NEW SECTION
        addSection({type: 'info', title: 'Information'})
        // ADD DATA
        setFormData(prev => ({
            ...prev,
            sections: prev.sections.map((section) =>
                section.sectionType === 'info'? {
                    ...section,
                    subsections: [
                        ...section.subsections,
                        table
                    ]
                }
                : section
            )
        }));
    }
    const deleteSideTable = (secIdx, subIdx) => {
        setFormData(prev => ({
            ...prev,
            sections: prev.sections.map((section, sIdx) => {
                if(sIdx !== secIdx) return section;

                return {
                    ...section,
                    subsections: section.subsections.filter((sub, idx) => idx != subIdx)
                }
            })
        }))
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
                        {/* {formData.sections.some(section => section.sectionType === "info") ? <BlogTable /> : "" } */}
                        {formData.sections.map((section, secIdx) =>
                            section.subsections?.map((sub, subIdx) =>
                                sub.type === "table" ? 
                                <>
                                    <BlogTable key={subIdx} tableData={sub} setTableData={(newData) => {
                                        setFormData(prev => {
                                            const updatedSections = [...prev.sections];
                                            updatedSections[secIdx].subsections[subIdx] = newData;
                                            return { ...prev, sections: updatedSections };
                                        });}} 
                                    />
                                    <img src="../icon/delete-02-stroke-rounded.svg" alt="" onClick={() => deleteSideTable(secIdx, subIdx)} />
                                </> : null
                            )
                        )}
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
                        <div className='inputAdd'>
                            <button type='button' onClick={toggleMainOption}>
                                <img src="../icon/plus-sign-circle-stroke-rounded.svg" alt="" className={mainOption ? "rotate" : ""} />
                            </button>
                            <div className={`asideInputOptions ${mainOption ? "" : "hidden"}`}>
                                <button value="" type='button'>Paragraph</button>
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