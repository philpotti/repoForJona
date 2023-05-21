/// <reference types = "Cypress"/>
import "cypress-localstorage-commands";

import Connect from "../PageObjects/Connect";
import LicensedUsers from "../PageObjects/LicensedUsers";
import LicensedResources from "../PageObjects/LicensedResources";
import Resources from "../PageObjects/resources";
import Today from "../PageObjects/Today";

describe("Settings Tests - Teacher", () => {
  var itemId: string = "";
  const licensedUsers = new LicensedUsers();
  const resources = new Resources();
  const today = new Today();
  const licensedResources = new LicensedResources();

  before(() => {
    cy.Login("admin");
    cy.saveLocalStorage();

    let resourceName = "95 Phonics Core Program®Grade 2";
    cy.GoToPage("settings");
    cy.SelectSettingsTab("Licenses");

    licensedResources
      .LicensedResourcesGrid()
      .GetItemByResourceName(resourceName)
      .then((item) => {
        itemId = item;
      });

    cy.GetCheckByResource(resourceName).click();

    licensedUsers.LicensedUsersButton().click();
    cy.AssignLicenseToTeacher(
      "William Guillen",
      "95 Phonics Core Program® Grade 2"
    );
    licensedUsers.UpdateButton().click();
    
    let allocationModal = licensedUsers.LicenceAllocationModal();
    allocationModal.Content().should("have.text", "License allocation updated");
    allocationModal.ClickButton("Ok");

    licensedUsers.LicensedResourcesButton().click();
    cy.Logout();
    cy.clearLocalStorage();
  });

  after(() => {
    cy.Logout();
  });

  it("Resources - Mark resource as favorite - Resource is marked as favorite", () => {
    cy.Login("licence");
    cy.GoToPage("resources");
    cy.WaitForResourcesToLoad().then(() => {
      resources.CarouselCard(itemId+".V1").CardFavoriteIconButton().click();
    });

    cy.GoToPage("today");
    cy.WaitForTodayToLoad().then(() => {
      let carouselCard = today.CarouselCard(itemId+".V1");

      carouselCard
        .ResourceCardContent()
        .invoke("attr", "infavorite")
        .then((attribute) => {
          expect(attribute).to.eq("true");
        });

      carouselCard.TeachersGuideButton().click();

      let teachersGuideModal = today.TeachersGuideModal();
      teachersGuideModal
        .ExpandGuideButton("Teacher Information")
        .should("be.visible")
        .click();

        teachersGuideModal
        .PdfsLinksContainer("Teacher Information")
        .should("be.visible")
        .find(".v-list-item")
        .then((linksContainer) => {
          const linksCount = linksContainer.length;
          expect(linksCount).be.greaterThan(0);
        });

      teachersGuideModal.CloseModalButton().click();
      today
        .CarouselCard(itemId+".V1")
        .CardFavoriteIconButton()
        .should("be.visible")
        .click()
        .should("not.exist");
    });
  });
});
export {};
