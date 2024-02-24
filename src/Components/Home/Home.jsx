import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import MainSlider from "../MainSlider/MainSlider";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import { useQuery } from "react-query";
import { FidgetSpinner } from "react-loader-spinner";

export default function Home() {
    // const [products, setProducts] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);

    async function getAllProducts() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/products");
    }

    // useEffect(() => {
    //     getAllProducts();
    // }, []);

    const { data, isLoading } = useQuery("getAllProducts", getAllProducts);
    console.log(data);

    if (isLoading) {
        return (
            <div className="position-fixed start-0 end-0 top-0 bottom-0 d-flex justify-content-center align-items-center overlay">
                <FidgetSpinner visible={true} height="80" width="80" ariaLabel="fidget-spinner-loading" wrapperStyle={{}} wrapperClass="fidget-spinner-wrapper" />
            </div>
        );
    }
    return (
        <>
            <MainSlider />
            <CategoriesSlider />
            <div className="row">
                {data.data.data.map((product) => {
                    return (
                        <div className="col-md-3 mb-3" key={product.id}>
                            <Product product={product} />
                        </div>
                    );
                })}
            </div>
        </>
    );
}
