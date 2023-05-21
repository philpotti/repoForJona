/// <reference types = "Cypress"/>
import "cypress-localstorage-commands";

import Today from "../PageObjects/Today";
import StudentDetails from "../PageObjects/StudentDetails";
import PSIInProgress from "../PageObjects/PSIInProgress";
import PSISummary from "../PageObjects/PSISummary";
import { inProgressArrayWords } from "../../support/PSIInProgressCommands";
import { summaryArrayWords } from "../../support/PSISummaryCommands";

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

  it("PSI assessment - Mark completed assessment as 'Hold' - Assessment is marked", () => {
    let rowsCount: number;

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

    psiInProgress.MicrophoneButton().click();
    cy.MarkSignalsAndTakeNotes("Test");
    cy.MarkAllSkills();

    psiInProgress
      .CompleteAssessmentModal()
      .OkButton()
      .should("be.visible")
      .click();

    psiSummary.PSIResults().should("exist");
    cy.MarkSignalsAndTakeNotes("Test 2");

    psiSummary.PacingButton().click();
    psiSummary.TrackingSequence().click();
    psiSummary.ConsonantConfusion().click();
    psiSummary.PlayButton().click();
    psiSummary.PauseButton().should("be.visible").click();

    cy.CheckSkillsProficient().then(() => {
      expect(inProgressArrayWords).to.deep.equal(summaryArrayWords);
    });

    cy.CheckSkillsScores();
    cy.CheckSkillsScoreTotal();
    cy.CheckSkillsColors();

    psiSummary.HoldButton().click();

    studentDetails.StudentDetailsTable().GetContainer().should("be.visible");
    studentDetails
      .StudentDetailsTable()
      .Rows()
      .its("length")
      .then((newLen) => {
        expect(newLen).be.greaterThan(rowsCount);
      });

    studentDetails
      .StudentDetailsTable()
      .Rows()
      .last()
      .find("td:nth-child(13)")
      .should("be.empty");

    cy.ValidateLastAssessment(
      "PSI-assessment-Mark-Completed-Assessment-As-Hold-Assessment-Is-Marked"
    );
    studentDetails
      .StudentDetailsTable()
      .Rows()
      .last()
      .find("td:nth-last-child(1)")
      .click();

    psiSummary.PSIResults().should("exist");
    cy.CheckSkillsProficient().then(() => {
      expect(inProgressArrayWords).to.deep.equal(summaryArrayWords);
    });
    cy.CheckSkillsScores();
    cy.CheckSkillsScoreTotal();
    cy.CheckSkillsColors();

    psiSummary.HoldButton().click();
    studentDetails.StudentDetailsTable().GetContainer().should("be.visible");

    cy.GoToPage("today");
    cy.WaitForTodayToLoad();

    cy.CheckStudentStatus("Danny Fisher", "In Progress");

    today.GetTab("my_students").click();
    today.StudentCard("Danny", "Fisher").CardContainer().click();
    cy.DiscardLastTakenAssessment();
  });

  it("PSI assessment - Mark completed assessment as 'Done' - Assessment is marked", () => {
    let lengthOfFirstFixedColumns: number;
    today.GetTab("my_students").click();
    today.StudentCard("Danny", "fisher").CardContainer().click();

    studentDetails.StudentDetailsTable().GetContainer().should("be.visible");
    cy.get(".container-table .first-fixed-column")
      .its("length")
      .then((len) => {
        lengthOfFirstFixedColumns = len;
      });
    cy.CompleteActionsForm("PSI-assessment-Mark-P4");
    studentDetails.ConfirmButton().click();
    cy.ClickModalButtonNamed("Ok");
    cy.ClickResponse(3);
    cy.get(".v-container .evaluable").eq(0).should("have.class", "marked-ok");
    cy.ClickResponse(0);
    cy.get(".v-container .evaluable").eq(1).should("have.class", "marked-ok");
    cy.ClickResponse(2);
    cy.get(".v-container .evaluable")
      .eq(2)
      .should("have.class", "marked-error");
    cy.ClickResponse(2);
    cy.get(".v-container .evaluable").eq(3).should("have.class", "marked-ok");
    cy.ClickResponse(4);
    cy.get(".v-container .evaluable")
      .eq(4)
      .should("have.class", "marked-error");
    cy.ClickResponse(2);
    cy.get(".v-container .evaluable")
      .eq(5)
      .should("have.class", "marked-error");
    cy.get(".v-container .evaluable .item__title").first().click();
    cy.ClickResponse(2);
    cy.get(".v-container .evaluable")
      .eq(0)
      .should("have.class", "marked-error");
    cy.ClickResponse(2);
    cy.get(".v-container .evaluable")
      .eq(1)
      .should("have.class", "marked-error");
    cy.ClickResponse(3);
    cy.get(".v-container .evaluable").eq(2).should("have.class", "marked-ok");
    cy.ClickResponse(4);
    cy.get(".v-container .evaluable")
      .eq(3)
      .should("have.class", "marked-error");
    cy.ClickResponse(1);
    cy.get(".v-container .evaluable").eq(4).should("have.class", "marked-ok");
    cy.ClickResponse(0);
    cy.get(".v-container .evaluable").eq(5).should("have.class", "marked-ok");
    psiInProgress.CorrectAnswerButton().click();
    psiInProgress.CorrectAnswerButton().click();
    psiInProgress.WrongAnswerButton().click();
    psiInProgress.CorrectAnswerButton().click();
    cy.MarkAllSkillAnswersAsCorrect();
    psiInProgress.ContinueModal().StopButton().click();
    psiInProgress.AttentionModal().StopButton().should("be.visible").click();
    cy.ClickModalButtonNamed("Stop");
    cy.wait(2000);
    cy.get("#skillScore table tr td:nth-child(2)")
      .eq(0)
      .should("have.text", "G1-15/G1-13");
    cy.get("#skillScore table tr td:nth-child(2)")
      .eq(1)
      .should("have.text", "G1-15/G1-12");
    cy.get("#skillScore table tr td:nth-child(2)")
      .eq(2)
      .should("have.text", "G2-1");
    cy.get(".v-container .evaluable")
      .eq(0)
      .should("have.class", "marked-error");
    cy.get(".v-container .evaluable .item__error")
      .eq(0)
      .should("have.text", "top");
    cy.get(".v-container .evaluable")
      .eq(1)
      .should("have.class", "marked-error");
    cy.get(".v-container .evaluable .item__error")
      .eq(1)
      .should("have.text", "sem");
    cy.get(".v-container .evaluable").eq(2).should("have.class", "marked-ok");
    cy.get(".v-container .evaluable .item__error")
      .eq(2)
      .should("have.text", "(chūne)");
    cy.get(".v-container .evaluable")
      .eq(3)
      .should("have.class", "marked-error");
    cy.get(".v-container .evaluable .item__error")
      .eq(3)
      .should("have.text", "shig");
    cy.get(".v-container .evaluable").eq(4).should("have.class", "marked-ok");
    cy.get(".v-container .evaluable .item__error")
      .eq(4)
      .should("have.text", "(whōbe)");
    cy.get(".v-container .evaluable").eq(5).should("have.class", "marked-ok");
    cy.get(".v-container .evaluable .item__error")
      .eq(5)
      .should("have.text", "(mick)");
    cy.ClickSummaryAction(" Done ");
    cy.wait(4000);
    cy.ClickModalButtonNamed("Ok");
    cy.wait(2000);
    cy.get(".container-table .first-fixed-column")
      .its("length")
      .then((newLen) => {
        expect(newLen).equal(lengthOfFirstFixedColumns + 1);
      });
    cy.wait(2000);
    cy.get(".container-table .v-icon").last().should("exist");
    cy.GoToPage("today");
    cy.WaitForTodayToLoad();
    cy.CheckStudentStatus("Danny Fisher", "Done");
  });

  it("PSI assessment - Change an answer on summary page and validate scores - Scores are updated", () => {
    let lengthOfFirstFixedColumns: number;
    today.GetTab("my_students").click();
    today.StudentCard("Danny", "fisher").CardContainer().click();
    studentDetails.StudentDetailsTable().GetContainer().should("be.visible");
    cy.get(".container-table .first-fixed-column")
      .its("length")
      .then((len) => {
        lengthOfFirstFixedColumns = len;
      });
    cy.CompleteActionsForm("PSI-assessment-Mark-P4");
    studentDetails.ConfirmButton().click();
    cy.ClickModalButtonNamed("Ok");
    cy.ClickResponse(3);
    cy.get(".v-container .evaluable").eq(0).should("have.class", "marked-ok");
    psiInProgress.CorrectAnswerButton().click();
    psiInProgress.CorrectAnswerButton().click();
    psiInProgress.CorrectAnswerButton().click();
    psiInProgress.CorrectAnswerButton().click();
    psiInProgress.CorrectAnswerButton().click();
    psiInProgress.CorrectAnswerButton().click();
    psiInProgress.CorrectAnswerButton().click();
    psiInProgress.CorrectAnswerButton().click();
    psiInProgress.CorrectAnswerButton().click();
    cy.MarkAllSkills();
    psiInProgress.ContinueModal().StopButton().click();
    psiInProgress.AttentionModal().StopButton().should("be.visible").click();
    cy.wait(2000);
    cy.get(".rows-container .v-row")
      .eq(0)
      .find(".text-body-1")
      .eq(1)
      .should("have.text", "10/10 Proficient");
    cy.get(".v-container .evaluable .item__title").first().click();
    psiSummary.WrongAnswerButton().click();
    cy.get(".rows-container .v-row")
      .eq(0)
      .find(".text-body-1")
      .eq(1)
      .should("have.text", "9/10 Proficient");
    cy.ClickSummaryAction(" Done ");
    cy.wait(4000);
    cy.ClickModalButtonNamed("Ok");
    cy.wait(2000);
    cy.get(".container-table .first-fixed-column")
      .its("length")
      .then((newLen) => {
        expect(newLen).equal(lengthOfFirstFixedColumns + 1);
      });
    cy.wait(2000);
    cy.get(".container-table .v-icon").last().should("exist");
    cy.GoToPage("today");
    cy.WaitForTodayToLoad();
    cy.CheckStudentStatus("Danny Fisher", "Done");
  });
});
export {};
