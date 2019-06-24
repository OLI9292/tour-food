import React from "react"
import styled from "styled-components"

import { FlexedDiv, Text } from "./common"
import icon from "../images/icon.png"
import colors from "../lib/colors"

export default class Results extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { showFilters, filterOptions, filterBy } = this.props
    const { displayOptionsFor } = this.state

    const color = attr =>
      displayOptionsFor === attr || filterBy[attr] ? colors.orange : colors.blue

    const dropdown = attr => (
      <Dropdown>
        {filterOptions[attr].map((a, idx) => (
          <Text onClick={() => this.props.filter(attr, a)} small key={idx}>
            {a}
          </Text>
        ))}
      </Dropdown>
    )

    return (
      <StyledHeader>
        <FlexedDiv
          onClick={this.props.reset.bind(this)}
          style={{
            width: "50px",
            height: "50px",
            borderRight: `3px solid ${colors.blue}`,
          }}
        >
          <img
            alt="tour food"
            style={{ width: "100%", height: "auto", cursor: "pointer" }}
            src={icon}
          />
        </FlexedDiv>

        {showFilters && (
          <FlexedDiv
            style={{
              flexGrow: 1,
              justifyContent: "space-around",
              height: "100%",
            }}
          >
            <FilterBox
              onMouseOver={() => this.setState({ displayOptionsFor: "state" })}
              onMouseLeave={() =>
                this.setState({ displayOptionsFor: undefined })
              }
            >
              <Text style={{ marginRight: "5px" }} color={color("state")}>
                {filterBy["state"] || "State"}
              </Text>
              <Triangle color={color("state")} />
              {displayOptionsFor === "state" && dropdown("state")}
            </FilterBox>

            <FilterBox
              onMouseOver={() => this.setState({ displayOptionsFor: "city" })}
              onMouseLeave={() =>
                this.setState({ displayOptionsFor: undefined })
              }
              style={{
                borderRight: `1px solid ${colors.gray}`,
                borderLeft: `1px solid ${colors.gray}`,
              }}
            >
              <Text style={{ marginRight: "5px" }} color={color("city")}>
                {filterBy["city"] || "City"}
              </Text>
              <Triangle color={color("city")} />
              {displayOptionsFor === "city" && dropdown("city")}
            </FilterBox>

            <FilterBox>
              <Text style={{ marginRight: "5px" }} color={color("tag")}>
                {filterBy["tag"] || "Tag"}
              </Text>
              <Triangle color={color("tag")} />
            </FilterBox>
          </FlexedDiv>
        )}
      </StyledHeader>
    )
  }
}

const StyledHeader = styled.header`
  height: 50px;
  width: 100%;
  border-bottom: 3px solid ${colors.blue};
  display: flex;
  align-items: center;
`

const Triangle = styled.div`
  border-color: ${p => p.color} transparent;
  border-style: solid;
  border-width: 10px 8px 0px 8px;
  height: 0px;
  width: 0px;
`

const FilterBox = styled(FlexedDiv)`
  justify-content: center;
  flex-grow: 1;
  cursor: pointer;
  position: relative;
  height: 100%;
`

const Dropdown = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  grid-gap: 0 5px;
`
