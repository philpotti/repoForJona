/// <reference types = "Cypress"/>
import "cypress-localstorage-commands";

import Today from "../PageObjects/Today";
import StudentDetails from "../PageObjects/StudentDetails";
import PSIInProgress from "../PageObjects/PSIInProgress";
import PSISummary from "../PageObjects/PSISummary";

describe.skip("PSI assessment Tests", () => {
  before(() => {
    cy.Login("licence");
    cy.WaitForTodayToLoad();
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.TodayRedirection();
    cy.WaitForTodayToLoad();
  });

  afterEach(() => {
    cy.saveLocalStorage();
    cy.TodayRedirection();
    cy.WaitForTodayToLoad();
  });

  after(() => {
    cy.Logout();
  });

  const today = new Today();
  const studentDetails = new StudentDetails();
  const psiInProgress = new PSIInProgress();
  const psiSummary = new PSISummary();

  it("PSI assessment - Schedule assessment - Assessment is Scheduled", () => {
    today.GetTab("my_students").click();
    today.StudentCard("Dante", "Valentine").CardContainer().click();

    studentDetails.StudentDetailsTable().GetContainer().should("be.visible");
    studentDetails.ScheduledAssessmentAlert().should("not.exist");

    cy.CompleteActionsForm(
      "PSI-Assessment-Schedule-Assessment-Assessment-is-Scheduled"
    );
    studentDetails
      .ConfirmButton()
      .should("have.text", "Schedule Assessment")
      .click();

    today.GetTab("my_students").should("be.visible").click();
    today.StudentCard("Dante", "Valentine").CardContainer().click();

    studentDetails.StudentDetailsTable().GetContainer().should("be.visible");
    cy.CleanupScheduledAssessment("George Gatsis");
    studentDetails.ScheduledAssessmentAlert().should("not.exist");
  });

  it("PSI assessment - Mark completed assessment as 'Hold' - Assessment is marked", () => {
    let rowsCount: number = 0;

    today.GetTab("my_students").click();
    today.StudentCard("Danny", "Fisher").CardContainer().click();

    studentDetails.StudentDetailsTable().GetContainer().should("be.visible");
    studentDetails
      .StudentDetailsTable()
      .Rows()
      .its("length")
      .then((length) => {
        rowsCount = length;
      });
    cy.CompleteActionsForm(
      "PSI-assessment-Mark-Completed-Assessment-As-Hold-Assessment-Is-Marked"
    );
    studentDetails.ConfirmButton().click();

    psiInProgress
      .DisclaimerModal()
      .ConfirmButton()
      .should("be.visible")
      .click();
    cy.MarkAllSkillAnswersAsCorrect();
    psiInProgress.ContinueModal().StopButton().click();
    psiInProgress.AttentionModal().StopButton().should("be.visible").click();

    psiSummary.PSIResults().should("exist");
    psiSummary.HoldButton().click();

    studentDetails
      .StudentDetailsTable()
      .Rows()
      .its("length")
      .then((newLength) => {
        expect(newLength).be.greaterThan(rowsCount);
      });

    studentDetails
      .StudentDetailsTable()
      .Rows()
      .last()
      .find("td:nth-child(13)")
      .should("be.empty");

    cy.DiscardLastTakenAssessment();

    studentDetails.StudentDetailsTable().GetContainer().should("be.visible");
    studentDetails
      .StudentDetailsTable()
      .Rows()
      .its("length")
      .then((length) => {
        expect(length).be.equal(rowsCount);
      });
  });

  it("PSI assessment - Complete assessment and mark it as 'Done'", () => {
    let rowsCount: number = 0;

    today.GetTab("my_students").click();
    today.StudentCard("Danny", "Fisher").CardContainer().click();

    studentDetails.StudentDetailsTable().GetContainer().should("be.visible");
    studentDetails
      .StudentDetailsTable()
      .Rows()
      .its("length")
      .then((length) => {
        rowsCount = length;
      });

    cy.CompleteActionsForm(
      "PSI-assessment-Mark-Completed-Assessment-As-Hold-Assessment-Is-Marked"
    );
    studentDetails.ConfirmButton().click();

    psiInProgress
      .DisclaimerModal()
      .ConfirmButton()
      .should("be.visible")
      .click();

    cy.MarkAllSkillAnswersAsCorrect();
    psiInProgress.ContinueModal().StopButton().click();
    psiInProgress.AttentionModal().StopButton().should("be.visible").click();

    psiSummary.PSIResults().should("exist");
    psiSummary.DoneButton().click();

    psiSummary
      .CompletedAssesmentModal()
      .OkButton()
      .should("be.visible")
      .click();

    studentDetails
      .StudentDetailsTable()
      .Rows()
      .its("length")
      .then((newLength) => {
        expect(newLength).be.greaterThan(rowsCount);
      });

    studentDetails
      .StudentDetailsTable()
      .Rows()
      .last()
      .find("td i.v-icon")
      .should("exist");
  });
});
export {};
