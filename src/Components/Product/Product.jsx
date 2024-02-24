import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { cartContext } from "../../Context/CartContext";
import { useQuery } from "react-query";
import { wishlistContext } from "../../Context/WishlistContext";

export default function Product({ product }) {
    const { setCartContext } = useContext(cartContext);

    async function addProductToCart(productId) {
        const { data } = await axios.post(
            "https://ecommerce.routemisr.com/api/v1/cart?",
            {
                productId,
            },
            {
                headers: {
                    token: localStorage.getItem("token"),
                },
            }
        );
        setCartContext(data);
        toast.success("🛒" + data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "light",
        });
        console.log(data);
    }

    const { addProductToWishlist, wishlistItem, deleteWishlistItem, getLoggedUserWishlist } = useContext(wishlistContext);

    async function addToWishlist(id) {
        let response = await addProductToWishlist(id);
        if (response.data.status === "success") {
            toast.success("❤️ Product added successfully to your wishlist", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            toast.error("❗error in adding the product to your wishlist", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    async function removewishlistItem(id) {
        let response = await deleteWishlistItem(id);
        if (response?.data.status === "success") {
            toast.success("🗑️ Product removed successfully from your wishlist", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            toast.error("❗error in removing the product from your wishlist", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    return (
        <>
            <div className="product overflow-hidden px-2 py-3-cursor-pointer">
                <i
                    className={`fa-${wishlistItem.includes(product.id) ? "solid" : "regular"} text-danger fa-heart opacity-75 cursor-pointer p-3 fs-3 position-absolute heartIcon`}
                    onClick={() => {
                        if (!wishlistItem.includes(product.id)) {
                            addToWishlist(product.id);
                        } else {
                            removewishlistItem(product.id);
                        }
                    }}
                ></i>
                <Link to={"/productDetails/" + product.id} className="a">
                    <img src={product.imageCover} alt="Product" className="w-100" />
                    <h5 className="font-sm text-main">{product.category.name}</h5>
                    <h4>{product.title.split(" ").slice(0, 2).join(" ")}</h4>
                    <p className="d-flex justify-content-between">
                        <span>{product.price} EGP</span>
                        <span>
                            <i className="fas fa-star rating-color me-1"></i>
                            {product.ratingsAverage}
                        </span>
                    </p>
                </Link>
                <button onClick={() => addProductToCart(product.id)} className="btn bg-main text-white w-100 mb-2">
                    + Add To Cart
                </button>
            </div>
        </>
    );
}
