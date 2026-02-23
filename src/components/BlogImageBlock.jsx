import { useEffect, useState } from "react";

function BlogImageBlock() {
    const [previews, setPreviews] = useState([]);

    // // clean up temporary memory for previous URL
    // useEffect(() => {
    //     // return will make the following function run before the previews value change instead of after value change
    //     return () => {
    //         previews.forEach((url) => {
    //             URL.revokeObjectURL(url);
    //         })
    //     }
    // }, [previews])

    const handleChange = (e) => {
        const files = Array.from(e.target.files);
        if(e.target.files.length && e.target.files.length <= 3) {

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
                                setPreviews([url]);
                                // setPreviews(prev => [...prev, url]);
                            } else {
                                // cleans up temporary local URL for invalid images
                                URL.revokeObjectURL(url);
                            }
                        } else {
                            if (e.target.files.length > 1) {
                                setPreviews(prev => [...prev, url]);
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

    // const handleDeleteImg = (src) => {
    //     URL.revokeObjectURL(src);

    //     setPreviews(prev => {
    //         const newPrev = prev.filter((val) => val != src);
    //         return newPrev;
    //     })
    // }

    return <div>
        <input type="file" name="" id="" onChange={handleChange} multiple />

        <div>
            {previews.map((img, idx) => (
                <div>
                    <img key={idx} src={img} alt="" style={{width:"100%", height:"100%"}} />
                    {/* <img src="../icon/delete-02-stroke-rounded.svg" alt="" onClick={() => handleDeleteImg(img)}/> */}
                </div>
            ))}
        </div>
    </div>
}

export default BlogImageBlock