import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { resetPasswordContext } from "../../Context/ResetPasswordContext";

export default function ResetPassword() {
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [reVisible, setReVisible] = useState(false);

    let navigate = useNavigate();

    const { userEmail } = useContext(resetPasswordContext);

    const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,26}$/;

    async function resetPassword(values) {
        setLoading(true);
        try {
            let { data } = await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values);
            console.log(data);
            if (data.statusMsg !== "fail" && data.token !== "") {
                navigate("/login");
            }
        } catch (error) {
            setErrorMsg(error.response.data.message);
        }
    }

    let validationSchema = Yup.object({
        email: Yup.string().email("email is invalid").required("email is required"),
        newPassword: Yup.string()
            .matches(passRegex, "New password must contains special character(!@#$%^&*), numbers and more than 8 characters")
            .required("New password is required"),
    });

    const { values, handleSubmit, handleChange, handleBlur, errors, touched, isValid } = useFormik({
        initialValues: {
            email: userEmail,
            newPassword: "",
        },
        onSubmit: resetPassword,
        validationSchema,
    });

    return (
        <main className="my-5 mx-auto w-75">
            {errorMsg && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {errorMsg}
                </div>
            )}

            <h1 className="h4 text-main text-center fw-bold">Password Reset</h1>
            <p className="text-center fs-5 fw-medium">Enter Your Email with Your New Password</p>
            <form method="post" onSubmit={handleSubmit}>
                <label htmlFor="newPassword" className="fw-semibold">
                    New Password:
                </label>
                <div className="input-group">
                    <input
                        value={values.newPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type={visible ? "text" : "password"}
                        autoComplete="true"
                        id="newPassword"
                        className="form-control mb-3"
                        placeholder="Enter Your New Password"
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
                {errors.newPassword ? <div className="alert alert-danger px-2 py-1">{errors.newPassword}</div> : ""}

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
    );
}
