import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import CartProduct from "../CartProduct/CartProduct";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import { date } from "yup";
import { FidgetSpinner } from "react-loader-spinner";

export default function Cart() {
    const [cart, setCart] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [timeOutID, setTimeOutId] = useState();
    const [cartId, setCartId] = useState();
    const { setCartContext } = useContext(cartContext);

    async function getLoggedInCartProducts() {
        try {
            setIsLoading(true);
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
                headers: {
                    token: localStorage.getItem("token"),
                },
            });
            console.log(data);
            setCart(data);
            setCartId(data.data._id);
            setCartContext(data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    async function removeProductFromCart(productId) {
        const { data } = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart/" + productId, {
            headers: {
                token: localStorage.getItem("token"),
            },
        });
        console.log(data);
        toast.info("🛒 Product removed successfully", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "light",
        });
        setCart(data);
        setCartContext(data);
    }

    function clearCart() {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { data } = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
                        headers: {
                            token: localStorage.getItem("token"),
                        },
                    });
                    toast.info("🛒 Your cart is empty now", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        progress: undefined,
                        theme: "light",
                    });
                    console.log(data);
                    setCart(data);
                    setCartContext(data);
                } catch (error) {
                    console.log(error);
                }
                Swal.fire({
                    title: "Deleted!",
                    text: "Product has been deleted.",
                    icon: "success",
                });
            }
        });
    }

    function updateCartProductCount(productId, count) {
        clearTimeout(timeOutID);
        setTimeOutId(
            setTimeout(async () => {
                if (count === 0) {
                    removeProductFromCart(productId);
                } else {
                    const { data } = await axios.put(
                        "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
                        {
                            count,
                        },
                        {
                            headers: {
                                token: localStorage.getItem("token"),
                            },
                        }
                    );
                    setCart(data);
                }
            }, 1000)
        );
        setCartContext(date);
    }

    useEffect(() => {
        getLoggedInCartProducts();
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="position-fixed start-0 end-0 top-0 bottom-0 d-flex justify-content-center align-items-center overlay">
                    <FidgetSpinner visible={true} height="80" width="80" ariaLabel="fidget-spinner-loading" wrapperStyle={{}} wrapperClass="fidget-spinner-wrapper" />
                </div>
            ) : cart.data?.products.length > 0 ? (
                <div className="my-5">
                    <button onClick={clearCart} className="btn btn-outline-danger d-block ms-auto">
                        Clear Cart
                    </button>
                    {cart.data?.products.map((cartProduct, index) => {
                        return <CartProduct cartProduct={cartProduct} key={index} removeProductFromCart={removeProductFromCart} updateCartProductCount={updateCartProductCount} />;
                    })}
                    <div className="d-flex justify-content-between">
                        <Link to={"/address/" + cartId} className="btn bg-main text-white">
                            Check Out
                        </Link>
                        <p>
                            Total Cart Price: <span className="bolder">{cart.data?.totalCartPrice} EGP</span>
                        </p>
                    </div>
                </div>
            ) : (
                <h2 className="alert alert-warning text-center my-5">No Products in your Cart</h2>
            )}
        </>
    );
}
