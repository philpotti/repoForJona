import { MyGlobalArrayItem } from "../integration/Interfaces/MyGlobalArrayItem"

/// <reference types="cypress" />

let summaryArrayWords: MyGlobalArrayItem[] = [];

Cypress.Commands.add("ClickSummaryAction", (actionName) => {

  cy.get(".v-sheet .v-btn__content").each(($el, index) => {
    if ($el.text() === actionName) {
      cy.get(".v-sheet .v-btn__content").eq(index).click({ force: true });
    }
  });
});


Cypress.Commands.add("CheckSkillsColors", () => {
  cy.get('.rows-container .v-row').each(($row, index) => {
    const even = index % 2 === 0
    const className = even ? 'LIME_COLOR' : 'FIRE_COLOR'

    cy.wrap($row).find('.text-body-1').each(($col) => {
      cy.wrap($col).should('have.class', className)
    })
  })
});


Cypress.Commands.add("CheckSkillsProficient", () => {
  summaryArrayWords = [];
  cy.get('.rows-container .v-row').each(($row, index) => {
    const even = index % 2 === 0

    const AddWordsToArray = () => {
      cy.wrap($row).click();
      cy.get(".v-container .evaluable .item__title").each(($el, index) => {  
        const word = $el.text()
        summaryArrayWords.push({word});      
      });
    }

    cy.wrap($row).find('.text-body-1').each(($col, colIndex) => {
      if (colIndex === 1) {
        if (even) {
          cy.wrap($col).should('not.contain', 'Not')
          AddWordsToArray()
        } else {
          cy.wrap($col).should('contain', 'Not')
          AddWordsToArray()
        }
      }
    })
  })
});


Cypress.Commands.add("CheckSkillsScores", () => {
  cy.get('.rows-container .v-row').each(($row, index) => {
    const even = index % 2 === 0
    let isFirstRowValid = false;
    let isSecondRowValid = false;

    cy.wrap($row).find('.text-body-1').each(($col, colIndex) => {
      if (colIndex === 0 && index === 0) {
        cy.wrap($col).invoke('text').then((text) => {
          if (text.trim().split(' ')[0] === '1a') {
            isFirstRowValid = true;
          }
        })
      } else if (colIndex === 0 && index === 1) {
        cy.wrap($col).invoke('text').then((text) => {
          if (text.trim().split(' ')[0] === '1b') {
            isSecondRowValid = true;
          }
        })
      } else if (colIndex === 1) {
        cy.wrap($col).invoke('text').then((text) => {
          if (isFirstRowValid) {
            expect(text.trim().split(' ')[0]).to.equal('26/26')
          } else if (isSecondRowValid) {
            expect(text.trim().split(' ')[0]).to.equal('0/26')
          } else if (even) {
            expect(text.trim().split(' ')[0]).to.equal('10/10')
          } else {
            expect(text.trim().split(' ')[0]).to.equal('0/10')
          }
        })
      }
    })
  })
});


Cypress.Commands.add("CheckSkillsScoreTotal", () => {
  cy.get('.rows-container .v-row').each(($row, index) => {
    const even = index % 2 === 0;
    if (even) {
      cy.wrap($row).find('.text-body-1').first().invoke('text').then((text) => {
        if (text.trim().split(' ')[0] === '1a') {
          cy.wrap($row).click();
          cy.get("#skillScore").find('.v-sheet .text-h6').invoke('text').then((text) => {
            expect(text.trim().split(' ')[0]).to.eq('26/52');
          });
        } else {
          cy.wrap($row).click();
          cy.get("#skillScore").find('.v-sheet .text-h6').invoke('text').then((text) => {
            expect(text.trim().split(' ')[0]).to.eq('10/20');
          });
        }
      });
    }

  });
});

declare global {
  namespace Cypress {
    interface Chainable {
      ClickSummaryAction(actionName: string): Chainable;
      CheckSkillsColors(): Chainable;
      CheckSkillsProficient(): Chainable;
      CheckSkillsScores(): Chainable;
      CheckSkillsScoreTotal(): Chainable;
    }
  }
}

export { };
export { summaryArrayWords };