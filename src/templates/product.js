import React, { useState, useContext } from "react"
import Layout from "../components/layout"
import Img from "gatsby-image"
import "./product.css"

import { graphql } from "gatsby"

import { formatPrice } from "../utils/format"

import { CartContext } from "../context/cartContext"

const ProductTemplate = ({ data }) => {
  const [qty, setQty] = useState(1)
  const { addToCart } = useContext(CartContext)
  const { name, description, price_in_cent } = data.strapiProduct
  return (
    <Layout>
      {console.log(
        "productTemplate.render data",
        data.strapiProduct.thumbnail.childImageSharp.fluid
      )}
      <div className="template-main">
        <div className="tone-1">
          <div className="product-info">
            <h1>{name}</h1>
            <p>{description}</p>
            <h2>{formatPrice(price_in_cent)}</h2>
            <div
              onClick={() => addToCart(data.strapiProduct, qty)}
              className="btn"
            >
              Add To Cart
            </div>
          </div>
        </div>
        <div className="tone-2">
          <div className="template-image">
            <Img fluid={data.strapiProduct.thumbnail.childImageSharp.fluid} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProductTemplate

export const query = graphql`
  query ProductTemplateQuery($id: String!) {
    strapiProduct(id: { eq: $id }) {
      strapiId
      name
      price_in_cent
      description
      thumbnail {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`

{
  /* <Img fixed={data.strapiProduct.thumbnail.childImageSharp.fixed} />
<h2>{data.strapiProduct.name}</h2>
<p>{data.strapiProduct.description}</p>
<p>Price: {formatPrice(data.strapiProduct.price_in_cent)} </p>
<input type="number" value={qty} onChange={e => setQty(e.target.value)} />
<button
  onClick={() => addToCart(data.strapiProduct, qty)}
  style={{ fontSize: "20px", borderRadius: "2px", padding: "24px" }}
>
  Add to Cart
</button> */
}
