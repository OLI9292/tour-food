import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import "./index.css"
import { sortBy } from "lodash"

import Search from "./search"
import { FlexedDiv, Text, BlueLine } from "./common"
import Menu, { StyledText } from "./menu"
import icon from "../images/icon.png"
import hamburger from "../images/hamburger.png"
import dropdownArrow from "../images/dropdown-arrow.png"
import colors from "../lib/colors"

export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = { displayMenu: false, isMobile: false }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchType !== this.props.searchType) {
      this.setState({ displayMenu: false })
    }
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

    const displaySearch = searchType !== undefined

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
      <Filters displaySearch={displaySearch}>
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
            // onMouseOver={() => {
            //   if (!filterBy["state"]) {
            //     this.setState({ displayOptionsFor: "state" })
            //   }
            // }}
            onClick={() => {
              if (filterBy["state"]) {
                this.props.filter("state", undefined)
                this.setState({ displayOptionsFor: "state" })
              } else {
                const updated =
                  displayOptionsFor === "state" ? undefined : "state"
                this.setState({ displayOptionsFor: updated })
              }
            }}
          >
            <FilterHeader color={color("state")}>
              {filterBy["state"] || "State"}
              <BlueLine style={{ bottom: "-4px" }} miniature={true} />
            </FilterHeader>

            <DropdownArrow src={dropdownArrow} />

            {displayOptionsFor === "state" && dropdown("state")}
          </FilterBox>
        )}

        {!displaySearch && (
          <FilterBox
            // onMouseOver={() => {
            //   if (!filterBy["city"]) {
            //     this.setState({ displayOptionsFor: "city" })
            //   }
            // }}
            onClick={() => {
              if (filterBy["city"]) {
                this.props.filter("city", undefined)
                this.setState({ displayOptionsFor: "city" })
              } else {
                const updated =
                  displayOptionsFor === "city" ? undefined : "city"
                this.setState({ displayOptionsFor: updated })
              }
            }}
          >
            <FilterHeader color={color("city")}>
              {filterBy["city"] || "City"}
              <BlueLine style={{ bottom: "-4px" }} miniature={true} />
            </FilterHeader>

            <DropdownArrow src={dropdownArrow} />

            {displayOptionsFor === "city" &&
              dropdown("city", filterOptions.cities)}
          </FilterBox>
        )}

        <FilterBox
          // onMouseOver={() => {
          //   if (!filterBy["tag"]) {
          //     this.setState({ displayOptionsFor: "tag" })
          //   }
          // }}
          onClick={() => {
            if (filterBy["tag"]) {
              this.props.filter("tag", undefined)
              this.setState({ displayOptionsFor: "tag" })
            } else {
              const updated = displayOptionsFor === "tag" ? undefined : "tag"
              this.setState({ displayOptionsFor: updated })
            }
          }}
        >
          <FilterHeader color={color("tag")}>
            {filterBy["tag"] || "Filters"}
            {!filterBy["tag"] && (
              <EtcSpan displaySearch={displaySearch}>coffee, etc.</EtcSpan>
            )}
            <BlueLine style={{ bottom: "-4px" }} miniature={true} />
          </FilterHeader>

          <DropdownArrow src={dropdownArrow} />

          {displayOptionsFor === "tag" && dropdown("tag")}
        </FilterBox>
      </Filters>
    )

    return (
      <StyledHeader>
        <Line />

        <Link
          style={{
            height: "70px",
            position: "absolute",
            top: "5px",
            left: "2px",
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
                <StyledText color="white" style={{ marginRight: "20px" }}>
                  About
              </StyledText>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/faq">
                <StyledText color="white" style={{ marginRight: "20px" }}>
                  FAQ
              </StyledText>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/contact">
                <StyledText color="white" style={{ marginRight: "10px" }}>
                  Contact
              </StyledText>
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

const StyledHeader = styled.header`
  min-height: 80px;
  height: 80px !important;
  width: 100%;
  z-index: 999999;
  display: flex;
  background-color: ${colors.blue};
  align-items: center;
  position: relative;
`

const Filters = styled(FlexedDiv)`
  flex-grow: 1;
  justify-content: space-around;
  margin: 0 60px 0 80px;
  border-left: 3px solid rgb(21, 126, 251);
  border-right: 3px solid rgb(21, 126, 251);
  position: absolute;
  left: 4px;
  right: 0;
  top: 0;
  height: 100%;
  box-sizing: border-box;
  @media (min-width: 600px) {
    flex-direction: row;
    margin: ${p => (p.displaySearch ? "0 165px 0 80px" : "0 65px 0 80px")};
  }
  @media (min-width: 900px) {
    margin: ${p => (p.displaySearch ? "0 335px 0 80px" : "0 235px 0 80px")};
  }
  @media (max-width: 600px) {
    flex-direction: ${p => p.displaySearch && "column"};
    padding: ${p => (p.displaySearch ? "8px 0px 13px 0px;" : "0")};
    align-items: flex-start;
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
  margin-right: -18px;
  padding-right: 22px;
  color: white;
  flex: 1;
  min-width: 35px;
  font-family: BrandonGrotesqueLight;
  text-align: left;
  position: relative;
  transition: color 0.15s ease;
  @media (max-width: 600px) {
    margin-right: -13px;
    padding-right: 13px;
    padding-right: 17px;
    font-size: 0.95em;
  }
`

const FilterBox = styled(FlexedDiv)`
  justify-content: center;
  flex-grow: 1;
  flex: 1;
  cursor: pointer;
  position: relative;
  padding: 0 5px;
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
  border: 2px solid ${colors.blue};
  font-weight: 400;
  width: 100%;
  z-index: 100;
  position: absolute;
  top: 80px;
  left: 0;
  max-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  border-top-width: 0px;
  @media (max-width: 600px) {
    padding: 0px;
    top: 80px;
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
  height: 44px;
  top: 18px;
  cursor: pointer;
  position: absolute;
  right: 2px;
  z-index: 500;
`

const EtcSpan = styled.span`
  margin-left: 5px;
  font-size: 0.85em;
  bottom: 0;
  text-transform: lowercase;
  font-family: BrandonGrotesqueItalic;
  @media (max-width: 600px) {
    display: ${p => (p.displaySearch ? "inline-block" : "none")};
  }
`

const DropdownArrow = styled.img`
  width: 18px;
  height: 18px;
  @media (max-width: 600px) {
    width: 15px;
    height: 15px;
  }
`
