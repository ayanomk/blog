import './CreateBlog.css';
import { useState } from 'react';

function CreateBlog() {
    return (
        <div className="createBlog">
            {/* <header>
                <h1>Create a blog post</h1>
            </header> */}

            <form action="">
                <div className="title">
                    <div className='mainTitle'>
                        <input type="text" className='titleInput' placeholder='Title' />
                        <input type="text" className='descripInput' placeholder='Description' />
                    </div>
                    <div className='dateLocation'>
                        <input type="text" placeholder='Location' />
                        <input type="date" placeholder='Date' />
                    </div>
                </div>
                <div className='heroInput'>
                    <input className='heroImageInput' type="file" />
                    <img src="" alt="" />
                </div>

                <div className="contentInput">
                    <aside className='asideInput'>
                        <div>
                            <button>+</button>
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