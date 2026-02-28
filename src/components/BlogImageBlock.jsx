import './BlogImageBlock.css';
import { useEffect, useState } from "react";

function BlogImageBlock({imgData, setImgData}) {
    // clean up temporary memory for previous URL
    const [urls, setUrls] = useState([]);
    useEffect(() => {
        // return will make the following function run before the previews value change instead of after value change
        return () => {
            urls.forEach((url) => {
                URL.revokeObjectURL(url);
            })
        }
    }, [urls])


    const handleChange = (e) => {
        const files = Array.from(e.target.files);
        if(e.target.files.length && e.target.files.length <= 3) {
            const newUrls = [];

            files.forEach(file => {
                if (file.type.startsWith("image/")) {
                    // create invisible <img> to access image data
                    const img = new Image();
                    // convert file into temporary local URL (e.g. localhost:3000/imagefile.jpg)
                    const url = URL.createObjectURL(file);
                    
                    // callback function that only runs after image is loaded
                    img.onload = () => {
                        if (img.width > img.height) {
                            if (e.target.files.length === 1) {
                                setUrls([url]);
                                setImgData({type: 'img', content: {dir: 'imgH', src: [url]}});
                            } else {
                                // cleans up temporary local URL for invalid images
                                URL.revokeObjectURL(url);
                            }
                        } else {
                            if (e.target.files.length > 1) {
                                newUrls.push(url);
                                setUrls(newUrls);
                                if (newUrls.length == 2) {
                                    setImgData({type: 'img', content: {dir: 'imgV2', src: newUrls}})
                                } else if (newUrls.length == 3) {
                                    setImgData({type: 'img', content: {dir: 'imgV3', src: newUrls}})
                                }
                            } else {
                                // cleans up temporary local URL for invalid images
                                URL.revokeObjectURL(url);
                            }
                        }
                    }

                    // points (assigns) to the URL location for the image
                    img.src = url;
                }
            });
        }
    }

    return <div className='imageBlockInput'>
        <div className='imageBlock'>
            {imgData.content.src.map((src, idx) => (
                <img key={idx} src={src} alt="" className={imgData.content.dir} />
            ))}
        </div>
        <input type="file" name="" id="" onChange={handleChange} multiple />
    </div>
}

export default BlogImageBlock