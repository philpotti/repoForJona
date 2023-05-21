import LicensedUsersGrid from "../Elements/AGGrid/LicensedUsersGrid";
import Modal from "../Elements/Modal";

class LicensedUsers {
  LicensedUsersGrid = () => {
    return new LicensedUsersGrid(".ag-root");
  };

  LicensedResourcesButton = () => {
    return cy.get("span.v-btn__content").contains("Licensed Resources");
  };

  LicensedUsersButton = () => {
    return cy.get("span.v-btn__content").contains("Licensed Users");
  };

  UpdateButton = () => {
    return cy.get("span.v-btn__content").contains("Update");
  };

  RoleFilter = () => {
    return cy.get(".environment-wrapper .v-form .v-input__control").eq(0);
  };

  SchoolFilter = () => {
    return cy.get(".environment-wrapper .v-form .v-input__control").eq(1);
  };

  GradeFilter = () => {
    return cy.get(".environment-wrapper .v-form .v-input__control").eq(2);
  };

  FindInput = () => {
    return cy.get(".environment-wrapper .v-form .v-input__control").eq(3);
  };

  LicenceAllocationModal = () => {
    return new Modal("div.v-card");
  };
}

export default LicensedUsers;
