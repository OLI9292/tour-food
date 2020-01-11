import styled from "styled-components"

import colors from "../lib/colors"

export const FlexedDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledText = styled.p`
  margin: 0;
  color: ${p => p.color || "black"};
  font-size: ${p =>
    p.large ? 1.4 : p.small ? 1 : p.extraSmall ? 0.85 : 1.2}em;
`
export const Text = StyledText

export const Box = styled.div`
  height: 100vh;
  width: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position-y: 80px;
`

export const Header = styled.h2`
  color: ${p => p.color};
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin: 10px 5px;
  @media (max-width: 600px) {
    font-size: 1.2em;
  }
`

export const SearchBoxes = styled.div`
  width: 100vw;
  justify-content: center;
  text-align: center;
  height: 100%;
  flex-direction: row;
  display: flex;
  align-items: center;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`

export const SearchBox = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  height: 100%;
  width: 50%;
  justify-content: center;
  @media (max-width: 900px) {
    width: 100%;
    height: 50%;
  }
  @media (min-width: 900px) {
    margin: 0 25px;
  }
`

export const SelectSearchBox = styled.div`
  height: calc(100vh - 160px);
  display: flex;
  flex-direction: column;
  @media (max-width: 900px) {
    height: calc(100vh - 180px);
  }
`

export const Image = styled.img`
  width: 100%;
  height: auto;
  margin-top: 5px;
  object-fit: contain;
  @media (max-width: 900px) {
    width: auto;
    height: calc(100% - 50px);
  }
`

export const Input = styled.input`
  outline: 0;
  text-align: left;
  width: 100%;
  background-color: transparent;
  font-family: BrandonGrotesqueLight;
  border: 0;
  padding: 2px;
  text-overflow: ellipsis;
  ::placeholder {
    text-overflow: ellipsis;
    color: ${p => (p.miniature ? "white" : colors.opaqueBlue)};
  }
  font-size: 1.2em;
  color: ${p => (p.miniature ? "white" : "black")};
  display: block;
  @media (max-width: 600px) {
    margin: 0;
    font-size: ${p => (p.miniature ? 0.95 : 1.2)}em;
  }
`

export const BlueLine = styled.span`
  background-color: ${p =>
    p.glow ? colors.red : p.miniature ? "white" : colors.blue};
  transition: background-color 0.15s ease;
  height: ${p => (p.miniature ? 1 : 2)}px;
  border-radius: 5px;
  width: 100%;
  position: absolute;
  left: 0;
`

export const MiniatureSubmit = styled.input`
  cursor: pointer;
  right: -5px;
  bottom: 13px;
  text-transform: uppercase;
  font-family: BrandonGrotesque;
  border: 1px solid white;
  pointer-events: ${p => (p.isNetworking ? "none" : "auto")};
  outline: 0;
  position: absolute;
  letter-spacing: 1.1px;
  color: white;
  -webkit-appearance: none;
  border-radius: 0;
  background-color: transparent;
  font-size: 0.85em;
  height: 27px;
  @media (min-width: 600px) {
    right: -95px;
    font-size: 1em;
    bottom: 21.6px;
    height: 35px;
  }
`

export const Submit = styled.input`
  -webkit-appearance: none;
  background-color: ${p => p.color};
  color: white;
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
  outline: 0;
  border: 0;
  padding: 8px 0;
  max-width: 300px;
  font-size: 1.3em;
  letter-spacing: 1.5px;
  margin: 0 auto;
  width: 100%;
  display: block;
  margin-top: 25px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1), 0 2px 2px rgba(0, 0, 0, 0.14);
`

export const InputBox = styled.div`
  margin: ${p => (p.miniature ? 0 : "30px 0")};
  position: relative;
  max-width: 320px;
  flex-grow: 1;
`

export const InputBoxes = styled.div`
  height: ${p => p.miniature && "100%"};
  flex-grow: ${p => p.miniature && 1};
  display: ${p => p.miniature && "flex"};
  flex-direction: ${p => (p.miniature ? "row" : "column")};
  @media (min-width: 600px) {
    align-items: ${p => p.miniature && "center"};
  }
  @media (max-width: 600px) {
    justify-content: ${p => p.miniature && "flex-start"};
  }
`

export const Form = styled.form`
  flex: ${p => (p.miniature ? 1 : 2)};
  justify-content: ${p => p.miniature && "flex-start"};
  text-align: center;
  width: ${p => (p.miniature ? "100%" : "320px")};
  margin: ${p => (p.miniature ? "0 5px" : "0 auto")};
  height: ${p => p.miniature && "100%"};
  display: ${p => (p.miniature ? "flex" : "inline-block")};
  align-items: ${p => p.miniature && "center"};
  justify-content: ${p => p.miniature && "space-around"};
`

export const MarkerImage = styled.img`
  width: ${p => (p.highlight ? 45 : 40)}px;
  margin-left: ${p => (p.highlight ? -22.55 : -20)}px;
  margin-top: ${p => (p.highlight ? -45 : -40)}px;
  height: auto;
  opacity: ${p => (p.highlight ? 1 : 0.5)};
  cursor: pointer;
  z-index: ${p => (p.highlight ? 1000 : 50)};
  @media (max-width: 600px) {
    width: ${p => (p.highlight ? 35 : 30)}px;
    margin-left: ${p => (p.highlight ? -17.5 : -15)}px;
    margin-top: ${p => (p.highlight ? -35 : -30)}px;
    height: auto;
  }
`

export const MyLocationMarkerImage = styled.img`
  width: 25px;
  margin-left: -12.5px;
  margin-top: -25px;
  height: auto;
  z-index: 10;
  @media (max-width: 600px) {
    width: 20px;
    margin-left: -10px;
    margin-top: -20px;
    height: auto;
  }
`

export const Autocomplete = styled.div`
  position: absolute;
  width: 100%;
  min-width: 150px;
  background-color: white;
  font-family: BrandonGrotesqueLight;
  border: 2px solid ${colors.blue};
  border-radius: 0 0 3px 3px;
  text-align: left;
  padding: 0 5px;
  z-index: 100000;
  box-sizing: border-box;
`

export const AutocompleteText = styled(StyledText)`
  margin: 8px 0;
  cursor: pointer;
  @media (max-width: 600px) {
    font-size: 0.85em;
  }
`

export const RouteArrow = styled.img`
  width: 15px;
  height: 15px;
  margin: 0 15px;
  @media (max-width: 600px) {
    margin: 7px 7px 0 7px;
    width: 12px;
    height: 12px;
  }
`

export const BottomIconAbsolute = styled.img`
  position: absolute;
  left: 50%;
  bottom: 25px;
  height: 24px;
  width: 24px;
  margin-left: -12px;
  cursor: pointer;
  @media (max-width: 900px) {
    top: calc(100vh - 146px);
  }
`

export const BottomIcon = styled.img`
  margin-left: calc(50% - 12px);
  margin-top: 20px;
  margin-bottom: 30px;
  height: 24px;
  width: 24px;
  cursor: pointer;
`
