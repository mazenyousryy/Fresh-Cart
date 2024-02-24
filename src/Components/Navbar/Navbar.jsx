import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../../images/freshcart-logo.svg";
import { authContext } from "../../Context/AuthContext";
import { cartContext } from "../../Context/CartContext";
import { wishlistContext } from "../../Context/WishlistContext";

export default function Navbar() {
    const { userIsLoggedIn, setUserIsLoggedIn } = useContext(authContext);
    const navigate = useNavigate();
    const { cart } = useContext(cartContext);
    const { wishlistCount } = useContext(wishlistContext);

    function logout() {
        setUserIsLoggedIn(false);
        localStorage.clear("token");
        navigate("/login");
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary position-fixed top-0 end-0 start-0 z-3">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="Fresh Cart Logo" />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {userIsLoggedIn && (
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/home">
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/categories">
                                        Categories
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/brands">
                                        Brands
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/allOrders">
                                        Orders
                                    </Link>
                                </li>
                            </ul>
                        )}

                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
                            {userIsLoggedIn && (
                                <>
                                    <li className="nav-item me-4">
                                        <Link to={"/wishlist"}>
                                            <i className="fa-regular fa-heart text-danger fs-5 position-relative">
                                                {wishlistCount > 0 && (
                                                    <span className="position-absolute badge bg-danger">
                                                        {wishlistCount}
                                                        {console.log(cart?.numOfCartItems)}
                                                    </span>
                                                )}
                                            </i>
                                        </Link>
                                    </li>
                                    <li className="nav-item me-3">
                                        <Link to={"/cart"}>
                                            <i className="fa-solid fa-cart-shopping fs-5 text-main position-relative">
                                                {cart?.numOfCartItems > 0 && (
                                                    <span className="position-absolute badge bg-danger">
                                                        {cart?.numOfCartItems}
                                                        {console.log(cart?.numOfCartItems)}
                                                    </span>
                                                )}
                                            </i>
                                        </Link>
                                    </li>
                                </>
                            )}
                            {userIsLoggedIn ? (
                                <li className="nav-item">
                                    <span onClick={logout} className="nav-link cursor-pointer">
                                        Logout
                                    </span>
                                </li>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/login">
                                            Login
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">
                                            Register
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
