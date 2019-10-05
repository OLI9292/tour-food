import React, { Component } from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import { Text } from "./common"
import colors from "../lib/colors"

export default class Menu extends Component {
  render() {
    return (
      <Box onMouseLeave={this.props.onMouseLeave.bind(this)}>
        <Link style={{ textDecoration: "none" }} to="/about">
          <StyledText>About</StyledText>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/faq">
          <StyledText>FAQ</StyledText>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/contact">
          <StyledText>Contact</StyledText>
        </Link>
      </Box>
    )
  }
}

const Box = styled.div`
  line-height: 45px;
  min-width: 150px;
  background-color: rgba(255, 255, 255, 0.92);
  box-shadow: 0 3px 2px -2px #a9a9a9;
  position: absolute;
  padding: 18px 25px;
  box-sizing: border-box;
  right: 0;
  top: 57px;
  z-index: 600;
`

export const StyledText = styled(Text)`
  font-family: BrandonGrotesqueLight;
  letter-spacing: 1px;
  color: ${colors.blue};
  cursor: pointer;
  &:hover {
    color: ${colors.orange};
    transition: color 0.15s ease;
  }
`
