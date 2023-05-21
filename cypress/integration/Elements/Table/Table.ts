class Table {
  protected Container: Cypress.Chainable<JQuery<HTMLElement>>;

  constructor(locator: string) {
    this.Container = cy.get(locator).as("container");
  }

  Headers = () => {
    return cy.get("@container").find("thead");
  };

  Rows = () => {
    return cy.get("@container").find("tbody tr");
  };

  GetContainer = () => {
    return cy.get("@container");
  };

  GetCellByColumnIndex(
    rowNumber: number,
    columnNumber: number,
    columnsToIgnore: number = 0
  ) {
    let offset = 1;
    return cy
      .get("@container")
      .find(`tbody tr:nth-child(${rowNumber})`)
      .find(`td:nth-child(${columnNumber + columnsToIgnore + offset}) `);
  }
}

export default Table;
