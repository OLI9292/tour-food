import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

import icon from "../images/icon.png"
import colors from "../lib/colors"

const Header = ({ siteTitle }) => (
  <StyledHeader>
    <Link to="/" style={{ color: `white`, textDecoration: `none` }}>
      <img style={{ width: "50px" }} src={icon} />
    </Link>
  </StyledHeader>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: "",
}

const StyledHeader = styled.header`
  height: 50px;
  width: 100%;
  border-bottom: 3px solid ${colors.blue};
`

export default Header
