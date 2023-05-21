/// <reference types = "Cypress"/>
class WishlistModal {
  private readonly container: Cypress.Chainable;

  constructor() {
    this.container = cy.get("aside.modal");
  }

  GetContainer = () => {
    return this.container;
  };

  Title = () => {
    return this.container.find("h3.fire-plaster-title");
  };

  TextArea = () => {
    return this.container.find(".modal__wish-list");
  };

  ConfirmButton = () => {
    return this.container.find(".bg-blue > span");
  };
}

export default WishlistModal;
