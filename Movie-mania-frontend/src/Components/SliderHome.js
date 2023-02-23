import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Pagination, Mousewheel, Keyboard, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function SliderHome() {

    let [data, setdata] = useState([]);
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
    }, [data])
    return (
        <>
            <Swiper
                style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                }}
                cssMode={true}
                mousewheel={true}
                keyboard={true}
                modules={[Autoplay, FreeMode, Navigation, Pagination, Mousewheel, Keyboard, Thumbs]}
                className="mySwiper"
                slidesPerView={"auto"}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
            >
                {pending && <h1>Loading...</h1>}
                {
                    data && data.map(movie => {
                        return (
                            <SwiperSlide className="slick-slide">
                                <Link to={`/moviedetails/${movie._id}`}>
                                    <img src={movie.Poster} alt='error' className="slider-poster"></img>
                                </Link>
                            </SwiperSlide>
                        )
                    })
                }
                {error && <h1>{error.message}</h1>}
            </Swiper>
        </>
    );
}