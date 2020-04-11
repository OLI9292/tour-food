## Overview

Tour Food is a [Gatsby](https://www.gatsbyjs.org/) application that lets users input locations and routes to discover places nearby, or en route, to eat. The restaurants and grocery stores are stored in a Google Sheet, which acts as a backend for the website. Every time the application is loaded, a request is sent to the Google Sheet to retrieve the most up to date data.

The app interfaces with Google's geocoding and Directions API's, and embeds a Google Map.

## Development

1.  Install Gatbsy CLI.

        % yarn global add gatsby-cli

2.  Install dependencies.

        % yarn

3.  Run locally.

        % gatsby develop

## Deployment

Deployment is made very simple with [Netlify](https://www.netlify.com/) and GitHub. The master GitHub branch is automatically built and deployed with new pushes/merges. The DNS is set up using GoDaddy.

1.  Build the project.

        % gatsby build

2.  Push to master (or make a pull request).

        % git push origin master

## Database

The backend of Tour Food is a Google Sheet (get access from Adam). It's [csv url](https://docs.google.com/spreadsheets/d/e/2PACX-1vSba72Al-RA3rUkBruesaJpLe8A5pIm-EJ8ZvY5SeSIzJWi8sebSnNqBTckypxCCyEhk2UaWvD_6Kfe/pub?output=csv) is queried and parsed every time the app is loaded.
