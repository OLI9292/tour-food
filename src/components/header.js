import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import "./index.css"
import { sortBy } from "lodash"

import { FlexedDiv, Text } from "./common"
import icon from "../images/icon-non-transparent.jpg"
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
      <Dropdown
      // onMouseLeave={() => this.setState({ displayOptionsFor: undefined })}
      >
        {sortBy(options || filterOptions[attr], str => str.toLowerCase()).map(
          (a, idx) => (
            <Option
              key={idx}
              onClick={e => {
                e.stopPropagation()
                this.setState({ displayOptionsFor: undefined })
                this.props.filter(attr, a)
              }}
            >
              <OptionText color="black" extraSmall>
                {a}
              </OptionText>
            </Option>
          )
        )}
      </Dropdown>
    )

    return (
      <StyledHeader style={{ backgroundColor: "white" }}>
        <Line />

        <Link to="/">
          <Icon
            onClick={() => {
              if (reset) reset()
            }}
            alt="tour food"
            src={icon}
          />
        </Link>

        {showFilters && filterBy && (
          <Filters>
            <FilterBox
              onMouseOver={() => {
                if (!filterBy["state"]) {
                  this.setState({ displayOptionsFor: "state" })
                }
              }}
              onClick={() => {
                this.setState({ displayOptionsFor: undefined })
                if (filterBy["state"]) this.props.filter("state", undefined)
              }}
            >
              <FilterHeader color={color("state")}>
                {filterBy["state"] || "State"}
              </FilterHeader>
              <Triangle color={color("state")} />
              {displayOptionsFor === "state" && dropdown("state")}
            </FilterBox>

            <FilterBox
              onMouseOver={() => {
                if (!filterBy["city"]) {
                  this.setState({ displayOptionsFor: "city" })
                }
              }}
              onClick={() => {
                this.setState({ displayOptionsFor: undefined })
                if (filterBy["city"]) this.props.filter("city", undefined)
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
                dropdown("city", filterOptions.cities)}
            </FilterBox>

            <FilterBox
              onMouseOver={() => {
                if (!filterBy["tag"]) {
                  this.setState({ displayOptionsFor: "tag" })
                }
              }}
              onClick={() => {
                this.setState({ displayOptionsFor: undefined })
                if (filterBy["tag"]) this.props.filter("tag", undefined)
              }}
            >
              <FilterHeader color={color("tag")}>
                {filterBy["tag"] || "Tag"}
              </FilterHeader>
              <Triangle color={color("tag")} />
              {displayOptionsFor === "tag" && dropdown("tag")}
            </FilterBox>
          </Filters>
        )}
      </StyledHeader>
    )
  }
}

const Filters = styled(FlexedDiv)`
  flex-grow: 1;
  justify-content: space-around;
  margin-left: 80px;
  border-left: 3px solid rgb(21, 126, 251);
  position: absolute;
  left: 4px;
  right: 0;
  top: 0;
  height: 63px;
`

const StyledHeader = styled.header`
  height: 65px;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
`

const Line = styled.div`
  position: absolute;
  border-radius: 5px;
  width: 100%;
  left: 0;
  height: 3px;
  z-index: 5000;
  bottom: 0;
  background-color: ${colors.blue};
`

const FilterHeader = styled(Text)`
  text-transform: capitalize;
  margin-right: 5px;
  transition: color 0.15s ease;
  @media (max-width: 600px) {
    margin-right: 3px;
    font-size: 0.95em;
  }
`

const Triangle = styled.div`
  border-color: ${p => p.color} transparent;
  transition: border-color 0.15s ease;
  border-style: solid;
  border-width: 10px 8px 0px 8px;
  height: 0px;
  width: 0px;
  @media (max-width: 600px) {
    border-width: 9px 7px 0px 7px;
  }
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
  padding: 2px;
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
  font-family: BrandonGrotesqueLight;
`

const Dropdown = styled.div`
  background-color: white;
  padding: 10px;
  box-sizing: border-box;
  border: 3px solid ${colors.blue};
  font-weight: 400;
  width: 100%;
  z-index: 100;
  position: absolute;
  top: 60px;
  left: 0;
  max-height: 500px;
  overflow: scroll;
  @media (max-width: 600px) {
    padding: 0px;
    grid-template-columns: 1fr;
    overflow: scroll;
    border-width: 3px 0;
    width: 100vw;
    left: 0;
    max-height: none;
    bottom: 0;
    position: fixed;
  }
`

const Icon = styled.img`
  width: 75px;
  height: auto;
  cursor: pointer;
  position: absolute;
  top: 5px;
  left: 5px;
  z-index: 500;
`
