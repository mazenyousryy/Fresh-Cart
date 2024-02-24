import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";

export default function Orders() {
    async function getAllOrders(id) {
        const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/orders/user/" + id);
        setOrders(data);
    }

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const { id } = jwtDecode(localStorage.getItem("token"));
        console.log(id);
        getAllOrders(id);
    }, []);

    return (
        <>
            <h1 className="text-center mt-5">Your Orders</h1>
            {orders.map((order) => {
                return (
                    <div key={order.id} className="row">
                        <div className="order shadow rounded p-4 my-5">
                            <div className="d-flex align-items-center">
                                <h2 className="fw-bolder h1">#{order.id}</h2>
                                <h4 className="text-warning mx-4 fw-bold">Processing ..</h4>
                            </div>
                            <p>You have ordered {order.cartItems.length} items.</p>
                            <div className="d-flex">
                                {order.cartItems.map((item) => {
                                    return <img src={item.product.imageCover} alt="Product" key={item._id} width={150} className="image-thumbnail rounded" />;
                                })}
                            </div>
                            <hr />
                            <p>
                                <strong>Total Amount: </strong>
                                {order.totalOrderPrice} EGP
                            </p>
                        </div>
                    </div>
                );
            })}
        </>
    );
}
