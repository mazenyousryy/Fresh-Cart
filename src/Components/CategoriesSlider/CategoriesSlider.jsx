import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

export default function CategoriesSlider() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 7,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const [categories, setCategories] = useState([]);

    async function getAllCategories() {
        const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
        setCategories(data.data);
    }

    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <>
            <Slider {...settings}>
                {categories.map((category, index) => {
                    return (
                        <div key={index}>
                            <img src={category.image} alt="Category" height={200} className="mx-2 w-100" />
                            <h5 className="text-center">{category.name}</h5>
                        </div>
                    );
                })}
            </Slider>
        </>
    );
}
