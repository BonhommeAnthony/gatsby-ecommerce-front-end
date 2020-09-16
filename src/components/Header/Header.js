import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext, useState } from "react"
import "./Header.css"

import { CartContext } from "../../context/cartContext"
import { UserContext } from "../../context/userContext"

const Header = ({ siteTitle }) => {
  const [burger, setBurger] = useState(false)
  const { cart } = useContext(CartContext)
  const { user, logoutUser } = useContext(UserContext)

  const [auth, setAuth] = useState(false)

  console.log("Header.render cart", cart)

  return (
    <header>
      <nav>
        <div className="logo">
          <Link to="/">
            <h1 className="nav-title">{siteTitle}</h1>
          </Link>
        </div>
        <ul className={burger ? "nav-links  backdrop nav-active" : "nav-links"}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Product</Link>
          </li>
          {!user ? (
            <li>
              <Link to="/register">Register</Link>
            </li>
          ) : (
            <li>
              <Link onClick={() => logoutUser()} to="/">
                out
              </Link>
            </li>
          )}
          <li>
            <Link to="/cart">
              Cart (
              {cart.reduce((counter, product) => {
                return counter + product.qty
              }, 0)}
              )
            </Link>
          </li>
        </ul>
        <div
          onClick={() => setBurger(!burger)}
          className={burger ? "burger toggle" : "burger"}
        >
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </nav>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
