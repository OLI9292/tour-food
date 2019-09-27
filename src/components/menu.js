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
  line-height: 40px;
  min-width: 150px;
  border: 4px solid #157efb;
  background-color: white;
  position: absolute;
  padding: 10px;
  box-sizing: border-box;
  right: -4px;
  top: 57px;
  z-index: 600;
  border: 2px solid ${colors.blue};
`

export const StyledText = styled(Text)`
  font-family: BrandonGrotesqueLight;
  letter-spacing: 1px;
  cursor: pointer;
  &:hover {
    color: ${colors.orange};
    transition: color 0.15s ease;
  }
`
