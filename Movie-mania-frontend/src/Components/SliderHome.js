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

    useEffect(() => {
        axios
        .get("http://localhost:8000/slider")
        .then(response => {
            setdata(response.data)
            console.log(data)
            setpending(false)
        })
        .catch(error => {
            seterror(error.message)
            setpending(false)
        })
    }, [])

    const settings = {
        className: "",
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: false,
        adaptiveHeight: true
    };
    return (
        <div className="main-slider" >
            {pending && <h1>Loading....</h1>}
            <Slider {...settings}>
                {
                    data.map(movie => {
                        return (
                            <div className="carousel-item" style={{ margin: '20px' }} >
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