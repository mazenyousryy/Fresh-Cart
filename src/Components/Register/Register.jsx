import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import { useNavigate } from "react-router-dom";

const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,26}$/;
const phoneRegex = /^(\+2){0,1}(01)[0125][0-9]{8}$/;

const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").min(3, "Name must have at least 3 characters").max(20, "Name must have at most 20 characters"),
    email: Yup.string().required("Email is required").email("Invalid Email"),
    password: Yup.string().required("Password is required").matches(passRegex, "Password must contains special character(!@#$%^&*), numbers and more than 8 characters"),
    rePassword: Yup.string()
        .required("Password confirmation is required")
        .oneOf([Yup.ref("password")], "Password confirmation must match with password"),
    phone: Yup.string().required("Phone number is required").matches(phoneRegex, "Phone number must be an Egyptian number"),
});

export default function Register() {
    const [errorMsg, setErrorMsg] = useState("");
    const [visible, setVisible] = useState(false);
    const [reVisible, setReVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const userData = {
        // As API
        name: "",
        email: "",
        password: "",
        rePassword: "",
        phone: "",
    };

    const { values, handleSubmit, handleChange, handleBlur, errors, touched, isValid } = useFormik({
        initialValues: userData,
        onSubmit,
        validationSchema,
    });

    async function onSubmit(values) {
        setErrorMsg("");
        try {
            setIsLoading(true);
            let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values);
            console.log(data);
            if (data.message === "success") {
                navigate("/login", { state: { msg: "Account create successfully", col: "success" } });
            }
        } catch (error) {
            setErrorMsg(error.response.data.message);
        }
        setIsLoading(false);
    }

    return (
        <>
            <div className="w-75 mx-auto p-lg-5 mb-5">
                {errorMsg && (
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        {errorMsg}
                    </div>
                )}

                <h2 className="text-center">Create Account</h2>
                <form action="" className="form-register p-4 rounded-3" onSubmit={handleSubmit}>
                    <label htmlFor="name">Name: </label>
                    <input value={values.name} onChange={handleChange} onBlur={handleBlur} type="text" id="name" className="form-control mb-3" placeholder="Enter Your Name" />
                    {errors.name && touched.name && <p className="alert alert-danger fs-6 p-1">{errors.name}</p>}

                    <label htmlFor="email">Email: </label>
                    <input value={values.email} onChange={handleChange} onBlur={handleBlur} type="email" id="email" className="form-control mb-3" placeholder="Enter Your Email" />
                    {errors.email && touched.email && <p className="alert alert-danger fs-6 p-1">{errors.email}</p>}

                    <label htmlFor="password">Password: </label>
                    <div className="input-group">
                        <input
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type={visible ? "text" : "password"}
                            autoComplete="true"
                            id="password"
                            className="form-control mb-3"
                            placeholder="Enter Your Password"
                        />

                        <span
                            className="input-group-text mb-3 cursor-pointer"
                            onClick={() => {
                                setVisible(!visible);
                            }}
                        >
                            {visible ? <i className="fas fa-eye" id="show_eye"></i> : <i className="fas fa-eye-slash" id="hide_eye"></i>}
                        </span>
                    </div>

                    {errors.password && touched.password && <p className="alert alert-danger fs-6 p-1">{errors.password}</p>}

                    <label htmlFor="rePassword">Password Confirmation: </label>
                    <div className="input-group">
                        <input
                            value={values.rePassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type={reVisible ? "text" : "password"}
                            autoComplete="true"
                            id="rePassword"
                            className="form-control mb-3"
                            placeholder="Re-Enter Your Password"
                        />
                        <span
                            className="input-group-text mb-3 cursor-pointer"
                            onClick={() => {
                                setReVisible(!reVisible);
                            }}
                        >
                            {reVisible ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>}
                        </span>
                    </div>

                    {errors.rePassword && touched.rePassword && <p className="alert alert-danger fs-6 p-1">{errors.rePassword}</p>}

                    <label htmlFor="phone">Phone Number: </label>
                    {/* <PhoneInput
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        country={"eg"}
                        inputProps={{
                            id: "phone",
                        }}
                        countryCodeEditable={false}
                        enableSearch={true}
                        className=" mb-3"
                        placeholder="Enter Your Phone Number"
                    /> */}
                    <input
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form-control mb-3"
                        type="tel"
                        id="phone"
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
                                Register
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
}
