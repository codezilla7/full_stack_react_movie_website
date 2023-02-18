import React from "react";
import Slider from "react-slick";
import axios from "axios";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SliderHome() {

    let [data, setdata] = useState('');
    let [error, seterror] = useState('');
    let [pending, setpending] = useState(true);

    const getData = async (url) => {
        try {
            const res = await axios.get(url)
            setdata(res.data)
            setpending(false)
        } catch (error) {
            seterror(error.message)
            setpending(false)
        }
    }
    useEffect(() => {
        getData("http://localhost:8000/movies")
    }, [])

    const settings = {
        dots: true,
        speed: 500,
        slidesToScroll: 3,
        className: "center",
        centerMode: true,
        arrows: false,
        autoplay: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 7
      };
    return (
        <div className="main-slider" >
            {pending && <h1>Loading....</h1>}
            <Slider {...settings}>
                {
                    data && data.slice(0,8).map(movie => {
                        return (
                            <div className="carousel-item" style={{margin: '20px'}} >
                                <img src={movie.Poster} className='slider-poster'></img>
                            </div>
                        )
                    })
                }
            </Slider>
            {error && <h1>{error}</h1>}
        </div>
    );
}