/// <reference types = "Cypress"/>
import "cypress-localstorage-commands";
import "cypress-wait-until";
import Today from "../PageObjects/Today";
import Resources from "../PageObjects/resources";

describe.skip("Resources Tests", () => {
  before(() => {
    cy.Login("license");
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
  const resources = new Resources();

  it("Resources - Add resource to wishlist by clicking the teacher's tip - resource is added", () => {
  cy.GoToPage("resources");
  cy.MarkGridResourceAsFavorite(0);

    resources
      .WishlistModal()
      .Title()
      .should("be.visible").and("have.text", "95 Phonics Core Program, Grade 4");

    resources.WishlistModal().TextArea().type("Please gift it to me");
    resources.WishlistModal().ConfirmButton().click();
    resources
      .CarouselCard(0)
      .ResourceCardContent()
      .should("have.attr", "wishlistitem");

    resources.WishlistModal().GetContainer().should("not.exist");

    cy.MarkGridResourceAsFavorite(0);

    resources.WishlistModal().GetContainer().should("be.visible");
    resources
      .WishlistModal()
      .Title()
      .should("have.text", "95 Phonics Core Program, Grade 4");

    resources
      .WishlistModal()
      .TextArea()
      .find("p")
      .should("have.text", "Please gift it to me");

    resources
      .WishlistModal()
      .ConfirmButton()
      .should("have.text", "Remove from District Wishlist")
      .click();

    resources
      .CarouselCard(0)
      .ResourceCardContent()
      .should("not.have.attr", "wishlistitem");
  });

  it("Resources - Add resource to carousel - Resource is added", () => {
    let resourceSrc: string;

    today
      .CarouselCard(0)
      .ImgSrcAttribute()
      .then((src) => {
        resourceSrc = src!;
      });

    cy.GoToPage("resources");
    cy.MarkCarousselResourceAsFavorite(0);

    cy.GoToPage("today");
    today.carousselCards().should("have.length", 1);

    today
      .CarouselCard(0)
      .ImgSrcAttribute()
      .then((nextSrc) => {
        expect(nextSrc).not.to.equal(resourceSrc);
      });

    today.CarouselCard(0).CardFavoriteIconButton().click();
    today.carousselCards().should("have.length", 3);

    today
      .CarouselCard(0)
      .ImgSrcAttribute()
      .then((nextSrc) => {
        expect(nextSrc).equal(resourceSrc);
      });
  });

  it("Today - Verify resource video link - Video link is present", () => {
    today.CarouselCard(0).CardVideoButton().click();
    today.VideoModal().GetContainer().should("be.visible");
    today.VideoModal().ModalTitle().should("have.text", "PCP Overview");
    today.VideoModal().Iframe().should("be.visible");

    today
      .VideoModal()
      .Iframe()
      .invoke("attr", "src")
      .should("contain", "https://players.brightcove.net");
  });

  it("Today - Open presentation modal - Presentation page is opened", () => {
    today.CarouselCard(0).CardImage().click();
    today.PresentationModal().ModalTitle().should("have.text", "Presentations");

    today
      .PresentationModal()
      .PresentationsList()
      .invoke("text")
      .should("contain", "Lesson");

    cy.window().then((win) => {
      cy.stub(win, "open").as("popup");
    });
    cy.SelectPresentation("G4 Lesson 9 Presentation");
    cy.get("@popup").then((popup: any) => {
      const [firstArg, secondArg] = popup.args[0];
      cy.visit(firstArg);
      cy.origin(firstArg, () => {
        cy.get(".universal").should("be.visible");
      });
    });
  });

  it("Today - Verify Teacher's guide PDF - PDF is opened", () => {
    today.CarouselCard(0).CardTeachersGuideButton().click();
    today
      .TeachersGuideModal()
      .ExpandGuideButton("Teacher's Guide")
      .should("be.visible")
      .click();

    today
      .TeachersGuideModal()
      .PdfsLinksContainer("Teacher's Guide")
      .invoke("text")
      .should("contain", ".pdf");
  });

  it("Resources - Verify resource video link - Video link is present", () => {
    cy.GoToPage("resources");
    resources.CarouselCard(0).CardImage().should("be.visible");
    resources.CarouselCard(0).CardVideoButton().click();
    resources.VideoModal().GetContainer().should("be.visible");
    resources.VideoModal().ModalTitle().should("have.text", "PCP Overview");
    resources.VideoModal().Iframe().should("be.visible");

    resources
      .VideoModal()
      .Iframe()
      .invoke("attr", "src")
      .should("contain", "https://players.brightcove.net");
  });

  it("Resources - Open presentation modal - Presentation page is opened", () => {
    cy.GoToPage("resources");
    resources.CarouselCard(0).CardImage().should("be.visible").click();

    resources
      .PresentationModal()
      .ModalTitle()
      .should("have.text", "Presentations");

    resources
      .PresentationModal()
      .PresentationsList()
      .should("be.visible")
      .invoke("text")
      .should("contain", "Lesson");

    cy.window().then((win) => {
      cy.stub(win, "open").as("popup");
    });
    cy.SelectPresentation("G1 Lesson 1 Presentation");
    cy.get("@popup").then((popup: any) => {
      const [firstArg, secondArg] = popup.args[0];
      cy.visit(firstArg);
      cy.origin(firstArg, () => {
        cy.get(".universal").should("be.visible");
      });
    });
  });

  it("Resources - Verify Teacher's guide PDF - PDF is opened", () => {
    cy.GoToPage("resources");
    resources.CarouselCard(0).CardTeachersGuideButton().click();
    resources
      .TeachersGuideModal()
      .ExpandGuideButton("Teacher Information")
      .should("be.visible")
      .click();

    resources
      .TeachersGuideModal()
      .PdfsLinksContainer("Teacher Information")
      .invoke("text")
      .should("contain", ".pdf");
  });
});

export {};
