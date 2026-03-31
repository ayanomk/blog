import { useEffect, useState } from "react";
import "./Carousel.css";

function Carousel({data}) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        setCount(0);
    }, [data])

    return (
        <div className="carousel">
            <div className="blogContainer">
                <img src={data[count].hero.url} alt="" loading="lazy" />
                <p className="popupBlogTitle">{data[count].title}{data[count].day != 0 ? `: Day ${data[count].day}` : ""}</p>
                <p className="">{data[count].date}/{data[count].month}/{data[count].year}</p>
            </div>
            {/* <div className="lrButtons">
                <button className="leftButton" onClick={() => {
                    if (count > 0) setCount(count-1);
                    else setCount(data.length - 1);
                }}><img src="../icon/arrow-down-01-stroke-rounded.svg" style={{transform: "rotate(90deg)"}} /></button>
                <button className="rightButton" onClick={() => {
                    if (count < data.length - 1) setCount(count+1);
                    else setCount(0);
                }}><img src="../icon/arrow-down-01-stroke-rounded.svg" style={{transform: "rotate(-90deg)"}} /></button>
            </div> */}
            <div className="buttons">
                {data.map((_, idx) => (
                    <button className={idx === count ? "activeButton" : ""} onClick={() => {
                        setCount(idx);
                    }} key={idx}></button>
                ))}
            </div>
        </div>
    )
}

export default Carousel