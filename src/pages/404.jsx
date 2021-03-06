import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"

const NotFound = ({ data }) => {
  return (
    <Layout title="Oops. Page not found.">
      <h1 className="page-heading">Oops. Page not found.</h1>
      <Img
        fluid={data.photo404.fluid}
        alt="Monkey, not found!"
        className="mb5"
      />
    </Layout>
  )
}

export const query = graphql`
  query {
    photo404: contentfulAsset(title: {eq: "404"}) {
      fluid (maxWidth: 800, quality: 50){
        ...GatsbyContentfulFluid_withWebp
      }
    }
  }
`

export default NotFound
