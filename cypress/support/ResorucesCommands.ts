/// <reference types="cypress" />

import Resources from "../integration/PageObjects/Resources";

Cypress.Commands.add("MarkGridResourceAsFavorite", (gridPosition) => {
  const resources = new Resources();

  resources.resourceCard(gridPosition).within(() => {
    cy.get("div.resource-card__info svg.favorite-icon")
      .find("path")
      .click({ force: true });
  });
});

Cypress.Commands.add("MarkCarousselResourceAsFavorite", (cardPosition) => {
  cy.get(
    `[data-cy="carousel-resource-card-${cardPosition}"] > .resource-card__info > .v-card-actions > .favorite-icon`
  ).click();
});

declare global {
  namespace Cypress {
    interface Chainable {
      MarkGridResourceAsFavorite(gridPosition: number): Chainable;
      MarkCarousselResourceAsFavorite(cardPosition: number): Chainable;
    }
  }
}

export {};
