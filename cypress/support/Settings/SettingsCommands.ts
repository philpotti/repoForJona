/// <reference types="cypress" />
import Connect from "../../integration/PageObjects/Connect";

Cypress.Commands.add("SelectSettingsTab", (tabName: string) => {
  cy.get("p.view-option__text--active").then((el) => {
    if (el.text() !== tabName) {
      cy.get(".view-option .view-option__text").each(($el, index) => {
        if ($el.text() === tabName) {
          cy.get(".view-option .view-option__text").eq(index).click();
        }
      });
    }
  });
});


declare global {
  namespace Cypress {
    interface Chainable {
      SelectSettingsTab(tabName: string): Chainable;
    }
  }
}

export {};
