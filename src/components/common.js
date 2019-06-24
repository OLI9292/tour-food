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
  font-size: ${p => (p.large ? 1.4 : p.small ? 1 : 1.2)}em;
`

export const Box = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  display: flex;
  flex-direction: column;
`
