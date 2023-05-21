import AGGrid from "./AGGrid";

class RolesGrid extends AGGrid {
  private ContextualMenu = () => {
    return cy.get("div.v-overlay__content div[role='listbox']");
  };

  OpenContextualMenu = (rowNumber: number) => {
    this.GetCellByColumnName(rowNumber, "MORE").click();
  };

  SelectContextualMenuOption = (option: string) => {
    return this.ContextualMenu()
      .should("be.visible")
      .find("div.v-list-item-title")
      .contains(option);
  };
}

export default RolesGrid;
