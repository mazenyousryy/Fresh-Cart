import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

export default function Address() {
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    let { cartId } = useParams();
    console.log(cartId);

    const phoneRegex = /^(\+2){0,1}(01)[0125][0-9]{8}$/;
    const userData = {
        // As API
        details: "",
        city: "",
        phone: "",
    };

    const validationSchema = Yup.object({
        details: Yup.string().required("Address details is required"),
        city: Yup.string().required("City is required"),
        phone: Yup.string().required("Phone number is required").matches(phoneRegex, "Phone number must be an Egyptian number"),
    });

    async function onSubmit() {
        setIsLoading(true);
        setErrorMsg("");
        try {
            let { data } = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
                {
                    shippingAddress: values,
                },
                {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                    params: {
                        url: "http://localhost:3000",
                    },
                }
            );
            window.open(data.session.url, "_self");
        } catch (error) {
            setErrorMsg(error.response.data.message);
        }
        setIsLoading(false);
    }

    const { values, handleSubmit, handleChange, handleBlur, errors, touched, isValid } = useFormik({
        initialValues: userData,
        onSubmit,
        validationSchema,
    });

    return (
        <>
            <div className="w-75 mx-auto p-lg-5 mb-5">
                {errorMsg && (
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        {errorMsg}
                    </div>
                )}

                <h2 className="text-center">Shipping Details</h2>
                <form action="" className="form-register p-4 rounded-3" onSubmit={handleSubmit}>
                    <label htmlFor="details">Address Details: </label>
                    <input
                        value={values.details}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        id="details"
                        className="form-control mb-3"
                        placeholder="Enter Your Address Details"
                    />
                    {errors.details && touched.details && <p className="alert alert-danger fs-6 p-1">{errors.details}</p>}

                    <label htmlFor="city">City: </label>
                    <input value={values.city} onChange={handleChange} onBlur={handleBlur} type="text" id="city" className="form-control mb-3" placeholder="Enter Your City" />
                    {errors.city && touched.city && <p className="alert alert-danger fs-6 p-1">{errors.city}</p>}

                    <label htmlFor="phone">Address Details: </label>
                    <input
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        id="phone"
                        className="form-control mb-3"
                        placeholder="Enter Your Phone Number"
                    />
                    {errors.phone && touched.phone && <p className="alert alert-danger fs-6 p-1">{errors.phone}</p>}
                    <div className="d-flex justify-content-end ">
                        {isLoading ? (
                            <button type="button" className="btn bg-main p-2 text-white rounded-3 d-block" disabled>
                                <i className="fas fa-spin fa-spinner px-4"></i>
                            </button>
                        ) : (
                            <button type="submit" className="btn bg-main p-2 text-white rounded-3" disabled={!isValid || isLoading}>
                                Submit
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
}
