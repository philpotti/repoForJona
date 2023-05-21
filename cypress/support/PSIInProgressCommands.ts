import { MyGlobalArrayItem } from "../integration/Interfaces/MyGlobalArrayItem";
import PSIInProgress from "../integration/PageObjects/PSIInProgress";

/// <reference types="cypress" />

let inProgressArrayWords: MyGlobalArrayItem[] = [];

Cypress.Commands.add("MarkRoundOfAnswersAsCorrect", () => {
  cy.get(".v-container .evaluable .item__title").each(($el) => {
    cy.get(".mdi-check").click();
    const word = $el.text();
    inProgressArrayWords.push({ word });
  });
});

Cypress.Commands.add("MarkRoundOfAnswersAsWrong", () => {
  cy.get(".v-container .evaluable .item__title").each(($el) => {
    cy.get(".mdi-close").click();
    const word = $el.text();
    inProgressArrayWords.push({ word });
  });
});

Cypress.Commands.add("MarkAllSkillAnswersAsCorrect", () => {
  cy.MarkRoundOfAnswersAsCorrect();
  cy.MarkRoundOfAnswersAsCorrect();
});

Cypress.Commands.add("MarkSignalsAndTakeNotes", (notes: string) => {
  const psiInProgress = new PSIInProgress();

  psiInProgress.PacingButton().click();
  psiInProgress.TrackingSequenceButton().click();
  psiInProgress.ConsonantConfusionButton().click();
  psiInProgress.NotesInput().type(notes);
});

Cypress.Commands.add("MarkAllSkills", () => {
  let skillNumber: string;

  cy.get(".text-h7")
    .find("strong")
    .then(($element) => {
      skillNumber = $element.text().split(" ")[1];

      const markSkills = () => {
        cy.MarkRoundOfAnswersAsCorrect();
        cy.MarkRoundOfAnswersAsWrong();
        cy.ClickModalButtonNamed("Continue");
      };

      const verifySecondWord = () => {
        cy.get(".text-h7")
          .find("strong")
          .then(($element) => {
            skillNumber = $element.text().split(" ")[1];
            if (skillNumber !== "P9") {
              markSkills();
              verifySecondWord();
            }
          });
      };

      if (skillNumber !== "P9") {
        markSkills();
        verifySecondWord();
      }
      markSkills();
    });
});

Cypress.Commands.add("ClickResponse", (number) => {
  cy.get(".actions .v-btn--elevated").eq(number).click({ force: true });
});

declare global {
  namespace Cypress {
    interface Chainable {
      MarkSignalsAndTakeNotes(notes: string): Chainable;
      MarkRoundOfAnswersAsCorrect(): Chainable;
      MarkRoundOfAnswersAsWrong(): Chainable;
      MarkAllSkillAnswersAsCorrect(): Chainable;
      ClickResponse(number: number): Chainable;
      MarkAllSkills(): Chainable;
    }
  }
}

export {};
export { inProgressArrayWords };
