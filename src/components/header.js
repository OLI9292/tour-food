import React from "react"
import styled from "styled-components"

import icon from "../images/icon.png"
import colors from "../lib/colors"

export default class Results extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      displayMap: true,
    }
  }

  render() {
    return (
      <StyledHeader>
        <img
          onClick={this.props.reset.bind(this)}
          alt="tour food"
          style={{ width: "50px", cursor: "pointer" }}
          src={icon}
        />
      </StyledHeader>
    )
  }
}

const StyledHeader = styled.header`
  height: 50px;
  width: 100%;
  border-bottom: 3px solid ${colors.blue};
`
