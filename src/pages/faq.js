import React from "react"
import { Link } from "gatsby"

import SEO from "../components/seo"
import HeaderComponent from "../components/header"

import { Box, Header, Text } from "../components/common"

import colors from "../lib/colors"

export default class FAQPage extends React.Component {
  render() {
    return (
      <Box
        style={{
          height: "auto",
          position: "relative",
          backgroundImage: `url(${require("../images/backgrounds/faq.png")})`,
          backgroundRepeat: "repeat",
        }}
      >
        <SEO title="FAQ" />

        <HeaderComponent searchProps={{}} siteTitle="Tour Food" />

        <Header
          style={{ textAlign: "center", marginTop: "40px" }}
          color={colors.blue}
        >
          FAQ
        </Header>

        <Text
          small
          color={colors.blue}
          style={{
            padding: "25px 50px",
            fontFamily: "BrandonGrotesqueLight",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <span style={{ fontFamily: "BrandonGrotesque" }}>
            Does the internet really need another food website?
          </span>
          <br />
          No. Wait...Yes.
          <br />
          <br />
          <span style={{ fontFamily: "BrandonGrotesque" }}>
            Why is this a minimalist website and not an app?
          </span>
          <br />
          We couldn’t afford to pay for app development.
          <br />
          <br />
          <span style={{ fontFamily: "BrandonGrotesque" }}>
            Is this a complete list of places to eat around the US and Canada?
          </span>
          <br />
          Nope! This is just the beginning, based on everywhere we and our
          trusted touring musician associates have been to so far.
          <br />
          <br />
          <span style={{ fontFamily: "BrandonGrotesque" }}>
            I’m not a touring musician, is this site for me?
          </span>
          <br />
          Of course! Our hope is that many different types of travelers will
          benefit from our database. Some things about this site make it
          particularly well-suited to musicians, but it is in no way meant to be
          insular.
          <br />
          <br />
          <span style={{ fontFamily: "BrandonGrotesque" }}>
            Why isn’t my favorite spot on here?
          </span>
          <br />
          We didn’t know about it! If you believe there is an important place we
          are missing, please send us a message in the ​
          <Link style={{ color: colors.orange }} to="/contact">
            Contact Form
          </Link>{" "}
          ​and we will happily consider adding it.
          <br />
          <br />
          <span style={{ fontFamily: "BrandonGrotesque" }}>
            Does Tour Food have listings that cater to my dietary restriction?
          </span>
          <br />
          There are tons of vegetarian and vegan listings on this site, as well
          as omnivore restaurants that cater to people with a range of dietary
          restrictions. Vegan and vegetarian-specific restaurants are tagged as
          such. Other classifications such as “gluten free” aren’t specifically
          designated, but rest assured that you’ll find somewhere good to eat,
          no matter what your diet is.
          <br />
          <br />
          <span style={{ fontFamily: "BrandonGrotesque" }}>
            How much work are you doing for me?
          </span>
          <br />
          We’ve culled, sorted, and organized our favorite places around the US
          and Canada for your scrolling pleasure. If a listing piques your
          interest, follow your heart into the wilds of the Greater Internet in
          search of more specifics: business hours, menus, and, most
          importantly, blurry photos of tofu curry. Those are things we can’t
          and could never provide.
          <br />
          <br />
          <span style={{ fontFamily: "BrandonGrotesque" }}>
            What determines an 'open late' tag?
          </span>
          <br />
          Open until 11:00pm or later.
          <br />
          <br />
          <span style={{ fontFamily: "BrandonGrotesque" }}>
            Is everything on tour food within a certain price range?
          </span>
          <br />
          For the most part, we stuck to places where you can eat well for $20
          or less. There are some places where you may spend more that we’ve
          included because we think the experience is too special to ignore
          (e.g. a seafood shack in Maine). In general we have tried to stay
          budget-conscious, while appreciating that everybody has their own tour
          budget that works for them.
          <br />
          <br />
          <span style={{ fontFamily: "BrandonGrotesque" }}>
            Why do some listings have notes?
          </span>
          <br />
          Many places have suggested dishes or other relevant notes, and our
          hope is to provide those insightful details as much as possible. If a
          listing doesn’t have any extra commentary, that doesn’t mean it’s
          bad...we just don’t have as much to say about it. If you eat somewhere
          and think we should add a note, ​get in touch.
          <br />
          <br />
          <span style={{ fontFamily: "BrandonGrotesque" }}>
            Will you add more international listings in the future?
          </span>
          <br />
          We’re planning to!
          <br />
          <br />
          <span style={{ fontFamily: "BrandonGrotesque" }}>
            I ate at a place you suggested and it stunk!
          </span>
          <br />
          Whoops! These things happen. Feel free to write in the{" "}
          <Link style={{ color: colors.orange }} to="/contact">
            Contact Form
          </Link>{" "}
          and let us know that one of our recommendations isn’t up to snuff.
          Don’t hold back.
        </Text>
      </Box>
    )
  }
}
