import React, { Component } from "react"

export default class Marker extends Component {
  render() {
    const { name } = this.props

    return <div>{name}</div>
  }
}
