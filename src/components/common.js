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
  width: 100vw;
  position: fixed;
  display: flex;
  flex-direction: column;
`

export const Header = styled.h2`
  color: ${p => p.color};
  text-transform: uppercase;
  font-family: BrandonGrotesqueBold;
  letter-spacing: 1.5px;
  margin: 10px 5px;
`

export const SearchBoxes = styled.div`
  height: calc(100vh - 200px);
  width: 100vw;
  justify-content: center;
  margin-top: 15px;
  text-align: center;
  flex-direction: row;
  display: flex;
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`

export const SearchBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  cursor: pointer;
  justify-content: center;
  @media (max-width: 900px) {
    height: 50%;
    width: 100%;
  }
`

export const Image = styled.img`
  width: 100%;
  height: auto;
  padding: 0 40px;
  box-sizing: border-box;
  @media (max-width: 900px) {
    padding: 5px 0;
    height: calc(100% - 50px);
    object-fit: contain;
    width: auto;
  }
`

export const Input = styled.input`
  outline: 0;
  text-align: left;
  width: 100%;
  font-family: BrandonGrotesqueLight;
  border: 0;
  ::placeholder {
    color: ${colors.gray};
    text-overflow: ellipsis;
  }
  font-weight: 600;
  font-size: ${p => (p.miniature ? 1 : 1.2)}em;
  display: block;
  @media (max-width: 600px) {
    font-size: ${p => (p.miniature ? 0.8 : 1.2)}em;
  }
`

export const GrayLine = styled.div`
  background-color: ${p => (p.glow ? colors.red : "black")};
  transition: background-color 0.15s ease;
  height: 4px;
  height: ${p => (p.miniature ? 2 : 4)}px;
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
  border-radius: 10px;
  padding: 10px 0;
  font-size: 1.2em;
  letter-spacing: 1px;
  font-weight: 700;
  margin: 0 auto;
  width: 100%;
  display: block;
  margin-top: 25px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.13), 0 3px 3px rgba(0, 0, 0, 0.17);
`

export const SubmitIcon = styled.img`
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.13), 0 3px 3px rgba(0, 0, 0, 0.17);
  margin: 0 5px;
  width: 45px;
  height: 45px;
  background-color: ${p => (p.isNetworking ? colors.orange : colors.blue)};
  border-radius: 5px;
  padding: 5px;
  z-index: 500;
  box-sizing: border-box;
  cursor: pointer;
  @media (max-width: 600px) {
    font-size: 0.95em;
    width: 35px;
    height: 35px;
  }
`

export const InputBox = styled.div`
  margin: ${p => (p.miniature ? 0 : "20px 0")};
  position: relative;
  @media (min-width: 600px) {
    margin-left: ${p => (p.miniature && p.destination ? 10 : 0)}px;
  }
`

export const InputBoxes = styled.div`
  height: ${p => p.miniature && "100%"};
  @media (min-width: 600px) {
    display: ${p => p.miniature && "flex"};
    align-items: ${p => p.miniature && "center"};
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
  width: ${p => (p.highlight ? 50 : 45)}px;
  margin-left: ${p => (p.highlight ? -25 : -22.5)}px;
  margin-top: ${p => (p.highlight ? -50 : -45)}px;
  height: auto;
  opacity: ${p => (p.highlight ? 1 : 0.5)};
  cursor: pointer;
  z-index: ${p => (p.highlight ? 1000 : 50)};
`

export const Autocomplete = styled.div`
  position: absolute;
  width: 100%;
  background-color: white;
  font-family: BrandonGrotesqueLight;
  border: 3px solid ${colors.blue};
  border-radius: 0 0 5px 5px;
  text-align: left;
  padding: 0 10px;
  z-index: 100000;
  box-sizing: border-box;
`
