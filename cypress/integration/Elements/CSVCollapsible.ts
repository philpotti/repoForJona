class CSVCollapsible {
  private readonly Container: Cypress.Chainable;

  constructor(collapsibleName: string) {
    this.Container = cy
      .get(`div[data-cy='${collapsibleName}-expansion-panel']`)
      .as("container");
  }

  ExpandButton = () => {
    return cy.get("@container").find("button.v-expansion-panel-title");
  };

  Title = () => {
    return cy.get("@container").find(".v-expansion-panel-title__overlay");
  };

  FileInput = () => {
    return this.Container.find("input[type='file']");
  };

  UploadFileButton = () => {
    return cy.get("@container").find("button.v-btn");
  };

  GetContainer = () => {
    return cy.get("@container");
  };
}

export default CSVCollapsible;
