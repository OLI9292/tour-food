import React from "react"
import styled from "styled-components"

import SEO from "../components/seo"
import HeaderComponent from "../components/header"

import { Box, Header, Submit, Text } from "../components/common"

import colors from "../lib/colors"

export default class ContactPage extends React.Component {
  constructor(props) {
    super(props)
    // this.state = { submitted: false }
    this.state = {}
  }

  render() {
    const { submitted } = this.state

    return (
      <Box>
        <SEO title="Contact" />

        <HeaderComponent siteTitle="Tour Food" />

        <Header
          style={{ textAlign: "center", marginTop: "40px" }}
          color={colors.blue}
        >
          Contact
        </Header>

        <form
          action="https://formspree.io/otplunkett@gmail.com"
          method="POST"
          style={{ width: "90%", maxWidth: "600px", margin: "0 auto" }}
        >
          <Textarea
            autoFocus={true}
            spellCheck={false}
            placeholder="Send us your feedback..."
            name="contact"
            onChange={e => this.setState({ value: e.target.value })}
          />

          <Submit
            onClick={e => {
              // e.preventDefault()
              this.setState({ submitted: true })
            }}
            color={submitted ? colors.gray : colors.blue}
            type="submit"
            value="submit"
          />

          {submitted && (
            <Text
              style={{
                textAlign: "center",
                marginTop: "10px",
                fontFamily: "BrandonGrotesqueLight",
              }}
            >
              Thanks for your message!
            </Text>
          )}
        </form>
      </Box>
    )
  }
}

const Textarea = styled.textarea`
  border: 1px solid ${colors.blue};
  border-radius: 5px;
  padding: 10px;
  font-family: BrandonGrotesqueLight;
  font-size: 1em;
  outline: 0;
  box-sizing: border-box;
  width: 100%;
  height: 200px;
`
