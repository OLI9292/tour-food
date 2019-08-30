import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import "./index.css"
import { sortBy } from "lodash"

import Search from "./search"
import { FlexedDiv, Text } from "./common"
import Menu, { StyledText } from "./menu"
import icon from "../images/icon-non-transparent.jpg"
import hamburger from "../images/hamburger.png"
import colors from "../lib/colors"

export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = { displayMenu: false, isMobile: false }
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this))
    this.resize()
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize.bind(this))
  }

  resize() {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 900
    this.setState({ isMobile })
  }

  render() {
    const {
      showFilters,
      filterOptions,
      filterBy,
      reset,
      route,
      searchType,
      locations,
      autocompleteOptions,
      myLocation,
    } = this.props

    const { isMobile, displayMenu, displayOptionsFor } = this.state

    const color = attr =>
      displayOptionsFor === attr || filterBy[attr] ? colors.orange : colors.blue

    const displaySearch = searchType === "route"

    const dropdown = (attr, options) => (
      <Dropdown
        onMouseLeave={() => this.setState({ displayOptionsFor: undefined })}
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

    const filters = () => (
      <Filters>
        {displaySearch && (
          <Search
            reset={this.props.reset.bind(this)}
            autocompleteOptions={autocompleteOptions}
            locations={locations}
            route={route}
            myLocation={myLocation}
            miniature={true}
            searchType={searchType}
          />
        )}

        {!displaySearch && (
          <FilterBox
            onMouseOver={() => {
              if (!filterBy["state"]) {
                this.setState({ displayOptionsFor: "state" })
              }
            }}
            onClick={() => {
              const updated =
                displayOptionsFor === "state" ? undefined : "state"
              this.setState({ displayOptionsFor: updated })
              if (filterBy["state"]) this.props.filter("state", undefined)
            }}
          >
            <FilterHeader color={color("state")}>
              {filterBy["state"] || "State"}
            </FilterHeader>
            <Triangle color={color("state")} />
            {displayOptionsFor === "state" && dropdown("state")}
          </FilterBox>
        )}

        {!displaySearch && (
          <FilterBox
            onMouseOver={() => {
              if (!filterBy["city"]) {
                this.setState({ displayOptionsFor: "city" })
              }
            }}
            onClick={() => {
              const updated = displayOptionsFor === "city" ? undefined : "city"
              this.setState({ displayOptionsFor: updated })
              if (filterBy["city"]) this.props.filter("city", undefined)
            }}
            style={{
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
        )}

        <FilterBox
          onMouseOver={() => {
            if (!filterBy["tag"]) {
              this.setState({ displayOptionsFor: "tag" })
            }
          }}
          style={{ borderLeft: `1px solid ${colors.gray}` }}
          onClick={() => {
            const updated = displayOptionsFor === "tag" ? undefined : "tag"
            this.setState({ displayOptionsFor: updated })
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
    )

    return (
      <StyledHeader style={{ backgroundColor: "white" }}>
        <Line />

        <Link
          style={{
            height: "100%",
            position: "absolute",
            left: 0,
            top: 0,
            display: "flex",
            alignItems: "center",
          }}
          to="/"
        >
          <Icon
            onClick={() => {
              if (reset) reset()
            }}
            alt="tour food"
            src={icon}
          />
        </Link>

        {showFilters && filterBy && filters()}

        {isMobile ? (
          <HamburgerIcon
            onClick={() => this.setState({ displayMenu: !displayMenu })}
            onMouseOver={() => this.setState({ displayMenu: true })}
            alt="menu"
            src={hamburger}
          />
        ) : (
          <div style={{ position: "absolute", right: 0, display: "flex" }}>
            <Link style={{ textDecoration: "none" }} to="/about">
              <StyledText style={{ marginRight: "20px" }}>About</StyledText>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/faq">
              <StyledText style={{ marginRight: "20px" }}>FAQ</StyledText>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/contact">
              <StyledText style={{ marginRight: "10px" }}>Contact</StyledText>
            </Link>
          </div>
        )}

        {displayMenu && isMobile && (
          <Menu onMouseLeave={() => this.setState({ displayMenu: false })} />
        )}
      </StyledHeader>
    )
  }
}

const Filters = styled(FlexedDiv)`
  flex-grow: 1;
  justify-content: space-around;
  margin: 0 80px;
  margin: 0 235px 0 76px;
  border-left: 3px solid rgb(21, 126, 251);
  border-right: 3px solid rgb(21, 126, 251);
  position: absolute;
  left: 4px;
  right: 0;
  top: 0;
  height: 100%;
  @media (max-width: 900px) {
    margin: 0 66px 0 78px;
  }
  @media (max-width: 600px) {
    margin: 0 58px 0 72px;
  }
`

const StyledHeader = styled.header`
  height: 65px;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  @media (max-width: 600px) {
    height: 60px;
  }
`

const Line = styled.div`
  position: absolute;
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
  flex: 1;
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
  top: 62px;
  left: 0;
  max-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  border-top-width: 0px;
  @media (max-width: 600px) {
    padding: 0px;
    top: 59px;
    grid-template-columns: 1fr;
    border-width: 0 0 3px 0;
    width: 100vw;
    left: 0;
    max-height: none;
    bottom: 0;
    position: fixed;
  }
`

const Icon = styled.img`
  width: auto;
  height: 85%;
  cursor: pointer;
  position: absolute;
  left: 3px;
  z-index: 500;
`

const HamburgerIcon = styled.img`
  width: auto;
  height: 80%;
  cursor: pointer;
  position: absolute;
  right: 5px;
  z-index: 500;
`
