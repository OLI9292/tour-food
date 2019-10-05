import React from "react"

import SEO from "../components/seo"
import HeaderComponent from "../components/header"

import { Box, Header, Text } from "../components/common"

import colors from "../lib/colors"

export default class AboutPage extends React.Component {
  render() {
    return (
      <Box style={{ height: "auto", position: "relative" }}>
        <SEO title="About" />

        <HeaderComponent searchProps={{}} siteTitle="Tour Food" />

        <Header
          style={{
            textAlign: "center",
            marginTop: "40px",
          }}
          color={colors.blue}
        >
          about{" "}
          <span style={{ fontFamily: "BrandonGrotesqueLight" }}>tour food</span>
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
          Tour Food is a work-in-progress searchable database created to answer
          every traveler’s favorite daily question: “Where are we going to eat?”
          <br />
          <br />
          What began in 2012 as a Google Spreadsheet compiled by a few musicians
          passionate about eating well on tour, quickly grew into a privately
          shared resource featuring contributions from dozens of touring
          musicians. After years of expansion, we decided it was time to turn
          “the spreadsheet” into an easily navigable, functional website. We
          painstakingly checked, sorted, and tagged each listing, cursing
          whoever added a Chick-Fil-A in Idaho and praising the genius who found
          the family-owned gas station in Wyoming that serves outstanding Indian
          food.
          <br />
          <br />
          The refreshed and refined spreadsheet is now the heart and soul of
          this website: a public, shared space where all types of traveling
          folks can benefit from the wisdom of musicians whose touring
          highlights sometimes include more delicious meals than well-attended
          performances. We only play for about an hour each night. But during
          the other 23, we’re eating or thinking about eating.
        </Text>

        <Header
          style={{ textAlign: "center", marginTop: "25px", padding: "50px" }}
          color={colors.blue}
        >
          HOW IS THIS DIFFERENT FROM OTHER FOOD WEBSITES?
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
          Our criteria are simple: quality, value (roughly $20 or less for a
          meal), and whenever possible, regionality– something that can be
          elusive on tour. Over years of touring across the country, we have
          been lucky to experience and appreciate America’s diversity through
          its food, and want to share our rolodex with anyone interested. Our
          ever-evolving lists of restaurants, bakeries, and cafes are
          non-hierarchical: there are no listicles, rankings, or any “best of”
          content. The information we give you is lean but meaningful. It’s like
          asking a friend where to eat in {"{"}x{"}"} town and they text back
          “you should go to {"{"}x{"}"}.” But in this scenario, we’re your
          friend. Or rather, the many touring musicians who have contributed to
          this database are your friends. And what makes us different than Joe
          Schmo on Yelp is that we’ve eaten pizza in enough cities to know
          whether the best pizza in Norman, Oklahoma is actually worth your time
          or if there’s something more special worth pursuing. No offense to
          Joe. Or that pizza place in Norman. Our main goal is functionality:
          you’re on tour, you’re in a new or unfamiliar city or town, you don’t
          know anybody there, and you want to know what to eat. You come to this
          website and realize you’re not alone anymore. Other people have been
          here before you, and they have places to recommend. You’re going to
          have a great meal.
        </Text>

        <Header
          style={{ textAlign: "center", marginTop: "25px" }}
          color={colors.blue}
        >
          made by
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
          <span style={{ fontSize: "1.2em", fontFamily: "BrandonGrotesque" }}>
            Luke Pyenson
          </span>
          <br />
          <br />
          Luke plays drums in the indie rock band Frankie Cosmos and contributes
          food and travel articles and recipes to publications including Saveur,
          The Boston Globe, The Washington Post, Edible Boston, and more. He has
          been touring on-and-off since 2010 and full-time since 2016. He has
          been writing about food professionally since 2007, and spent formative
          years working part-time in Boston-area restaurant kitchens. He has an
          MA in the Anthropology of Travel, Tourism, and Pilgrimage, which is a
          subject area that directly relates to this website. His favorite
          listing on Tour Food is Saxapahaw General Store, in Saxapahaw, NC.
          <br />
          <br />
          <br />
          <span style={{ fontSize: "1.2em", fontFamily: "BrandonGrotesque" }}>
            Charlie Ferguson
          </span>
          <br />
          <br />
          Charlie was born and raised in Berkeley, CA, currently lives in
          Brooklyn, NY and plays drums in the band Hurray For The Riff Raff. He
          worked for years as a server in NYC restaurants (Glasserie, Flatbush
          Farm, Martha, The Grocery) until he started touring more full time in
          2015. Charlie met Adam in 2006 and the two have covered thousands of
          miles together, touring and eating all across the U.S. in their
          matching Toyota Sienna minivans. Charlie met Luke in 2019 when Adam
          realized his friends' mutual love for ice cream and cooking, and
          thought they would make a good Tour Food team. Charlie loves cooking
          with immigrant grandmas and his favorite listing on Tour Food is
          Snow's BBQ in Lexington, TX.
          <br />
          <br />
          <br />
          <span style={{ fontSize: "1.2em", fontFamily: "BrandonGrotesque" }}>
            Adam Schatz
          </span>
          <br />
          <br />
          Adam writes and releases songs with his band Landlady and plays
          keyboards and saxophone with lots of other fun folks including This Is
          The Kit and Japanese Breakfast. He produces records for others out of
          his Ditmas Park recording space, The Chamber Of Commerce. In the
          kitchen he has fallen off the deep end with baking sourdough bread and
          a developing signature donut recipe. He has written articles for The
          Talkhouse and has read articles in Bon Appetit. He pays a monthly fee
          for The New York Times Cooking. His favorite listing on Tour Food is
          Perly’s in Richmond, VA.
        </Text>
      </Box>
    )
  }
}
