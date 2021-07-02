import React from "react";
import Slider from "react-slick";
import Image from 'next/image';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowRight, ArrowLeft } from 'react-bootstrap-icons'


export default function SimpleSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        centerMode: true,
        slidesToShow: 1,
        arrows: true,
        slidesToScroll: 1,
        prevArrow: <ArrowLeft size={100} color="#4a00b4" />,
        nextArrow: <ArrowRight size={100} color="#4a00b4" />

    };
    return (
        <Slider {...settings}>

            <center><img src="/dot1.jpg" width={500} height={300} /></center>

            <center><img src="/dot2.jpg" width={500} height={300} /></center>

            <center><img src="/dot3.jpg" width={500} height={300} /> </center>
            <center><img src="/dot4.jpg" width={500} height={300} /></center>
            <center><img src="/dot5.jpg" width={500} height={300} /></center>

            <center> <img src="/dot6.jpg" width={500} height={300} /> </center>

        </Slider>
    );
}