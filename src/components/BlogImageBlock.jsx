import { useEffect, useState } from "react";

function BlogImageBlock({imgData, setImgData}) {
    // clean up temporary memory for previous URL
    let urls = [];
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
            urls = [];

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
                                urls = [url];
                                setImgData({type: 'img', dir: 'imgH', src: urls});
                            } else {
                                // cleans up temporary local URL for invalid images
                                URL.revokeObjectURL(url);
                            }
                        } else {
                            if (e.target.files.length > 1) {
                                urls.push(url);
                                if (urls.length == 2) {
                                    setImgData({type: 'img', dir: 'imgV2', src: [...urls]})
                                } else if (urls.length == 3) {
                                    setImgData({type: 'img', dir: 'imgV3', src: [...urls]})
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

    return <div>
        <input type="file" name="" id="" onChange={handleChange} multiple />

        <div style={{display: "flex", flexDirection:"row", justifyContent: "space-around", width:"100%"}}>
            {imgData.src.map((src, idx) => (
                <img key={idx} src={src} alt="" style={{width:"45%", height:"100%"}} />
            ))}
        </div>
    </div>
}

export default BlogImageBlock