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

export const Header = styled.h2`
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
  margin: 0 auto;
  border: 0;
  ::placeholder {
    color: ${colors.gray};
  }
  font-size: 1.5em;
  letter-spacing: 1px;
  display: block;
`

export const GrayLine = styled.div`
  background-color: ${colors.gray};
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
  padding: 8px 0;
  font-size: 1.5em;
  letter-spacing: 1px;
  margin: 0 auto;
  width: 100%;
  display: block;
`

export const Form = styled.form`
  text-align: center;
  max-width: 300px;
  margin: 0 auto;
`
