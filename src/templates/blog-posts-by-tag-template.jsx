import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Button from "../components/button"
import BlogList from "../components/blog-list"
import PrevNext from "../components/prev-next"

import styles from "./blog-posts-by-tag-template.module.scss"

export const query = graphql`
  query($tag: String!, $skip: Int!, $limit: Int!) {
    tag: contentfulTag(name: {eq: $tag}) {
      name
    }

    posts:  allContentfulPost(
      filter: {tags: {elemMatch: {name: {eq: $tag}}}}
      limit: $limit
      skip: $skip
      sort: { fields: createdAt, order: DESC }
      ) {
      edges {
        node {
          id
          slug
          title
          previewText
          author {
            name
          }
          createdAt(formatString: "MMMM Do, YYYY")
          tags {
            name
          }
          author {
            name
          }
          content {
            json
          }
          image {
            fluid (maxWidth: 500, quality: 50){
              ...GatsbyContentfulFluid_withWebp         
            }
          }
          recipe {
            calories
          }
        }
      }
    }
  }
`

const Tags = ({ data, pageContext }) => {
  const { tag, currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage =
    currentPage - 1 === 1
      ? `/blog/tags/${tag}`
      : `/blog/tags/${tag}/` + (currentPage - 1).toString()
  const nextPage = `/blog/tags/${tag}/` + (currentPage + 1).toString()

  const prevDetails = isFirst
    ? null
    : {
        linkPath: prevPage,
        linkText: "Previous Page",
      }

  const nextDetails = isLast
    ? null
    : {
        linkPath: nextPage,
        linkText: "Next Page",
      }

  return (
    <Layout
      title={`Articles tagged ${tag} - Page ${currentPage}`}
      pathName={`/blog/tags/${tag}`}
    >
      <header>
        <h1 className="page-heading">Articles Tagged "{tag}"</h1>
      </header>

      {data.tag.name && data.tag.description && (
        <div className={styles.descriptionContainer}>
          <p>{data.tag.description}</p>
        </div>
      )}

      <div className={styles.buttonContainer}>
        <Button linkUrl="/blog/tags" linkText="All Tags" />
      </div>

      <BlogList data={data.posts} />
      <PrevNext prevDetails={prevDetails} nextDetails={nextDetails} />
    </Layout>
  )
}

export default Tags
