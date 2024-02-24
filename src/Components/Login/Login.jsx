import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";

const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Invalid Email"),
    password: Yup.string().required("Password is required"),
});

export default function Login() {
    const [errorMsg, setErrorMsg] = useState("");
    const [visible, setVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const { userIsLoggedIn, setUserIsLoggedIn } = useContext(authContext);

    const userData = {
        // As API
        email: "",
        password: "",
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
            let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values);
            console.log(data);
            if (data.message === "success") {
                setUserIsLoggedIn(true);
                localStorage.setItem("token", data.token);
                console.log(window.location.pathname);

                window.location.pathname === "/login" ? navigate("/home") : navigate(window.location.pathname);
            }
        } catch (error) {
            setErrorMsg(error.response.data.message);
        }
        setIsLoading(false);
        // location.state = "";
    }

    // const { msg, col } = useLocation();
    // console.log(msg, col);

    // const classNamee = `alert alert-${col} alert-dismissible fade show `;
    return (
        <>
            <div className="w-75 mx-auto p-lg-5">
                {/* {location.state && (
                    <div className={classNamee} role="alert">
                        {msg}
                    </div>
                )} */}

                {errorMsg && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        {errorMsg}
                    </div>
                )}

                {/* {loginFirstMsg && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        {loginFirstMsg}
                    </div>
                )} */}

                <h2 className="text-center">Login</h2>
                <form action="" className="form-register p-4 rounded-3" onSubmit={handleSubmit}>
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

                    <div className="d-flex justify-content-end ">
                        {isLoading ? (
                            <button type="button" className="btn bg-main p-2 text-white rounded-3 d-block" disabled>
                                <i className="fas fa-spin fa-spinner px-4"></i>
                            </button>
                        ) : (
                            <button type="submit" className="btn bg-main p-2 text-white rounded-3" disabled={!isValid || isLoading}>
                                Login
                            </button>
                        )}
                    </div>
                </form>
            </div>
            <div className="text-center mb-5">
                <Link className="d-inline-block my-3 text-main fw-semibold" to="/register">
                    Create an Account
                </Link>
                <span className="ms-3 fw-semibold">|</span>
                <Link className="d-inline-block ms-3 text-center fw-semibold" to="/forgetPassword">
                    Forget Password?
                </Link>
            </div>
        </>
    );
}
