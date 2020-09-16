import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

//components
import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/Hero/Hero"
import Main from "../components/Main/Main"
import Ourproducts from "../components/OurProducts/Ourproducts"

import { formatPrice } from "../utils/format"
import { fromProductSlugToUrl } from "../utils/products"

const IndexPage = ({ data }) => {
  console.log("index.render data", data)
  return (
    <Layout>
      <SEO title="Home" />
      <Hero />
      <Main />
      <Ourproducts data={data} />
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query MyQuery {
    allStrapiProduct {
      nodes {
        id
        description
        created_at
        name
        price_in_cent
        strapiId
        slug
        thumbnail {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
