class ResourceModal {
  protected readonly Container: Cypress.Chainable;

  constructor() {
    this.Container = cy.get("#modals div.modal-inner").as("container");
  }

  GetContainer = () => {
    return cy.get("@container");
  };

  ModalTitle = () => {
    return cy.get("@container").find("h2");
  };

  CloseModalButton = () => {
    return cy.get("@container").find(".v-btn__content i.mdi-window-close");
  };
}
export default ResourceModal;
