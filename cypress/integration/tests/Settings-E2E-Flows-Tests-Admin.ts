/// <reference types = "Cypress"/>
import "cypress-localstorage-commands";

import Connect from "../PageObjects/Connect";
import LicensedUsers from "../PageObjects/LicensedUsers";
import LicensedResources from "../PageObjects/LicensedResources";

describe("Settings Tests - Admin", () => {

  before(() => {
    cy.Login("admin");
    cy.WaitForResourcesToLoad();
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit("https://app-95fireplaster-stg.azurewebsites.net/resources");
    cy.WaitForResourcesToLoad();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  // after(() => {
  //   cy.Logout();
  // });

  const connect = new Connect();
  const licensedUsers = new LicensedUsers();
  const licensedResources = new LicensedResources();

  it("Connect - Data integration thorugh CSVs files - Data integration process is completed", () => {
    cy.GoToPage("settings");
    cy.SelectSettingsTab("Connect");
    connect.CSVtab().click();

    cy.UploadCSVFile("Classes", "Classes-HappyPath.csv");
    connect.ClassesCollapsible().ExpandButton().click();

    cy.UploadCSVFile("Schools", "Schools-HappyPath.csv");
    connect.SchoolsCollapsible().ExpandButton().click();

    cy.UploadCSVFile("Users", "Users-HappyPath.csv");
    connect.UsersCollapsible().ExpandButton().click();

    let mappedRolesTable = connect.MappedRolesTable();

    mappedRolesTable.AssignRoleByDistrictRoleName(
      "Administrator",
      "administrator"
    );
    mappedRolesTable.AssignRoleByDistrictRoleName("Teacher", "teacher");
    mappedRolesTable.AssignRoleByDistrictRoleName("Student", "student");

    connect.SaveButton().click();

    let jobProgressModal = connect.JobProgressModal();
    jobProgressModal.Title().should("be.visible");
    jobProgressModal.ProgressRate().should("contain.text", "100");
    jobProgressModal.ClickButton("Ok");

    cy.UploadCSVFile("Enrollments", "Enrollments-HappyPath.csv");
  });




  it("Connect - Assign Resource to teacher - Resource is assigned", () => {
    cy.GoToPage("settings");
    cy.SelectSettingsTab("Licenses");
    cy.GetCheckByResource("95 Phonics Core Program®Grade 2").click();

    let resourcesGrid = licensedResources.LicensedResourcesGrid();
    resourcesGrid
      .GetOpenSeatByResourceAndType(
        "95 Phonics Core Program®Grade 2",
        "License"
      )
      .then((initialValue) => {
        let IValue = Number(initialValue);

        licensedUsers.LicensedUsersButton().click();
        licensedUsers
          .LicensedUsersGrid()
          .GetLicenseOpenSeats("95 Phonics Core Program® Grade 2")
          .then((LicenseUserPage) => {
            expect(initialValue).equal(LicenseUserPage);
          });
        cy.AssignLicenseToTeacher(
          "Tori Mata",
          "95 Phonics Core Program® Grade 2"
        );

        licensedUsers.UpdateButton().click();
        licensedUsers.LicenceAllocationModal().ClickButton("Ok");

        cy.wait(2000).then(() => {
          licensedUsers
            .LicensedUsersGrid()
            .GetLicenseOpenSeats("95 Phonics Core Program® Grade 2")
            .then((LicenseUserPage) => {
              expect(IValue - 1).equal(Number(LicenseUserPage));
            });
        });

        licensedUsers.LicensedResourcesButton().click();

        cy.wait(2000).then(() => {
          licensedResources.LicensedResourcesGrid().GetOpenSeatByResourceAndType("95 Phonics Core Program®Grade 2", "License").then((newValue) => {
            expect(IValue - 1).equal(Number(newValue));
          });
        });

        resourcesGrid
          .GetOpenSeatByResourceAndType(
            "95 Phonics Core Program®Grade 2",
            "License"
          )
          .then((initialValue) => {
            let IValue = Number(initialValue);

            licensedUsers.LicensedUsersButton().click();
            licensedUsers
              .LicensedUsersGrid()
              .GetLicenseOpenSeats("95 Phonics Core Program® Grade 2")
              .then((LicenseUserPage) => {
                expect(initialValue).equal(LicenseUserPage);
              });

            cy.RemoveLicenseFromTeacher(
              "Tori Mata",
              "95 Phonics Core Program® Grade 2"
            );

            licensedUsers.UpdateButton().click();
            licensedUsers.LicenceAllocationModal().ClickButton("Ok");

            cy.wait(2000).then(() => {
              licensedUsers
                .LicensedUsersGrid()
                .GetLicenseOpenSeats("95 Phonics Core Program® Grade 2")
                .then((LicenseUserPage) => {
                  expect(IValue + 1).equal(Number(LicenseUserPage));
                });
            });

            licensedUsers.LicensedResourcesButton().click();

            cy.wait(2000).then(() => {
              licensedResources
                .LicensedResourcesGrid()
                .GetOpenSeatByResourceAndType(
                  "95 Phonics Core Program®Grade 2",
                  "License"
                )
                .then((newValue) => {
                  expect(IValue + 1).equal(Number(newValue));
                });
            });
          });
      });
  });
});

export { };