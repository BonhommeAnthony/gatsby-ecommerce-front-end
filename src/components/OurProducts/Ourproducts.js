import React from "react"
import "./OurProducts.css"

import Shoe5 from "../../images/shoe-5.png"
import Shoe6 from "../../images/shoe-6.png"
import CardProduct from "../CardProduct/CardProduct"

const Ourproducts = ({ data }) => {
  return (
    <section className="our-products">
      <div className="container">
        <h2 className="section-title">Our Products</h2>

        {data.allStrapiProduct.nodes.map(product => (
          <CardProduct
            key={product.id}
            name={product.name}
            description={product.description}
            thumbnail={product.thumbnail.childImageSharp.fluid}
            slug={product.slug}
          />
        ))}
      </div>
    </section>
  )
}

export default Ourproducts
