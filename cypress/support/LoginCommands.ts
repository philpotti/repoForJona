/// <reference types="cypress" />
import Login from "../integration/PageObjects/Login";
import Today from "../integration/PageObjects/Today";
import { User } from "../integration/Interfaces/UserInterface";
const users: User[] = require("../fixtures/Users.json");

Cypress.Commands.add("Login", (userType) => {
  const login = new Login();
  cy.visit(Cypress.env("baseUrl"));
  cy.wait(500);
  cy.visit(Cypress.env("loginAuthUrl"));

  /*cy.origin(Cypress.env("b2cLogin"), () => {
    cy.get("#Classlink").click();
  });*/

  let user = users.find((user) => user.type === userType);

  cy.origin(Cypress.env("classlinkUrl"), { args: user }, (user) => {
    cy.get(".btn-login").click();
    cy.wait(2000);

    cy.get("#username").type(user!.username);
    cy.get("#password").type(user!.password);
    cy.get("#code").type(user!.code);
    cy.get("#signin").click();
    

    cy.get(".btn-login").click();
    cy.wait(2000);

    cy.get("#username").type(user!.username);
    cy.get("#password").type(user!.password);
    cy.get("#code").type(user!.code);
    cy.get("#signin").click();
  });

  cy.wait(3000);

  cy.visit("https://app-95fireplaster-stg.azurewebsites.net/login");
  //cy.visit(Cypress.env("baseUrl"));
  login.LoginButton().click();
});

Cypress.Commands.add("MainPageRedirection", () => {
  let url;

  cy.url().then((actualUrl) => {
    url = actualUrl;
    if (url !== "https://app-95fireplaster-stg.azurewebsites.net/") {
      cy.visit(Cypress.env("baseUrl"));
    }
  });
});

Cypress.Commands.add("WaitForTodayToLoad", () => {
  const today = new Today();
  today.Carousel().should("be.visible");
  cy.wait(3000);
  today.CarouselCards().should("have.length.greaterThan", 0);
});

declare global {
  namespace Cypress {
    interface Chainable {
      Login(userType: string): Chainable;
      MainPageRedirection(): Chainable;
      WaitForTodayToLoad(): Chainable;
    }
  }
}
