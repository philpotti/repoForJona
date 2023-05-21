import AGGrid from "./AGGrid";

class LicensedUsers extends AGGrid {
  HeadersResources = () => {
    return cy
      .get("@container")
      .find(
        "div.ag-header div.ag-header-cell div[ref='eHeaderCompWrapper'] .v-row.text-left.ma-0"
      );
  };

  override GetColumnIndex = (columnName: string) => {
    return this.HeadersResources()
      .contains(columnName)
      .then(($header) => {
        return $header.index();
      });
  };

  GetRowByTeacherName = (teacherName: string) => {
    return this.Rows().find("div.ag-cell:first-child").contains(teacherName).then($row => {
      return $row.parent().index()
    })
  };

  GetCellByResourceAndTeacherNames(
    teacherName: string,
    columnName: string,
    columnsToIgnore: number
  ) {
    let offset = 1;
    return this.GetColumnIndex(columnName).then((columnIndex) => {
      return this.GetRowByTeacherName(teacherName).then((rowIndex) => {
        return this.GetCellByColumnIndex(
          rowIndex + offset,
          columnIndex,
          columnsToIgnore + offset
        );
      });
    });
  }

  GetCheckAllLicensedSeats(columnName: string) {
    return this.GetColumnIndex(columnName).then(columIndex =>{
      return cy.get("div.ag-header div.ag-header-cell div[ref='eHeaderCompWrapper'] .v-row.text-left.ma-0").eq(columIndex).parent().find("input[type='checkbox']").eq(0)
    });
  }

  GetCheckAllReviewSeats(columnName: string) {
    return this.GetColumnIndex(columnName).then(columIndex =>{
      return cy.get("div.ag-header div.ag-header-cell div[ref='eHeaderCompWrapper'] .v-row.text-left.ma-0").eq(columIndex).parent().find("input[type='checkbox']").eq(1)
    });
  }

  GetLicenseOpenSeats(columnName: string) {
    return this.GetColumnIndex(columnName).then((columIndex) => {
      return cy
        .get(
          "div.ag-header div.ag-header-cell div[ref='eHeaderCompWrapper'] .v-row.text-left.ma-0"
        )
        .eq(columIndex)
        .parent()
        .find("div.available--seat")
        .invoke("text");
    });
  }

  GetReviewOpenSeats(columnName: string){
    return this.GetColumnIndex(columnName).then(columIndex =>{
      return cy.get("div.ag-header div.ag-header-cell div[ref='eHeaderCompWrapper'] .v-row.text-left.ma-0").eq(columIndex).parent().find("div.available--review").invoke('text');
    });
  }
}

export default LicensedUsers;
