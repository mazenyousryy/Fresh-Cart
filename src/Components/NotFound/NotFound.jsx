import React from "react";
import notFoundImg from "../../images/error.svg";

export default function NotFound() {
    return (
        <>
            <div className="mx-auto w-50 m-5">
                <div className="d-flex justify-content-center align-items-center">
                    <img src={notFoundImg} alt="Not Found" className="w-100" />
                </div>
            </div>
        </>
    );
}
