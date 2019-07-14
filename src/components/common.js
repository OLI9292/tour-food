import styled from "styled-components"

import colors from "../lib/colors"

export const FlexedDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Text = styled.p`
  margin: 0;
  color: ${p => p.color || colors.gray};
  font-size: ${p => (p.large ? 1.4 : p.small ? 1 : p.extraSmall ? 0.8 : 1.2)}em;
`

export const Box = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  display: flex;
  flex-direction: column;
`

export const Header = styled.h3`
  color: ${p => p.color};
  text-transform: uppercase;
  margin: 10px 5px;
`

export const SearchBoxes = styled.div`
  height: calc(100% - 150px);
  text-align: center;
  padding: 20px 0 0 0;
  display: flex;
  flex-direction: column;
  object-fit: contain;
  box-sizing: border-box;
`

export const SearchBox = styled.div`
  flex: 7;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`

export const Image = styled.div`
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  flex: 1;
`

export const Input = styled.input`
  outline: 0;
  text-align: left;
  width: 100%;
  border: 0;
  ::placeholder {
    color: ${colors.lightGray};
  }
  font-weight: 600;
  font-size: 1.2em;
  letter-spacing: 1px;
  display: block;
`

export const GrayLine = styled.div`
  background-color: ${p => (p.glow ? colors.red : colors.gray)};
  transition: background-color 0.15s ease;
  height: 4px;
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
  font-size: 1.3em;
  letter-spacing: 1px;
  font-weight: 700;
  margin: 0 auto;
  width: 100%;
  display: block;
  margin-top: 25px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.13), 0 3px 3px rgba(0, 0, 0, 0.17);
`

export const Form = styled.form`
  text-align: center;
  width: 280px;
  margin: 0 auto;
`

export const MarkerImage = styled.img`
  width: ${p => (p.highlight ? 50 : 45)}px;
  margin-left: ${p => (p.highlight ? -25 : -22.5)}px;
  margin-top: ${p => (p.highlight ? -50 : -45)}px;
  height: auto;
  opacity: ${p => (p.highlight ? 1 : 0.5)};
  cursor: pointer;
`

export const Autocomplete = styled.div`
  position: absolute;
  width: 100%;
  background-color: white;
  border: 3px solid ${colors.blue};
  border-radius: 0 0 10px 10px;
  text-align: left;
  padding: 0 10px;
  z-index: 500;
  box-sizing: border-box;
`
