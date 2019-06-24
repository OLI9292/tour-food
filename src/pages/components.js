import styled from "styled-components"

import colors from "../lib/colors"

export const Header = styled.h2`
  color: ${p => p.color};
  text-transform: uppercase;
  margin: 10px 5px;
`

export const SearchBoxes = styled.div`
  height: 100%;
  text-align: center;
  padding: 20px 0 0 0;
  display: flex;
  flex-direction: column;
  object-fit: contain;
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
