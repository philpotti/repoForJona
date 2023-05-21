class UpdateDuplicateRole {
  NewRoleNameInput = () => {
    return cy.get("div.panel input[type='text']");
  };

  SaveButton = () => {
    return cy.get("button.text-capitalize").contains("Save");
  };

  Cancel = () => {
    return cy.get("button.text-capitalize").contains("Cancel");
  };

  private GetCheckboxesContainer = (container: string) => {
    return cy.get(`div[data-cy='${container}-checkboxes-container']`);
  };

  private GetCheckboxesByContainer = (container: string) => {
    return this.GetCheckboxesContainer(container).find(
      "div.v-selection-control__input"
    );
  };

  MarkCheckboxByContainerName = (container: string, checkbox: string) => {
    this.GetCheckboxesContainer(container)
      .find("div.v-input label")
      .contains(checkbox)
      .then(($checkbox) => {
        this.GetCheckboxesByContainer(container)
          .eq($checkbox.index())
          .click({ force: true });
      });
  };
}

export default UpdateDuplicateRole;
