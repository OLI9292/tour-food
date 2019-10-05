import styled from "styled-components"

import colors from "../lib/colors"

export const FlexedDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Text = styled.p`
  margin: 0;
  color: ${p => p.color || "black"};
  font-size: ${p => (p.large ? 1.4 : p.small ? 1 : p.extraSmall ? 0.8 : 1.2)}em;
`

export const Box = styled.div`
  height: 100vh;
  width: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
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
  flex-direction: row;
  display: flex;
  height: calc(100vh - 120px);
  align-items: center;
  @media (max-width: 900px) {
    flex-direction: column;
  }
  @media (display-mode: browser) and (max-width: 650px) {
    height: calc(100vh - 200px);
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
  font-family: BrandonGrotesqueLight;
  border: 0;
  padding: 2px;
  text-overflow: ellipsis;
  ::placeholder {
    text-overflow: ellipsis;
    color: ${colors.blue};
  }
  font-size: ${p => (p.miniature ? 1 : 1.2)}em;
  display: block;
  @media (max-width: 600px) {
    margin: 0;
    font-size: ${p => (p.miniature ? 0.8 : 1.2)}em;
  }
`

export const BlueLine = styled.div`
  background-color: ${p => (p.glow ? colors.red : colors.blue)};
  transition: background-color 0.15s ease;
  height: 2px;
  border-radius: 5px;
  width: 100%;
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
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.13), 0 3px 3px rgba(0, 0, 0, 0.17);
`

export const SubmitIcon = styled.img`
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.13), 0 3px 3px rgba(0, 0, 0, 0.17);
  margin: 0 10px 0 20px;
  width: 45px;
  height: 45px;
  background-color: ${p => (p.isNetworking ? colors.orange : colors.blue)};
  border-radius: 5px;
  padding: 5px;
  z-index: 500;
  box-sizing: border-box;
  cursor: pointer;
  @media (max-width: 600px) {
    margin: 0 5px 0 10px;
    font-size: 0.95em;
    width: 35px;
    height: 35px;
  }
`

export const InputBox = styled.div`
  margin: ${p => (p.miniature ? 0 : "30px 0")};
  position: relative;
  max-width: 320px;
  flex-grow: 1;
  @media (min-width: 600px) {
    margin-left: ${p => (p.miniature && p.destination ? 10 : 0)}px;
  }
`

export const InputBoxes = styled.div`
  height: ${p => p.miniature && "100%"};
  flex-grow: ${p => p.miniature && 1};
  display: ${p => p.miniature && "flex"};
  @media (min-width: 600px) {
    align-items: ${p => p.miniature && "center"};
  }
  @media (max-width: 600px) {
    justify-content: ${p => p.miniature && "center"};
    flex-direction: ${p => p.miniature && "column"};
  }
`

export const Form = styled.form`
  flex: 2;
  text-align: center;
  width: 320px;
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
  background-color: white;
  font-family: BrandonGrotesqueLight;
  border: 3px solid ${colors.blue};
  border-radius: 0 0 5px 5px;
  text-align: left;
  padding: 0 5px;
  z-index: 100000;
  box-sizing: border-box;
`
