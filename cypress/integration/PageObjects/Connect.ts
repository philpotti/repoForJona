import CSVCollapsible from "../Elements/CSVCollapsible";
import JobProgressModal from "../Elements/JobProgressModal";
import MappedRoleGrid from "../Elements/AGGrid/MappedRoleGrid";

class Connect {
  ClassLinkTab = () => {
    return cy
      .get("div.mt-2 button.v-btn span.v-btn__content")
      .contains("ClassLink");
  };

  CleverTab = () => {
    return cy
      .get("div.mt-2 button.v-btn span.v-btn__content")
      .contains("Clever");
  };

  CSVtab = () => {
    return cy.get("div.mt-2 button.v-btn span.v-btn__content").contains("CSV");
  };

  ClientIdInput = () => {
    return cy.get("div[data-cy='clientId'] input");
  };

  ClientSecretInput = () => {
    return cy.get("div[data-cy='clientSecret'] input");
  };

  UploadNowButton = () => {
    return cy.get("button.primary-btn");
  };

  SaveButton = () => {
    return cy
      .get("button[type='submit']")
      .find("span.v-btn__content")
      .contains("Save");
  };

  MappedRolesTable = () => {
    return new MappedRoleGrid("div.ag-root-wrapper");
  };

  ClassesCollapsible = () => {
    return new CSVCollapsible("classes");
  };
  SchoolsCollapsible = () => {
    return new CSVCollapsible("schools");
  };
  UsersCollapsible = () => {
    return new CSVCollapsible("users");
  };
  EnrollmentsCollapsible = () => {
    return new CSVCollapsible("enrollments");
  };

  JobProgressModal = () => {
    return new JobProgressModal("div.v-card");
  };
}
export default Connect;
