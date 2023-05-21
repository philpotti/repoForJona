import LicensedResources from "../../integration/PageObjects/LicensedResources";

/// <reference types="cypress" />

let licensedResources = new LicensedResources();
let licensedUsers = new LicensedUsers();

Cypress.Commands.add("GetCheckByResource", (resourceName) => {
  licensedResources.LicensedResourcesGrid().GetCheckByResource(resourceName);
});

import LicensedUsersAGGrid from "../../integration/Elements/AGGrid/LicensedUsersGrid";
import LicensedUsers from "../../integration/PageObjects/LicensedUsers";

Cypress.Commands.add("AssignLicenseToTeacher", (teacherName, columnName) => {
  let licensedUsers = new LicensedUsersAGGrid(".ag-root");
  licensedUsers
    .GetCellByResourceAndTeacherNames(teacherName, columnName, 2)
    .find(".v-field__input")
    .click({ force: true });
  cy.get("div.v-select__content div.v-list-item-title").each(($el, index) => {
    if ($el.text() === "Licensed Seat") {
      cy.get("div.v-select__content div.v-list-item-title").eq(index).click();
    }
  });
});
Cypress.Commands.add("RemoveLicenseFromTeacher", (teacherName, columnName) => {
  let licensedUsers = new LicensedUsersAGGrid(".ag-root");
  licensedUsers
    .GetCellByResourceAndTeacherNames(teacherName, columnName, 2)
    .find(".v-field__input")
    .click({ force: true });
  cy.get("div.v-select__content div.v-list-item-title").each(($el, index) => {
    if ($el.text() === "Not Assigned") {
      cy.get("div.v-select__content div.v-list-item-title").eq(index).click();
    }
  });
});

Cypress.Commands.add("AssignReviewToTeacher", (teacherName, columnName) => {
  let licensedUsers = new LicensedUsersAGGrid(".ag-root");
  licensedUsers
    .GetCellByResourceAndTeacherNames(teacherName, columnName, 2)
    .find(".v-field__input")
    .click({ force: true });
  cy.get("div.v-select__content div.v-list-item-title").each(($el, index) => {
    if ($el.text() === "Review Seat") {
      cy.get("div.v-select__content div.v-list-item-title").eq(index).click();
    }
  });
});

Cypress.Commands.add("SelectFilterOptionFromDropdown", (dropdownId, option) => {
  if (dropdownId === "Role") {
    licensedUsers.RoleFilter().click();
  } else if (dropdownId === "School") {
    licensedUsers.SchoolFilter().click();
  } else if (dropdownId === "Grade") {
    licensedUsers.GradeFilter().click();
  }
  cy.get("div.v-select__content div.v-list-item-title").each(($el, index) => {
    if ($el.text() === option) {
      cy.get("div.v-select__content div.v-list-item-title").eq(index).click();
      cy.wait(500);
    }
  });
});


declare global {
  namespace Cypress {
    interface Chainable {
      AssignLicenseToTeacher(
        teacherName: string,
        columnName: string
      ): Chainable;
      RemoveLicenseFromTeacher(
        teacherName: string,
        columnName: string
      ): Chainable;
      AssignReviewToTeacher(teacherName: string, columnName: string): Chainable;
      SelectFilterOptionFromDropdown(
        dropdownId: string,
        option: string
      ): Chainable;
      GetCheckByResource(resourceName: string): Chainable;
    }
  }
}

export {};
