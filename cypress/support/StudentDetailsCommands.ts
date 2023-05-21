import moment from 'moment';

/// <reference types="cypress" />

Cypress.Commands.add("SelectOptionFromDropdown", (dropdownId, option) => {
  cy.get(`div[data-cy='${dropdownId}']`).click();
  cy.get("div.v-select__content div.v-list-item-title").each(($el, index) => {
    if ($el.text() === option) {
      cy.get("div.v-select__content div.v-list-item-title").eq(index).click();
    }
  });
});

Cypress.Commands.add("CompleteActionsForm", (JsonFile) => {
  cy.wait(2000)
  cy.fixture(JsonFile).then((data) => {
    cy.SelectOptionFromDropdown("student-details-assess_by", data.teacher);
    cy.SelectOptionFromDropdown("student-details-skill", data.skill);
    cy.SelectOptionFromDropdown("student-details-form", data.form);
    cy.SelectOptionFromDropdown(
      "student-details-display_mode",
      data.assessmentDisplay
    );
  });
});



Cypress.Commands.add("ValidateLastAssessment", (JsonFile) => {
  cy.fixture(JsonFile).then((data) => {
    cy.get('.container-table .table').find('tr').last().find('.first-fixed-column').should("have.text", data.form)
    cy.get('.container-table .table').find('tr').last().find('.second-fixed-column').should("have.text", data.teacher)
    cy.get('.container-table .table').find('tr').last().find('.third-fixed-column').should("have.text", moment().format("M/D/YY"))
    cy.get('.container-table .table').find('tr').last().find('.td').each(($td, $index) => {
      if ($td.attr('style')) {
        expect($td.attr('style')).to.contain('rgb(236, 103, 74) 52%')
      expect($td.attr('style')).to.contain('rgb(114, 200, 81) 48%')
      if ($index === 0) {
        cy.wrap($td).find('div.c1').should('have.text', '26')
        cy.wrap($td).find('div.c2').should('have.text', '0')
      }
      else {
        cy.wrap($td).find('div.c1').should('have.text', '10')
        cy.wrap($td).find('div.c2').should('have.text', '0')
      }
      }      
    })
  })
})

declare global {
  namespace Cypress {
    interface Chainable {
      SelectOptionFromDropdown(dropdownId: string, option: string): Chainable;
      CompleteActionsForm(JsonFile: string): Chainable;
      ValidateLastAssessment(JsonFile: string): Chainable;
    }
  }
}

export { };
