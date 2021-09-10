import React from "react";
import Slider from "react-slick";
import Image from 'next/image';
import draftToHtml from 'draftjs-to-html'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowRight, ArrowLeft } from 'react-bootstrap-icons'
import Icon from "./CustomHooks/Icon";
import  { Visualisation } from "./Entreprise/Offre";
import {Visualisation as V} from "./Entreprise/Pub";
import { Markup } from "interweave";
import Link from "next/link"


export default function SimpleSlider({data}) {
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

            {/* <center><img src="/dot1.jpg" width={500} height={300} /></center>

            <center><img src="/dot2.jpg" width={500} height={300} /></center>

            <center><img src="/dot3.jpg" width={500} height={300} /> </center>
            <center><img src="/dot4.jpg" width={500} height={300} /></center>
            <center><img src="/dot5.jpg" width={500} height={300} /></center>

             <img src="/dot6.jpg" width={500} height={300} />  */}

            {data.map((e, k) => <center><Visualisation key={k} data={{ ...e, expiration: e.expire, objet: e.title }} /></center>)}
            {pub.map((e, k) => <center><V key={k} data={e} /></center>)}

        </Slider>
    );
}