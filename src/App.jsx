import React from "react";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Products from "./Components/Products/Products";
import NotFound from "./Components/NotFound/NotFound";
import Home from "./Components/Home/Home";
import AuthContextProvider from "./Context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import AuthProtectedRoute from "./Components/ProtectedRoute/AuthProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Cart from "./Components/Cart/Cart";
import { ToastContainer } from "react-toastify";
import Address from "./Components/Address/Address";
import Orders from "./Components/Orders/Orders";
import CartContextProvider from "./Context/CartContext";
import { QueryClient, QueryClientProvider } from "react-query";
import Brands from "./Components/Brands/Brands";
import Categories from "./Components/Categories/Categories";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import ResetCode from "./Components/ResetCode/ResetCode";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import ResetPasswordContextProvider from "./Context/ResetPasswordContext";
import Wishlist from "./Components/Wishlist/Wishlist";
import WishlistContextProvider from "./Context/WishlistContext";

const myRoutes = createBrowserRouter([
    {
        path: "",
        element: <Layout />,
        children: [
            { path: "", element: <Navigate to={"/home"} /> },
            {
                path: "register",
                element: (
                    <AuthProtectedRoute>
                        <Register />
                    </AuthProtectedRoute>
                ),
            },
            {
                path: "login",
                element: (
                    <AuthProtectedRoute>
                        <Login />
                    </AuthProtectedRoute>
                ),
            },
            {
                path: "forgetPassword",
                element: (
                    <AuthProtectedRoute>
                        <ForgetPassword />
                    </AuthProtectedRoute>
                ),
            },
            {
                path: "resetCode",
                element: (
                    <AuthProtectedRoute>
                        <ResetCode />
                    </AuthProtectedRoute>
                ),
            },
            {
                path: "resetPassword",
                element: (
                    <AuthProtectedRoute>
                        <ResetPassword />
                    </AuthProtectedRoute>
                ),
            },

            {
                path: "products",
                element: (
                    <ProtectedRoute>
                        <Products /> <Products />
                    </ProtectedRoute>
                ),
            },
            {
                path: "home",
                element: (
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                ),
            },
            {
                path: "productDetails/:id",
                element: (
                    <ProtectedRoute>
                        <ProductDetails />
                    </ProtectedRoute>
                ),
            },
            {
                path: "cart",
                element: (
                    <ProtectedRoute>
                        <Cart />
                    </ProtectedRoute>
                ),
            },
            {
                path: "address/:cartId",
                element: (
                    <ProtectedRoute>
                        <Address />
                    </ProtectedRoute>
                ),
            },
            {
                path: "allOrders",
                element: (
                    <ProtectedRoute>
                        <Orders />
                    </ProtectedRoute>
                ),
            },
            {
                path: "brands",
                element: (
                    <ProtectedRoute>
                        <Brands />
                    </ProtectedRoute>
                ),
            },
            {
                path: "categories",
                element: (
                    <ProtectedRoute>
                        <Categories />
                    </ProtectedRoute>
                ),
            },
            {
                path: "wishlist",
                element: (
                    <ProtectedRoute>
                        <Wishlist />
                    </ProtectedRoute>
                ),
            },

            { path: "*", element: <NotFound /> },
        ],
    },
]);
export default function App() {
    // Handle Async States
    const client = new QueryClient();
    return (
        <>
            <QueryClientProvider client={client}>
                <ResetPasswordContextProvider>
                    <AuthContextProvider>
                        <CartContextProvider>
                            <WishlistContextProvider>
                                <RouterProvider router={myRoutes} />
                            </WishlistContextProvider>
                        </CartContextProvider>
                    </AuthContextProvider>
                </ResetPasswordContextProvider>
            </QueryClientProvider>

            <ToastContainer />
        </>
    );
}
