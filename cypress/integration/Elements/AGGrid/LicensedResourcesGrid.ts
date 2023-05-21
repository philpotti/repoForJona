import AGGrid from "./AGGrid";

class LicensedResources extends AGGrid {
  override Headers = () => {
    return cy
      .get("@container")
      .find("div.ag-header div.ag-header-cell .v-col.w-100");
  };

  override GetColumnIndex = (columnName: string) => {
    let columnIndex = -1;
    this.Headers().each(($header, index) => {
      let text;
      if (index < 2) {
        text = $header.text().split("\n")[0];
      } else {
        text = $header.text();
      }
      if (text === columnName) {
        columnIndex = index;
        return false;
      }
    });
    return cy.wrap(columnIndex);
  };


    GetCheckByRowIndex = (rowNumber: number) => {
        let offset = 1
        return cy
            .get("@container")
            .find(
                `div.ag-center-cols-container div[role='row']:nth-child(${rowNumber + offset})`
            )
            .find(`input`);
    };

    GetCheckByResource = (resourceName: string) => {
        return cy.get("@container")
            .find(`div.ag-center-cols-container div[role='row'] .ag-cell:nth-child(2) b`)
            .contains(resourceName)
            .then(($resource) => {
                const rowIndex = $resource.closest('[role=row]').index();
                return this.GetCheckByRowIndex(rowIndex);
            });
    };


    GetOpenSeatByResourceAndType = (resourceName: string, type: string) => {
        return cy
            .get("@container")
            .find(
                `div.ag-center-cols-container div[role='row'] .ag-cell:nth-child(2) b`
            ).contains(resourceName).then(($resource) => {
                const rowIndex = $resource.closest('[role=row]').index();
                return this.GetOpenSeatsByRowIndex(rowIndex, type)
            });
    };


    GetOpenSeatsByRowIndex = (rowNumber: number, type: string) => {
        let offset = 1;
        const lastColumnIndexPromise = cy
            .get("@container")
            .find(
                `div.ag-center-cols-container div[role='row']:nth-child(${rowNumber + offset})`
            )
            .find(`div.ag-cell div.v-col.text-right`)
            .then((columns) => {
                if (type === "License") {
                    return columns.eq(0).text();
                } else if (type === "Review") {
                    return columns.eq(1).text();
                }
            });
        return lastColumnIndexPromise;
    };



    GetItemNameByRowIndex = (rowNumber: number) => {
        let offset = 1;
        return cy
            .get("@container")
            .find(
                `div.ag-center-cols-container div[role='row']:nth-child(${rowNumber + offset
                })`
            )
            .find(`.ag-cell:nth-child(2) span`)
            .then(($span) => {                
                let text = $span.text().slice(-6)
                return text;
            });
    };

    GetItemByResourceName = (resourceName: string) => {
        return cy.get("@container")
            .find(`div.ag-center-cols-container div[role='row'] .ag-cell:nth-child(2) b`)
            .contains(resourceName)
            .then(($resource) => {
                const rowIndex = $resource.closest('[role=row]').index();
                return this.GetItemNameByRowIndex(rowIndex);
            });
    };
}

export default LicensedResources;
