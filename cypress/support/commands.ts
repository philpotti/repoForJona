/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

Cypress.Commands.add("SetSmallResolution", () => {
  cy.viewport(Cypress.env("smallResWidth"), Cypress.env("smallResHeight"));
});

Cypress.Commands.add("SetBigResolution", () => {
  cy.viewport(Cypress.env("bigResWidth"), Cypress.env("bigResHeight"));
});

Cypress.Commands.add("GoToPage", (pageName) => {
  cy.get(`a[data-cy='home-drawer-${pageName}_button']`).click({ force: true });
});

Cypress.Commands.add("Logout", () => {
  cy.get(`a[data-cy='home-drawer-signout']`).click({ force: true });
});

Cypress.Commands.add("ClickModalButtonNamed", (Name) => {
  cy.get(".v-overlay__content .v-btn__content").each(($el, index) => {
    if ($el.text() === Name) {
      cy.get(".v-overlay__content .v-btn__content")
        .eq(index)
        .click({ force: true });
    }
  });
});

Cypress.Commands.add("CheckStudentStatus", (Name, Status) => {
  cy.get(".ag-center-cols-container .ag-row").each(($row) => {
    cy.wrap($row)
      .find(".ag-cell-value")
      .eq(0)
      .find("p:nth-child(1)")
      .invoke("text")
      .then((text) => {
        if (text === Name) {
          cy.wrap($row)
            .find(".ag-cell-value")
            .eq(5)
            .find(".px-4")
            .should("have.text", Status);
        }
      });
  });
});

declare global {
  namespace Cypress {
    interface Chainable {
      GoToPage(pageName: string): Chainable;
      SetSmallResolution(): Chainable;
      SetBigResolution(): Chainable;
      Logout(): Chainable;
      ClickModalButtonNamed(tabName: string): Chainable;
      CheckStudentStatus(Name: string, Status: string): Chainable;
    }
  }
}

export {};
