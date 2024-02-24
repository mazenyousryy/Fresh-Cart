import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { resetPasswordContext } from "../../Context/ResetPasswordContext";

export default function ForgetPassword() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const { setUserEmail } = useContext(resetPasswordContext);

    async function forgetPassword(values) {
        setLoading(true);
        try {
            let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values);
            if (data.statusMsg === "success") {
                setUserEmail(values.email);
                navigate("/resetCode");
            }
        } catch (error) {
            setErrorMsg(error.response.data.message);
        }
        setLoading(false);
    }

    let validationSchema = Yup.object({
        email: Yup.string().email("email is invalid").required("email is required"),
    });

    let { handleSubmit, handleBlur, handleChange, values, errors } = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema,
        onSubmit: forgetPassword,
    });

    return (
        <>
            <main className="my-5 mx-auto w-75">
                {errorMsg && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        {errorMsg}
                    </div>
                )}

                <h1 className="h4 text-main text-center fw-bold">Password Reset</h1>
                <form method="post" onSubmit={handleSubmit} onBlur={handleBlur}>
                    <label htmlFor="email" className="fw-semibold">
                        Email:
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={values.email}
                        id="email"
                        className="form-control my-3"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter Your Email"
                    />
                    {errors.email ? <div className="alert alert-danger px-2 py-1">{errors.email}</div> : ""}
                    <div className="d-flex justify-content-end">
                        {isLoading ? (
                            <button type="button" className="bg-main text-light btn px-3 rounded-1" disabled>
                                <i className="fa fa-spinner fa-spin"></i>
                            </button>
                        ) : (
                            <button type="submit" className="btn bg-main text-light">
                                Submit
                            </button>
                        )}
                    </div>
                </form>
            </main>
        </>
    );
}
