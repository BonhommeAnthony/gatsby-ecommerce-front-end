import React from "react"
import "./CardProduct.css"

import Img from "gatsby-image"
import { Link } from "gatsby"

import { fromProductSlugToUrl } from "../../utils/products"

const CardProduct = ({ name, description, thumbnail, slug }) => {
  return (
    <article className="product  spacing">
      <Img fluid={thumbnail} alt="" className="product__img" />
      <h3 className="product__title">{name}</h3>
      <p className="product__description">{description}</p>
      <Link to={fromProductSlugToUrl(slug)} className="btn">
        BUY NOW !
      </Link>
    </article>
  )
}

export default CardProduct
