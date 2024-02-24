import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
    const [cart, setCartContext] = useState({});

    async function getLoggedInCartProducts() {
        try {
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
                headers: {
                    token: localStorage.getItem("token"),
                },
            });
            setCartContext(data);
        } catch (error) {
            console.log(error);
        }
    }

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

    useEffect(() => {
        getLoggedInCartProducts();
    }, []);

    return <cartContext.Provider value={{ cart, setCartContext, addProductToCart }}>{children}</cartContext.Provider>;
}
