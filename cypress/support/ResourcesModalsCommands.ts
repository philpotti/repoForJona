/// <reference types="cypress" />

import Resources from "../integration/PageObjects/resources";

Cypress.Commands.add("SelectPresentation", (presentationName) => {
  cy.get("#modals .modal-inner .v-list > .v-list-item .v-list-item-title").each(
    ($el, index) => {
      if ($el.text() === presentationName) {
        cy.get("#modals .modal-inner .v-list > .v-list-item")
          .eq(index)
          .click({ force: true });
      }
    }
  );
});

Cypress.Commands.add("SelectTeachersGuidePDF", (section, pdfName) => {
  cy.get(`div[aria-labelledby="v-list-group--id-${section}"] div a`).each(
    ($el, index) => {
      if ($el.text() === pdfName) {
        cy.get(`div[aria-labelledby="v-list-group--id-${section}"] div a`)
          .eq(index)
          .invoke("removeAttr", "target");
      }
    }
  );
});

Cypress.Commands.add("WaitForResourcesToLoad", () => {
  const resources = new Resources();
  resources.Carousel().should("be.visible");
  cy.wait(3000);
  resources.CarouselCards().should("have.length.greaterThan", 0);
});

declare global {
  namespace Cypress {
    interface Chainable {
      SelectTeachersGuidePDF(section: string, pdfName: string): Chainable;
      SelectPresentation(presentationName: string): Chainable;
      WaitForResourcesToLoad(): Chainable;
    }
  }
}

export {};
