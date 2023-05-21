class AGGrid {
  Container: Cypress.Chainable;

  constructor(locator: string) {
    this.Container = cy.get(locator).as("container");
  }

  Headers = () => {
    return cy
      .get("@container")
      .find("div.ag-header div.ag-header-cell span.ag-header-cell-text");
  };

  Rows = () => {
    return cy
      .get("@container")
      .find("div.ag-center-cols-container div[role='row']");
  };

  GetColumnIndex = (columnName: string) => {
    return this.Headers()
      .contains(columnName)
      .then(($header) => {
        return $header.index();
      });
  };

  GetCellByColumnIndex = (
    rowNumber: number,
    columnNumber: number,
    offset: number = 1
  ) => {
    return cy
      .get("@container")
      .find(
        `div.ag-center-cols-container div[role='row']:nth-child(${rowNumber})`
      )
      .find(`div.ag-cell:nth-child(${columnNumber + offset})`);
  };

  GetCellByColumnName(rowNumber: number, columnName: string) {
    return this.GetColumnIndex(columnName).then(($columnIndex) => {
      return this.GetCellByColumnIndex(rowNumber, $columnIndex);
    });
  }
}

export default AGGrid;
