const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'z95zh1',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
    
  "chromeWebSecurity": false,
    "requestHeaders": {
      "referer": "https://www.saucedemo.com/"
    }
});
