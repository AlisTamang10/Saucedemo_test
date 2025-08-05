const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    setupNodeEvents(on, config) {
      // Setup here if needed
    }
  },
  env: {
    environment: 'stg' // default, switch to prod if needed
  },
  defaultCommandTimeout: 8000,
  viewportWidth: process.env.CYPRESS_ENV === 'prod' ? 1440 : 1000,
  viewportHeight: process.env.CYPRESS_ENV === 'prod' ? 900 : 700,
});
