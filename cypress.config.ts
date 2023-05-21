import { defineConfig } from "cypress";
import { config } from "dotenv";

config();


const baseUrl = process.env.BASE_URL || "localhost:8080";
const loginAuthUrl = process.env.LOGIN_AUTH_URL;
const b2cLogin = process.env.B2C_LOGIN;
const classlinkUrl = process.env.CLASSLINK_URL;

export default defineConfig({
  viewportWidth: 1366,
  viewportHeight: 768,
  defaultCommandTimeout: 60000,
  reporter :"junit",
  reporterOptions : {
    mochaFile :"cypress/reports/junit/test-results.[hash].xml",
    testsuitesTitle: false,
    toConsole: true,
    attachments: true
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/integration/tests/*.ts",
    env: {
      bigResWidth: 1920,
      bigResHeight: 1080,

      baseUrl,
      loginAuthUrl,
      b2cLogin,
      classlinkUrl,
    },
  },
});

