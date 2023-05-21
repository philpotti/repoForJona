class Modal {
  protected Container: Cypress.Chainable<JQuery<HTMLElement>>;

  constructor(locator: string) {
    this.Container = cy.get(locator).as("container");
  }

  ModalContainer = () => {
    return this.Container;
  };

  Title = () => {
    return cy.get("@container").find(".v-card-title");
  };

  Content = () => {
    return cy.get("@container").find("div.v-card-text").as("content");
  };

  Actions = () => {
    return cy.get("@container").find(".v-card-actions");
  };

  ClickButton = (buttonText: string) => {
    this.Actions()
      .find(".v-btn__content")
      .contains(buttonText)
      .should("be.visible")
      .click();
  };
}

export default Modal;
