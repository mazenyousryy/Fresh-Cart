import axios from "axios";
import React from "react";
import { FidgetSpinner } from "react-loader-spinner";
import { useQuery } from "react-query";

export default function Categories() {
    function getAllCategories() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    }

    const { data, isLoading } = useQuery("getAllCategories", getAllCategories);

    if (isLoading) {
        return (
            <div className="position-fixed start-0 end-0 top-0 bottom-0 d-flex justify-content-center align-items-center overlay">
                <FidgetSpinner visible={true} height="80" width="80" ariaLabel="fidget-spinner-loading" wrapperStyle={{}} wrapperClass="fidget-spinner-wrapper" />
            </div>
        );
    }
    return (
        <>
            <main>
                <h1 className="fw-bolder mt-5 h4 text-center">All Categories</h1>
                <div className="row my-3 g-4">
                    {data?.data.data.map((category) => {
                        return (
                            <div className="col-md-3" key={category._id}>
                                <div className="shadow cursor-pointer catgCard overflow-hidden rounded-2">
                                    <img src={category.image} alt={category.name} className="w-100 mb-2" height={300} />
                                    <h2 className="h5 fw-bold text-center p-3">{category.name}</h2>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </>
    );
}
