const { defineConfig } = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalSessionAndOrigin: true,
  },

  chromeWebSecurity: false,

  env: {
    OktaUserName: process.env.OktaUserName,
    OktaUserPassword:  process.env.OktaUserPassword,
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
