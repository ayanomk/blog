import './BlogImageBlock.css';
import { useEffect, useState } from "react";

function BlogImageBlock({imgData, setImgData}) {
    const [ errorMsg, setErrorMsg ] = useState("");

    useEffect(() => {
        // return will make the following function run before the previews value change instead of after value change
        return () => {
            imgData?.content?.src?.forEach((item) => {
                URL.revokeObjectURL(item.previewUrl);
            })
        }
    }, [imgData])

    const handleChange = async (e) => {
        setErrorMsg("");

        const files = Array.from(e.target.files);

        if(e.target.files.length && e.target.files.length <= 3) {

            const processUploadedImages = files.map(file => {
                // create promise for each file
                // function 'resolve' is called when data is ready and resolves the promise
                // 'resolve' contains the data (return value, which in this case an object {})
                return new Promise(resolve => {
                    const img = new Image();
                    const url = URL.createObjectURL(file);

                    img.onload = () => {
                        resolve({
                            file,
                            previewUrl: url,
                            landscape: img.width > img.height
                        })
                    }
                    img.src = url;
                })
            })

            const results = await Promise.all(processUploadedImages);

            let landscapeNum = 0;
            let portraitNum = 0;
            results.map(item => item.landscape ? landscapeNum++ : portraitNum++);

            let isError = false;
            if (landscapeNum == 0 && (portraitNum < 2 || portraitNum > 3)) {setErrorMsg("Portrait upload must be 2 or 3 images"); isError = true;}
            if (landscapeNum > 1 || (landscapeNum == 1 && portraitNum)) {setErrorMsg("Landscape upload must be 1 image"); isError = true;}

            if (!isError) {
                if (landscapeNum) {
                    setImgData({type: 'img', content: {dir: 'imgH', src: results}})
                } else {
                    setImgData({type: 'img', content: {dir: portraitNum == 2 ? 'imgV2' : 'imgV3', src: results}})
                }
            }
        } else if (e.target.files.length === 0){
            setErrorMsg("Please upload image");
        } else if (e.target.files.length > 3){
            setErrorMsg("Portrait upload must be 2 or 3 images. Landscape upload must be 1 image.");
        }
    }

    return <div className='imageBlockInput'>
        <div className='imageBlock'>
            {imgData.content.src.map((file, idx) => 
                file.previewUrl ? <img key={idx} src={file.previewUrl} alt="" className={imgData.content.dir} /> : null
            )}
        </div>
        {errorMsg ? <p className='imgUploadErrorMsg'>&#9888;{errorMsg}</p> : null}
        <input type="file" name="" id="" onChange={handleChange} multiple />
    </div>
}

export default BlogImageBlock