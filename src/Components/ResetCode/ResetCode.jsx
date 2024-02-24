import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function ResetCode() {
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setLoading] = useState(false);
    let navigate = useNavigate();

    let validationSchema = Yup.object({
        resetCode: Yup.string()
            .matches(/^[0-9]{1,}$/, "Reset Code is invalid")
            .required("Reset Code is required"),
    });

    async function resetCodeVerify(values) {
        setLoading(true);
        try {
            let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", values);
            console.log(data);
            if (data.status === "Success") {
                navigate("/resetPassword");
            }
        } catch (error) {
            setErrorMsg(error.response.data.message);
        }
        setLoading(false);
    }

    const { values, errors, handleBlur, handleSubmit, handleChange } = useFormik({
        initialValues: {
            resetCode: "",
        },
        validationSchema,
        onSubmit: resetCodeVerify,
    });

    return (
        <>
            <main className="my-5 mx-auto w-75">
                {errorMsg && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        {errorMsg}
                    </div>
                )}

                <h1 className="h4 text-main text-center fw-bold">Enter Reset Code</h1>
                <p className="text-center fs-5 fw-medium">We've sent the reset code to your E-mail, please check it and enter the code below.</p>
                <form method="post" onSubmit={handleSubmit}>
                    <label htmlFor="resetCode" className="fw-semibold">
                        Reset Code:
                    </label>
                    <input
                        type="text"
                        name="resetCode"
                        value={values.resetCode}
                        id="resetCode"
                        className="form-control my-3"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter The OTP"
                    />
                    {errors.resetCode ? <div className="alert alert-danger px-2 py-1">{errors.resetCode}</div> : ""}
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
