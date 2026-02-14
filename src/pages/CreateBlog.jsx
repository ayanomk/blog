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
        heroImageInput: ''
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

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

    // Add Block option
    const [asideOption, setAsideOption] = useState(false);
    const toggleAsideOption = (e) => {
        e.preventDefault();
        setAsideOption(!asideOption);
    } 

    // JSX
    return (
        <div className="createBlog">
            {/* <header>
                <h1>Create a blog post</h1>
            </header> */}

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
                        <BlogTable />
                        <div className='asideInputAdd'>
                            <button onClick={toggleAsideOption}>
                                <img src="../icon/plus-sign-circle-stroke-rounded.svg" alt="" className={asideOption ? "rotate" : ""} />
                            </button>
                            <div className={`asideInputOptions ${asideOption ? "" : "hidden"}`}>
                                <button value="" >Paragraph</button>
                                <button value="">Table</button>
                            </div>
                        </div>
                    </aside>
                    <main className='mainInput'>
                        <div>
                            <button>+</button>
                        </div>
                    </main>
                </div>

            </form>

            {/* <article className="blog">
                <header>
                    <div className="title">
                        <div className='mainTitle'>
                            <h1>test</h1>
                            <p>test</p>
                        </div>
                        <div className='dateLocation'>
                            <p>test</p>
                            <p>test</p>
                        </div>
                    </div>
                    <img className='heroImg' src="" alt="" loading="lazy" />
                </header>

                <main>
                    <aside className="" >
                        <div className='asideSub'>
                            <h2>test</h2>
                        </div>
                    </aside>
                    <section className="">
                        <h2>test</h2> 
                            <div className='subsection'>
                                <h3>test</h3>
                            </div>
                    </section>
                </main>
            </article> */}
        </div>
    )
}

export default CreateBlog