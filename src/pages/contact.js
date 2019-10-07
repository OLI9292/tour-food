import React from "react"
import styled from "styled-components"

import SEO from "../components/seo"
import HeaderComponent from "../components/header"

import {
  Box,
  Header,
  Submit,
  Text,
  Input,
  BlueLine,
} from "../components/common"

import colors from "../lib/colors"

export default class ContactPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { submitted, email, name } = this.state

    return (
      <Box
        style={{
          backgroundImage: `url(${require("../images/backgrounds/contact.png")})`,
        }}
      >
        <SEO title="Contact" />

        <HeaderComponent searchProps={{}} siteTitle="Tour Food" />

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
          <Input
            spellCheck={false}
            onChange={e => this.setState({ name: e.target.value })}
            value={name}
            style={{ marginTop: "25px" }}
            type="value"
            placeholder="*Name"
          />

          <BlueLine />

          <Input
            spellCheck={false}
            onChange={e => this.setState({ email: e.target.value })}
            style={{ marginTop: "30px" }}
            value={email}
            type="value"
            placeholder="*Email"
          />

          <BlueLine />

          <Text
            style={{
              fontFamily: "BrandonGrotesqueLight",
              margin: "30px 0 3px 0",
            }}
            color={colors.blue}
          >
            Message
          </Text>

          <Textarea
            autoFocus={true}
            spellCheck={false}
            placeholder="Write to us with new places to include, or any questions / comments you might have.  We will reply within one business year!"
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
  border: 1.5px solid ${colors.blue};
  border-radius: 3px;
  padding: 10px;
  font-family: BrandonGrotesqueLight;
  ::placeholder {
    color: ${colors.blue};
  }
  font-size: 1em;
  outline: 0;
  box-sizing: border-box;
  width: 100%;
  height: 200px;
`
