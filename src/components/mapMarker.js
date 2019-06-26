import React, { Component } from "react"

import marker from "../images/marker.png"
import { MarkerImage } from "./common"

export default class Marker extends Component {
  render() {
    const { name, isSelected } = this.props

    return (
      <MarkerImage
        highlight={isSelected}
        onClick={this.props.selected.bind(this)}
        alt="name"
        src={marker}
      />
    )
  }
}
