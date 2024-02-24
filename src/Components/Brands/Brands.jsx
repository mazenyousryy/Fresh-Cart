import axios from "axios";
import React from "react";
import { FidgetSpinner } from "react-loader-spinner";
import { useQuery } from "react-query";

export default function Brands() {
    function getAllBrands() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
    }

    const { data, isLoading } = useQuery("getAllBrands", getAllBrands);

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
                <h1 className="fw-bolder mt-5 h4 text-center">All Brands</h1>
                <div className="row my-3 g-4">
                    {data?.data.data.map((brand) => {
                        return (
                            <div className="col-md-4 col-lg-3" key={brand._id}>
                                <div className="shadow cursor-pointer catgCard overflow-hidden rounded-2">
                                    <img src={brand.image} alt={brand.name} className="w-100 mb-2" />
                                    <h2 className="h5 fw-bold text-center p-3">{brand.name}</h2>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </>
    );
}
