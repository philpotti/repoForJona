/// <reference types="cypress" />
import Connect from "../../integration/PageObjects/Connect";

Cypress.Commands.add(
  "UploadCSVFile",
  (collapsibleName: string, filename: string) => {
    const connect = new Connect();
    var collapsible = null;

    switch (collapsibleName) {
      case "Classes": {
        collapsible = connect.ClassesCollapsible();
        break;
      }
      case "Schools": {
        collapsible = connect.SchoolsCollapsible();
        break;
      }
      case "Users": {
        collapsible = connect.UsersCollapsible();
        break;
      }
      case "Enrollments": {
        collapsible = connect.EnrollmentsCollapsible();
        break;
      }
      default: {
        break;
      }
    }
    collapsible?.ExpandButton().click();
    cy.wait(500);
    collapsible
      ?.FileInput()
      .selectFile(`cypress/fixtures/CSVfiles/${filename}`, { force: true });

    collapsible?.UploadFileButton().click();

    let jobProgressModal = connect.JobProgressModal();
    jobProgressModal.Title().should("be.visible");
    jobProgressModal.ProgressRate().should("contain.text", "100");
    jobProgressModal.ClickButton("Ok");
  }
);

declare global {
  namespace Cypress {
    interface Chainable {
      UploadCSVFile(collapsible: string, filename: string): Chainable;
    }
  }
}

export {};
