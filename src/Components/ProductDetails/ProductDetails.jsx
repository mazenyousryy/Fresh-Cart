import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { toast } from "react-toastify";

export default function ProductDetails() {
    //
    const { id } = useParams();
    const [productDetails, setProductDetails] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    async function getProductDetails() {
        setIsLoading(true);
        const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products/" + id);
        setIsLoading(false);
        setProductDetails(data.data);
        console.log(data.data);
    }

    async function addProductToCart(productId) {
        const { data } = await axios.post(
            "https://ecommerce.routemisr.com/api/v1/cart?",
            {
                productId,
            },
            {
                headers: {
                    token: localStorage.getItem("token"),
                },
            }
        );
        toast.success("🛒" + data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "light",
        });
        console.log(data);
    }

    useEffect(() => {
        getProductDetails();
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="d-flex align-items-center justify-content-center my-5 py-5">
                    <div className="fas fa-spin fa-spinner fa-2x"></div>
                </div>
            ) : (
                <div className="row align-items-center py-5">
                    <div className="col-md-3">
                        <Slider {...settings}>
                            {productDetails.images?.map((img, index) => {
                                return <img src={img} key={index} className="w-100" alt="Product" />;
                            })}
                        </Slider>
                    </div>
                    <div className="col-md-9">
                        <h2 className="mt-2">{productDetails.title}</h2>
                        <h5 className="font-sm text-main mt-2">{productDetails?.category?.name}</h5>
                        <p className="mt-2">{productDetails?.description}</p>
                        <p className="d-flex justify-content-between mt-2">
                            <span>{productDetails?.price} EGP</span>
                            <span>
                                <i className="fas fa-star rating-color me-1"></i>
                                {productDetails?.ratingsAverage}
                            </span>
                        </p>
                        <button
                            className="btn bg-main text-white w-100 mt-2"
                            onClick={() => {
                                addProductToCart(id);
                            }}
                        >
                            Add To Cart
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
