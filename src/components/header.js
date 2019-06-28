import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import "./index.css"

import { FlexedDiv, Text } from "./common"
import icon from "../images/icon.png"
import colors from "../lib/colors"

export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { showFilters, filterOptions, filterBy, reset } = this.props
    const { displayOptionsFor } = this.state

    const color = attr =>
      displayOptionsFor === attr || filterBy[attr] ? colors.orange : colors.blue

    const dropdown = (attr, options) => (
      <Dropdown>
        {(options || filterOptions[attr]).map((a, idx) => (
          <Option
            key={idx}
            onClick={() => {
              this.setState({ displayOptionsFor: undefined })
              this.props.filter(attr, a)
            }}
          >
            <OptionText color="black" extraSmall>
              {a}
            </OptionText>
          </Option>
        ))}
      </Dropdown>
    )

    return (
      <StyledHeader>
        <Link to="/">
          <FlexedDiv
            onClick={() => {
              if (reset) reset()
            }}
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
        </Link>

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
              onClick={() => {
                this.setState({ displayOptionsFor: undefined })
              }}
            >
              <FilterHeader color={color("state")}>
                {filterBy["state"] || "State"}
              </FilterHeader>
              <Triangle color={color("state")} />
              {displayOptionsFor === "state" && dropdown("state")}
            </FilterBox>

            <FilterBox
              onMouseOver={() => this.setState({ displayOptionsFor: "city" })}
              onMouseLeave={() =>
                this.setState({ displayOptionsFor: undefined })
              }
              onClick={() => {
                this.setState({ displayOptionsFor: undefined })
              }}
              style={{
                borderRight: `1px solid ${colors.gray}`,
                borderLeft: `1px solid ${colors.gray}`,
              }}
            >
              <FilterHeader color={color("city")}>
                {filterBy["city"] || "City"}
              </FilterHeader>
              <Triangle color={color("city")} />
              {displayOptionsFor === "city" &&
                dropdown("city", filterOptions.topCities)}
            </FilterBox>

            <FilterBox
              onMouseOver={() => this.setState({ displayOptionsFor: "tag" })}
              onMouseLeave={() =>
                this.setState({ displayOptionsFor: undefined })
              }
              onClick={() => {
                this.setState({ displayOptionsFor: undefined })
              }}
            >
              <FilterHeader color={color("tag")}>
                {filterBy["tag"] || "Tag"}
              </FilterHeader>
              <Triangle color={color("tag")} />
              {displayOptionsFor === "tag" && dropdown("tag")}
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

const FilterHeader = styled(Text)`
  text-transform: capitalize;
  margin-right: 5px;
  transition: color 0.15s ease;
`

const Triangle = styled.div`
  border-color: ${p => p.color} transparent;
  transition: border-color 0.15s ease;
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
  @media (max-width: 600px) {
    position: static;
  }
  z-index: 1000;
`

const Option = styled.div`
  @media (max-width: 600px) {
    border-bottom: 0.5px solid ${colors.lightGray};
    padding: 10px;
    cursor: pointer;
  }
`

const OptionText = styled(Text)`
  text-transform: capitalize;
  &:hover {
    color: ${colors.orange};
  }
  transition: color 0.15s ease;
`

const Dropdown = styled.div`
  position: absolute;
  background-color: white;
  padding: 10px;
  box-sizing: border-box;
  border: 3px solid ${colors.blue};
  font-weight: 400;
  top: 50px;
  left: 0;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 90px);
  grid-gap: 4px 15px;
  z-index: 100;
  @media (max-width: 600px) {
    padding: 0px;
    grid-template-columns: 1fr;
    overflow: scroll;
    max-height: calc(100% - 50px);
    border-width: 3px 0;
    width: 100vw;
    left: 0;
  }
`
