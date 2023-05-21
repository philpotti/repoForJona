import AGGrid from "./AGGrid";


class MappedRoleGrid extends AGGrid {
  HeaderTitles = () => {
    return this.Headers().find("tr th");
  };

  GetColumnIndex = (columnName: string) => {
    return this.HeaderTitles()
      .contains(columnName)
      .then(($column) => {
        return $column.index();
      });
  };

  GetRowByIndex = (districtRole: string) => {
    return this.Rows()
      .contains(districtRole, { matchCase: false })
      .then((cell) => {
        const row = cell.parent();
        return row.index();
      });
  };

  public GetCellByDistrictRole = (districtRole: string, columnName: string) => {
    return this.GetColumnIndex(columnName).then(($columnIndex) => {
      return this.GetRowByIndex(districtRole).then(($rowIndex) => {
        return this.GetCellByColumnIndex($rowIndex, $columnIndex);
      });
    });
  };

  AssignRoleByDistrictRoleName = (
    districtRole: string,
    roleToAssign: string
  ) => {
    this.GetRowByIndex(districtRole).then((rowIndex) => {
      this.Rows().eq(rowIndex).find(".v-field__input").click({ force: true });

      cy.get("div.v-select__content div.v-list--one-line").should("be.visible");
      cy.get("div.v-list-item div.v-list-item-title").each(
        ($element, index) => {
          if ($element.text() === roleToAssign) {
            cy.get("div.v-list-item").eq(index).click({ force: true });
          }
        }
      );
    });
  };
}
export default MappedRoleGrid;
