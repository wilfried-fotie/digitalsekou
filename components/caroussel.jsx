import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowRight, ArrowLeft } from 'react-bootstrap-icons'
import  { Visualisation } from "./Entreprise/Offre";
import {Visualisation as V} from "./Entreprise/Pub";
import Link from "next/link"

export default function SimpleSlider({ data, pub, en=false}) {
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
        prevArrow: <ArrowLeft height={100} color="#4a00b4" />,
        nextArrow: <ArrowRight height={100} color="#4a00b4" />,

    };
    return (
        <Slider {...settings}>

          

            {data.map((e, k) => <center><Visualisation key={k} mode={true} data={{ ...e, expiration: e.expire, objet: e.title,outro: en ? e.content : null,content: en ? null : e.content,logo: en ? "/" + e.logo : e.logo  }} /></center>)}
            {pub.map((e, k) => <center><V key={k} mode={true} data={{...e,media: "/" + e.media}} /></center>)}

        </Slider>
    );
}