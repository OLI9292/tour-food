import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => {
      const { title } = data.site.siteMetadata

      const style =
        window.location.pathname === "/"
          ? {
              height: "100vh",
              width: "100vw",
              position: "fixed",
              display: "flex",
              flexDirection: "column",
            }
          : {}

      return (
        <div style={style}>
          <Header siteTitle={title} />
          {children}
        </div>
      )
    }}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
