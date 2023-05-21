/// <reference types="cypress" />
import PSIInProgress from "../integration/PageObjects/PSIInProgress";
import StudentDetails from "../integration/PageObjects/StudentDetails";
import PSISummary from "../integration/PageObjects/PSISummary";

const studentDetails = new StudentDetails();
const psiInProgress = new PSIInProgress();
const psiSummary = new PSISummary();

Cypress.Commands.add("CleanupScheduledAssessment", (teacher: string) => {
  cy.SelectOptionFromDropdown("student-details-assess_by", teacher);
  cy.SelectOptionFromDropdown("student-details-display_mode", "Single Select");

  studentDetails.ConfirmButton().click();

  psiInProgress.DisclaimerModal().ConfirmButton().should("be.visible").click();
  psiInProgress.ContinueModal().StopButton().click();
  psiInProgress.AttentionModal().StopButton().should("be.visible").click();
  psiInProgress
    .FinishProcessModal()
    .ConfirmButton()
    .should("be.visible")
    .click();

  psiSummary.DiscardButton().click();
  psiSummary.DiscardModal().ConfirmButton().should("be.visible").click();
  studentDetails.StudentDetailsTable().GetContainer().should("be.visible");
});

Cypress.Commands.add("DiscardLastTakenAssessment", () => {
  studentDetails.StudentDetailsTable().GetContainer().should("be.visible");
  studentDetails.StudentDetailsTable().Rows().last().find("td button").click();

  psiSummary.DiscardButton().should("be.visible").click();
  psiSummary.DiscardModal().ConfirmButton().should("be.visible").click();
});

declare global {
  namespace Cypress {
    interface Chainable {
      CleanupScheduledAssessment(teacher: string): Chainable;
      DiscardLastTakenAssessment(): Chainable;
    }
  }
}

export {};
